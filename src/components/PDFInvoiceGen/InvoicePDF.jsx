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
import { BookInvoiceContext } from "../BookInvoiceContext"
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const InvoicePDF = ({ pdf = false }) => {
    const { invoiceBooks, setInvoiceBooks } = useContext(BookInvoiceContext)
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);
    const [prices, setPrices] = useState(["0.00€", "0.00€", "0.00€"])



    useEffect(() => {

        let totalNoTax = 0;

        invoiceBooks.forEach(element => {
            if (element.donation == false) {
                totalNoTax += element.price * element.chosenQuantity
            }
        });
        let taxes = totalNoTax * 0.24;
        let total = taxes + totalNoTax

        totalNoTax = totalNoTax.toFixed(2) + "€";
        taxes = taxes.toFixed(2) + "€";
        total = total.toFixed(2) + "€";
        setBasicModal(false);
        setPrices([totalNoTax, taxes, total]);
    }, [invoiceBooks]);

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
        const formData = new FormData();
        formData.append('clientName', document.querySelector("#clientName").value);
        formData.append('clientAddress', document.querySelector("#clientAddress").value);
        // formData.append('clientCity', document.querySelector("#clientCity").value);
        formData.append('clientCity', "Puerto");

        formData.append('clientZip', document.querySelector("#clientZip").value);
        formData.append('clientCountry', document.querySelector("#clientCountry").value);
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
            },
            //credentials: 'include', // Include cookies for the domain
            body: formData,
        })
            .then(async response => {
                let jsonResponse = await response.json()
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "La factura fue creada con éxito",
                        showConfirmButton: true,
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

                                <input type="text" className={`${styles.input}`} placeholder="Your Name"></input>
                                <input type="text" className={`${styles.input}`} placeholder="Company's Address"></input>
                                <input type="text" className={`${styles.input}`} placeholder="City, State Zip"></input>
                                <input readOnly="readOnly" type="text" className={`${styles.input}`} placeholder="" value="United States"></input>
                            </MDBCol>
                            <MDBCol>
                                <p className={`w-100 d-inline-block pdfPad ${styles.fs45} text-end fw-bold`} style={{ fontFamily: "sans-serif" }}>Factura</p>
                            </MDBCol>
                        </MDBRow>


                        <div className={`view d-flex ${styles.mt40}`}>
                            <div className={`view ${styles.w55}`}>
                                <p className={`w-100 pdfPad d-inline-block fw-bold mt-0 ${styles.mb5} text-black`} style={{ fontFamily: "sans-serif" }}>Factura para:</p>

                                {/* <pPDF text="Factura para:" styling={`${styles.input} fw-bold text-black ${styles.mb5}`}></TextPDF> */}
                                <input type="text" className={`${styles.input}`} placeholder="Your Client's Name" id="clientName"></input>
                                <input type="text" className={`${styles.input}`} placeholder="Client's Address" id="clientAddress"></input>
                                <input type="text" className={`${styles.input}`} placeholder="City, State Zip" id="clientZip"></input>
                                <input readOnly="readOnly" type="text" className={`${styles.input}`} placeholder="" value="Spain" id="clientCountry"></input>
                            </div>
                            <div className={`view ${styles.w45}`}>
                                <MDBRow>
                                    <MDBRow>
                                        <MDBCol className="col-5">
                                            <p className={`w-100 pdfPad d-inline-block fw-bold pdfFont`}>Invoice#</p>
                                        </MDBCol>
                                        <MDBCol >
                                            <p className={`w-100 pdfPad d-inline-block pdfFont`}>0000001</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol className="col-5 pe-0">
                                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold px-0`}>Invoice Date</p>
                                        </MDBCol>
                                        <MDBCol className="" >
                                            <div className="react-datepicker-wrapper">
                                                <div className="react-datepicker__input-container">
                                                    <input type="text" className={`${styles.input}`} defaultValue="Mar 13, 2024"></input>
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol className="col-5 pe-0">
                                            <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold px-0`}>Due Date</p>
                                        </MDBCol>
                                        <MDBCol className="" >
                                            <div className="react-datepicker-wrapper">
                                                <div className="react-datepicker__input-container">
                                                    <input type="text" className={`${styles.input}`} defaultValue="Apr 12, 2024"></input>
                                                </div>
                                            </div>
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
                                    index={index}></InvoiceItem>
                            })
                        }




                        <MDBRow className="mx-0">
                            <MDBCol className="mt-2 px-0">
                                {!pdf ?
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
                                    </>:null
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
                                        <p className={`w-100 pdfPad d-inline-block pdfFont`}>Impuestos (21%)</p>

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
                            <textarea className={`${styles.input} w-100`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                        </div>
                        <div className={`view ${styles.mt20}`}>
                        <p className={`w-100 pdfPad d-inline-block pdfFont fw-bold`}>Terminos y condiciones</p>
                            <textarea className={`${styles.input} w-100`} placeholder="" style={{ height: 48 + "px" }}></textarea>
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
