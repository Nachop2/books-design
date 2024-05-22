import styles from "./InvoicePDF.module.css"
import TextPDF from "./TextPDF"
import cabildo from "./logo-cabildo-i2.webp"
import InvoiceItem from "./InvoiceItem"
import { useContext, useEffect, useState } from "react"
import CardList from "../CardList"
import Swal from "sweetalert2"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import CardMenu from "../CardComponents/CardMenu"
import CardSearch from "../CardComponents/CardSearch"
import { BookInvoiceContext } from "../BookContext"
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Navigate, useNavigate, useParams } from "react-router-dom"

const InvoicePDF = ({ pdf = false, view = false }) => {
    const { invoiceID } = useParams();
    const { bookTest, invoiceBooks, setInvoiceBooks } = useContext(BookInvoiceContext)
    const [basicModal, setBasicModal] = useState(false);
    const navigate = useNavigate();
    const toggleOpen = () => setBasicModal(!basicModal);
    const [prices, setPrices] = useState(["0.00€", "0.00€", "0.00€"])
    const [tax, setTax] = useState(0.07);

    const dateObj = new Date;

    const date = dateObj.getUTCDate().toString().padStart(2,"0") +"/"+ (dateObj.getUTCMonth()+1).toString().padStart(2,"0") +"/"+ dateObj.getUTCFullYear().toString()

    useEffect(() => {

        let totalNoTax = 0;
        invoiceBooks.forEach(element => {
            if (element.donation == false) {
                totalNoTax += element.price * element.chosenQuantity
            }
        });
        let taxes = totalNoTax * tax;
        let total = taxes + totalNoTax

        totalNoTax = totalNoTax.toFixed(2) + "€";
        taxes = taxes.toFixed(2) + "€";
        total = total.toFixed(2) + "€";
        setBasicModal(false);
        setPrices([totalNoTax, taxes, total]);
    }, [invoiceBooks, tax]);

    useEffect(() => {
        if (invoiceID != null) {
            const fetchInvoice = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoice/${invoiceID}`, {
                        method: 'GET',
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch quiz data");
                    }
                    const invoiceData = await response.json();
                    console.log(invoiceData)
                    document.querySelector("#clientName").textContent = invoiceData.clientName;

                    document.querySelector("#clientAddress").textContent = invoiceData.clientAddress;
                    document.querySelector("#clientLocation").textContent = invoiceData.clientLocation;
                    document.querySelector("#clientCountry").textContent = invoiceData.clientCountry;

                    setTax(invoiceData.tax);
                    // formData.append('clientCity', document.querySelector("#clientCity").value);

                    document.querySelector("#clientCIF").textContent = invoiceData.clientCIF;

                    let invoiceCopy = [];
                    invoiceData.books.forEach(book => {
                        const prepareCards = {
                            id: book.id,
                            title: book.name,
                            stock: book.stock,
                            chosenQuantity: book.pivot.amountSold,
                            donation: book.pivot.donation,
                            text: book.description || "Sin descripción",
                            price: parseInt(book.sellingAt),
                            category_names: ["ISBN: " + book.isbn, "Autor: " + book.author],
                            //image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
                        };
                        if (view) {
                            prepareCards.price = parseInt(book.pivot.priceSold)
                            console.log(book.pivot.priceSold);
                        }
                        invoiceCopy.push(prepareCards)
                        console.log(invoiceCopy);

                    });
                    setInvoiceBooks(invoiceCopy);

                    console.log(invoiceData);
                }
                catch (error) {
                    console.error(error);
                }
            };
            fetchInvoice()
        }
    }, [invoiceID])

    const handleQuantity = (index, quantity) => {
        let itemCopy = [...invoiceBooks];
        itemCopy[index].chosenQuantity = quantity
        setInvoiceBooks(itemCopy);
    }
    const handleDelete = (index) => {
        let itemCopy = [...invoiceBooks];
        itemCopy.splice(index, 1)
        setInvoiceBooks(itemCopy);
    }

    const handleDonation = (index) => {
        let itemCopy = [...invoiceBooks];
        itemCopy[index].donation = !itemCopy[index].donation;
        setInvoiceBooks(itemCopy);
    }

    const saveInvoice = async () => {
        const cookie = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include'
        });
        const token = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];


        const formData = new FormData();
        formData.append('clientName', document.querySelector("#clientName").value);
        formData.append('clientAddress', document.querySelector("#clientAddress").value);
        // formData.append('clientCity', document.querySelector("#clientCity").value);
        formData.append('clientLocation', document.querySelector("#clientLocation").value);
        formData.append('clientCountry', document.querySelector("#clientCountry").value);

        formData.append('clientCIF', document.querySelector("#clientCIF").value);
        formData.append('tax', tax);
        console.log(formData);
        // formData.append('invoiceDate', document.querySelector("#invoiceDate").value);

        invoiceBooks.forEach((book, index) => {
            let bookData = {
                id: book.id,
                chosenQuantity: book.chosenQuantity,
                donation: book.donation
            }
            console.log(bookData);
            formData.append(`books[${index}][id]`, book.id);
            formData.append(`books[${index}][chosenQuantity]`, book.chosenQuantity);
            formData.append(`books[${index}][donation]`, book.donation);
        });

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoice`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(token), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies in the request
            body: formData
        })
            .then(async response => {
                let jsonResponse = await response.json()
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "La factura fue creada con éxito",
                        showConfirmButton: true,
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate("/pdf/"+jsonResponse)
                        }
                    })
                } else {

                    let errors = [];



                    Swal.fire({
                        icon: "error",
                        title: "Hubo errores en la creacion de la factura ",
                        showConfirmButton: true,
                    })
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }




    return (
        <>
            <div id="root">
                <div className={styles.app}>
                    <div className={`page ${styles.invoiceWrapper}`} >
                        <MDBRow>
                            <MDBCol>
                                <div className={`logo d-inline-block ${styles.mb5}`}>
                                    <img className="d-block" src={cabildo} alt="logo" style={{ maxWidth: 100 + "px" }}></img>
                                </div>
                                <p className={`fs-5 fw-bold d-inline-block pdfPad pdfFont`}>Cabildo de Fuerteventura</p>

                                <p className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Dirección de la compañia"><strong>C.I.F.:</strong> P - 3500003 - C</p>
                                <p className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Dirección de la compañia"><strong>Tel.:</strong> 928 862 300</p>
                                <p className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Dirección de la compañia">C/ 1º de Mayo, 39</p>
                                <p className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Ciudad/Poblacion">35600 Puerto del Rosario</p>
                                <p className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Ciudad/Poblacion">Fuerteventura</p>

                                {/* <input readOnly="readOnly" type="text" className={`${styles.input}`} placeholder="" value="United States"></input> */}
                            </MDBCol>
                            <MDBCol>
                                <p className={`w-100 d-inline-block pdfPad ${styles.fs45} text-end fw-bold`} style={{ fontFamily: "sans-serif" }}>Factura</p>
                            </MDBCol>
                        </MDBRow>


                        <div className={`view d-flex ${styles.mt40}`}>
                            <div className={`view ${styles.w55}`}>
                                <p className={`w-100 pdfPad d-inline-block fw-bold mt-0 ${styles.mb5} text-black`} style={{ fontFamily: "sans-serif" }}>Factura para:</p>

                                {/* <pPDF text="Factura para:" styling={`${styles.input} fw-bold text-black ${styles.mb5}`}></TextPDF> */}
                                {!view ? (
                                    <>
                                        <input type="text" className={`${styles.input}`} placeholder="Nombre del cliente" id="clientName"></input>
                                        <input type="text" className={`${styles.input}`} placeholder="Dirección" id="clientAddress"></input>
                                        <input type="text" className={`${styles.input}`} placeholder="Localidad" id="clientLocation"></input>
                                        <input type="text" className={`${styles.input}`} placeholder="CIF" id="clientCIF"></input>
                                        <input type="text" className={`${styles.input}`} placeholder="Pais" id="clientCountry"></input>
                                    </>
                                ) : (
                                    <>
                                        <p type="text" className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Nombre del cliente" id="clientName">Cliente</p>
                                        <p type="text" className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Dirección del cliente" id="clientAddress">Calle</p>
                                        <p type="text" className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Dirección del cliente" id="clientLocation">Calle</p>

                                        <p type="text" className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="Ciudad/Poblacion" id="clientCIF">Zip</p>
                                        <p readOnly="readOnly" type="text" className={`w-100 pdfPad d-inline-block pdfFont`} placeholder="" value="Spain" id="clientCountry"> España</p>
                                    </>
                                )}

                            </div>
                            <div className={`view ${styles.w45}`}>
                                <MDBRow>
                                    <MDBRow>
                                        <MDBCol className="col-5">
                                            <p className={`w-100 pdfPad d-inline-block fw-bold pdfFont`}>Factura#</p>
                                        </MDBCol>
                                        <MDBCol >
                                            <p className={`w-100 pdfPad d-inline-block pdfFont`}>{view ? (invoiceID.padStart(7,"0")) : ("_______")}</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol className="col-5 pe-0">
                                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold px-0`}>Fecha de emisión</p>
                                        </MDBCol>
                                        <MDBCol className="" >
                                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold px-0`}>{date}</p>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBRow>
                            </div>
                        </div>
                        <MDBRow className={`${styles.bgdark} align-items-center mx-0 py-1 text-end mt-4`}>
                            <MDBCol className={`col-4 text-start px-2`}>
                                <p className={`pdfPad d-inline-block pdfFont text-white fw-bold`}>Libros</p>
                            </MDBCol>
                            <MDBCol className={`text-center px-2 col-2`}>
                                <p className={`pdfPad d-inline-block pdfFont text-white fw-bold`}>Cantidad</p>
                            </MDBCol>
                            <MDBCol className={`text-center px-2 col-2`}>
                                <p className={`pdfPad d-inline-block pdfFont text-white fw-bold`}>Donacion?</p>
                            </MDBCol>
                            <MDBCol className={` text-center px-2 col-2`}>
                                <p className={`pdfPad d-inline-block pdfFont text-white fw-bold`}>Precio Ud.</p>
                            </MDBCol>
                            <MDBCol className={` text-end pe-3 col-2`}>
                                <p className={`pdfPad d-inline-block pdfFont text-white fw-bold`}>Total</p>
                            </MDBCol>
                        </MDBRow>
                        {
                            invoiceBooks.map((e, index) => {
                                return <InvoiceItem styles={styles} item={e}
                                    handleQuantity={handleQuantity}
                                    handleDelete={handleDelete}
                                    handleDonation={handleDonation}
                                    index={index}
                                    view={view}
                                ></InvoiceItem>
                            })
                        }




                        <MDBRow className="mx-0">
                            <MDBCol className="mt-2 px-0">
                                {!view ?
                                    <>
                                        <MDBBtn color={"success"} onClick={() => { toggleOpen() }} className="px-3"> <MDBIcon fas icon="plus" className="me-2" />Añadir Libro</MDBBtn>
                                        <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                                            <MDBModalDialog centered={true} size="lg">
                                                <MDBModalContent>
                                                    <div className="mx-3">
                                                        <CardSearch></CardSearch>
                                                    </div>
                                                    <MDBModalBody>
                                                        <CardMenu enabledButtons={false}></CardMenu>
                                                    </MDBModalBody>
                                                </MDBModalContent>
                                            </MDBModalDialog>
                                        </MDBModal>
                                    </> : null
                                }

                            </MDBCol>
                            <MDBCol className="mt-4 px-0">
                                <MDBRow className={`view mx-0 align-items-center`}>
                                    <MDBCol>
                                        <p className={`w-100 pdfPad d-inline-block pdfFont`}>Total sin impuestos</p>
                                    </MDBCol>
                                    <MDBCol className={`${styles.p5}`}>
                                        <span className={`${styles.span} text-end fw-bold text-black`}>{prices[0]}</span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={`view mx-0 align-items-center`}>
                                    <MDBCol>
                                        <MDBRow>
                                            <MDBCol className={view ? ("col") : ("col-6")}>
                                                <p className={`w-100 pdfPad d-inline-block pdfFont`}>{view ? ("Impuestos (" + Math.round(tax * 100) + "%)") : ("Impuestos")}</p>
                                            </MDBCol>
                                            {view ? (
                                                <></>

                                            ) : (
                                                <MDBCol className="col-6">
                                                    <select defaultValue={0.07} className={`${styles.select} text-black text-end `}>
                                                        <option value={0} onClick={() => setTax(0)}>0%</option>
                                                        <option value={0.07} onClick={() => setTax(0.07)}>7%</option>
                                                        <option value={0.21} onClick={() => setTax(0.21)}>21%</option>
                                                        {/* <option value={0.21} onClick={(e) => handleTax(index, (i + 1), ee)} >21%</option> */}
                                                    </select>
                                                </MDBCol>
                                            )}

                                        </MDBRow>


                                    </MDBCol>
                                    <MDBCol className={`view ${styles.p5} justify-content-end`}>
                                        <span className={`${styles.span} text-end fw-bold text-black`}>{prices[1]}</span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={`view ${styles.bggray} py-1 mx-0 align-items-center`}>
                                    <MDBCol className={`view justify-content-end`}>
                                        <p className={`pdfPad d-inline-block pdfFont text-end fw-bold w-auto`}>TOTAL</p>
                                    </MDBCol>
                                    <MDBCol className={`view pe-2 d-flex justify-content-end `}>
                                        <span className={`${styles.span} text-end fw-bold text-black w-auto `}>{prices[2]}</span>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>


                        <div className={`view ${styles.mt20}`}>
                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold`}>Notas adicionales</p>
                            {view ? (
                                <p className={`w-100`} placeholder="" style={{ height: 48 + "px" }}></p>
                            ) : (
                                <textarea className={`${styles.input} w-100`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                            )}
                        </div>
                        <div className={`view ${styles.mt20}`}>
                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold`}>Terminos y condiciones</p>
                            {view ? (
                                <p className={`w-100`} placeholder="" style={{ height: 48 + "px" }}></p>
                            ) : (
                                <textarea className={`${styles.input} w-100`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                            )}
                        </div>
                    </div >
                    <div>
                        <MDBBtn className="bg-success mt-4" onClick={() => saveInvoice()}><MDBIcon fas icon="save" className="me-2" size="lg" />Guardar</MDBBtn>
                    </div>
                </div >

            </div >
        </>
    )
}
export default InvoicePDF;
