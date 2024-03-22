import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardLink, MDBCardTitle, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { BookInvoiceContext } from "../BookInvoiceContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CardMenu = ({ enabledButtons = true }) => {

    const { bookTest } = useContext(BookInvoiceContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books`, {
                method: 'GET',
                //credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const booksData = await response.json();
            console.log(booksData);

            const prepareCards = booksData.map(book => ({
                id: book.id,
                title: book.name,
                stock: book.stock,
                price: parseInt(book.sellingAt).toFixed(2) + "€",
                text: book.description || "Sin descripción",
                category_names: ["ISBN: " + book.isbn, "Autor: " + book.author],
                //image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
            }));
            setCards(prepareCards);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSell = async (id) => {
        bookTest(id, true);
        navigate(`/pdf`)
    }

    const handleBook = async (event, id, type, amount) => {
        //event.preventDefault();

        const formData = new FormData();
        formData.append('_method', "PUT");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + type + '/' + id + '/' + amount, {
            method: 'POST',
            //credentials: 'include'
            body: formData,
        });
        if (!response.ok) {
            console.log(response);
            //throw new Error("Failed to add books");
        } else {
            console.log(await response.json());
            fetchBooks();
        }
    }
    const handleDelete = async (event, id) => {
        event.preventDefault();

        const bookDelete = async () => {
            const formData = new FormData();
            formData.append('_method', "DELETE");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + id, {
                method: 'POST',
                //credentials: 'include'
                body: formData,
            });
            if (!response.ok) {
                console.log(response);
                Swal.fire({
                    icon: "error",
                    title: "Hubo un problema eliminando el libro",
                    showConfirmButton: true,
                })
            } else {
                console.log(await response.json());
                Swal.fire({
                    icon: "success",
                    title: "El libro se elimino con éxito",
                    timer: 1000
                })
                fetchBooks();
            }
        }

        Swal.fire({
            icon: "warning",
            text: "AVISO: Está apunto de BORRAR un libro. Esto significa que no podrá volver a verlo o editarlo. ¿Está seguro de eliminarlo de nuestra base de datos?",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if (result.isConfirmed) {
                bookDelete();
            }
        })
    }


    return (
        <MDBCardBody>
            <MDBRow className="row-cols-1 row-cols-md-12 g-4">
                {
                    cards.map((card, i) => (
                        <>
                            {/* Detect if card has 0 stock and do stuff
                            {enabledButtons ?
                                null :
                                card.stock > 0 ?
                                    <h1>EEE</h1> : null
                            } */}

                            <MDBCol key={i}>
                                <MDBCard>
                                    <div className='hover-overlay'>
                                        {/* <MDBRipple rippleTag='div' className='bg-image hover-zoom'>
                                    <MDBCardImage src={card.image} alt={card.title} position="top" />
                                    <MDBCardLink href={`/quiz/play/${card.id}`}>
                                        <div className='mask'></div>
                                    </MDBCardLink>
                                </MDBRipple> */}
                                        {enabledButtons ?
                                            <div style={{ height: "0px", width: "0px" }}>
                                                <MDBIcon fas icon="times-circle" className="text-danger xButtonCSS" size="lg"
                                                    onClick={(e) => handleDelete(e, card.id)}
                                                />
                                            </div>
                                            : null}

                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol>
                                                    {/* href={`/quiz/play/${card.id}`} */}
                                                    <MDBCardLink>
                                                        <MDBCardTitle>{card.title}</MDBCardTitle>
                                                    </MDBCardLink>
                                                    {card.category_names.map(name => (
                                                        <MDBBadge pill light color='primary' className="mb-3 me-1">
                                                            {name}
                                                        </MDBBadge>

                                                    ))}
                                                    {/* <MDBCardText>{card.text}</MDBCardText> */}

                                                </MDBCol>
                                                <MDBCol className="d-flex" style={{ justifyContent: "flex-end", alignItems: "center" }}>
                                                    <MDBBadge pill light color='primary' className="p-2 me-2">
                                                        Cantidad: {card.stock}
                                                    </MDBBadge>
                                                    <MDBBadge pill light color='primary' className="p-2 me-2">
                                                        Precio: {card.price}
                                                    </MDBBadge>
                                                    {enabledButtons ?
                                                        <>
                                                            <MDBBtn color="danger" disabled={card.stock <= 0} className="ms-2" onClick={(e) => handleSell(card.id)}>
                                                                <MDBIcon fas icon="dollar-sign" /> Vender
                                                            </MDBBtn>
                                                            <MDBDropdown>
                                                                <MDBDropdownToggle color="success" className="ms-2" ><MDBIcon fas icon="plus" /> Añadir</MDBDropdownToggle>
                                                                {/* onClick={() => handleBook(card.id, "add")} */}
                                                                <MDBDropdownMenu>
                                                                    {[...Array(15)].map((x, i) =>
                                                                        <MDBDropdownItem link={true} key={i + 1} onClick={(e) => handleBook(e, card.id, "add", i + 1)}>{i + 1}</MDBDropdownItem>
                                                                    )}
                                                                </MDBDropdownMenu>
                                                            </MDBDropdown>
                                                            <MDBBtn color="primary" className="ps-3 pe-3 ms-2" onClick={() => navigate(`/book/edit/${card.id}`)}>
                                                                <MDBIcon fas icon="pen" />
                                                            </MDBBtn>
                                                        </>
                                                        : null
                                                    }

                                                </MDBCol>
                                            </MDBRow>


                                        </MDBCardBody>
                                        {!enabledButtons ?
                                            card.stock > 0 ?
                                                <div
                                                    className='mask rounded-3'
                                                    style={{
                                                        background: 'rgba(0, 0, 255, 0.075)',
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => bookTest(card.id)}
                                                ></div>
                                                :
                                                <div
                                                    className='mask rounded-3'
                                                    style={{
                                                        background: 'rgba(255, 0, 0, 0.075)',
                                                        cursor: "not-allowed"
                                                    }}
                                                ></div> : null}

                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </>

                    ))
                }
            </MDBRow>
        </MDBCardBody>
    )
}

export default CardMenu