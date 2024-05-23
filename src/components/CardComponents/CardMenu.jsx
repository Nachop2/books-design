import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardLink, MDBCardTitle, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { BookInvoiceContext } from "../BookContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const CardMenu = ({ enabledButtons = true }) => {

    const { bookTest, books, fetchBooks, paginationBook, pagination } = useContext(BookInvoiceContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    useEffect(() => {
        fetchBooks();
    }, [])
    
    const token = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    useEffect(() => {
        const prepareCards = books.map(book => ({
            id: book.id,
            title: book.name,
            stock: book.stock,
            price: parseFloat(book.sellingAt).toFixed(2) + "€",
            text: book.description || "Sin descripción",
            category_names: ["ISBN: " + book.isbn, "Autor: " + book.author],
            //image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
        }));
        setCards(prepareCards);
    }, [books])


    const handleSell = async (id) => {
        bookTest(id, true);
        navigate(`/pdf`)
    }

    const handleBook = async (event, id, amount) => {
        //event.preventDefault();

        const formData = new FormData();
        formData.append('_method', "PUT");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/add/` + id + '/' + amount, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(token), // Include the CSRF token in the headers
            },
            credentials: 'include',
            body: formData,
        });
        if (!response.ok) {
            console.log(response);
            //throw new Error("Failed to add books");
        } else {
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
                                            <MDBBtn floating className="xButtonCSS" color="danger" size="sm"
                                                onClick={(e) => handleDelete(e, card.id)}
                                                aria-label="delete book"
                                            >
                                                <MDBIcon className="xIcon" fas icon="times" color="white" size="lg"
                                                    fixed={true} />
                                            </MDBBtn>

                                            : null}

                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol className="text-center text-lg-start">
                                                    {/* href={`/quiz/play/${card.id}`} */}
                                                    <MDBCardTitle className="text-primary" dangerouslySetInnerHTML={{ __html: card.title }}></MDBCardTitle>
                                                    {card.category_names.map(name => (
                                                        <MDBBadge pill light color='primary' className="mb-3 me-1">
                                                            {name}
                                                        </MDBBadge>

                                                    ))}
                                                    {/* <MDBCardText>{card.text}</MDBCardText> */}

                                                </MDBCol>
                                                <MDBCol className="d-flex align-items-center justify-content-center justify-content-lg-end " >
                                                    <MDBBadge pill light color='primary' className="p-2 me-2">
                                                        Cantidad: {card.stock}
                                                    </MDBBadge>
                                                    <MDBBadge pill light color='primary' className="p-2 me-2">
                                                        Precio: {card.price}
                                                    </MDBBadge>

                                                    {enabledButtons ?
                                                        <>
                                                            <MDBBtn color="danger" disabled={card.stock <= 0} className="ms-2 text-nowrap " onClick={(e) => handleSell(card.id)}
                                                                style={{ minWidth: "fit-content" }}
                                                                aria-label="sell book">
                                                                <MDBIcon fas icon="dollar-sign" className="me-1" />
                                                                Vender
                                                            </MDBBtn>
                                                            <MDBDropdown>
                                                                <MDBDropdownToggle color="success" className="ms-2" ><MDBIcon fas icon="plus" /> Añadir</MDBDropdownToggle>
                                                                {/* onClick={() => handleBook(card.id, "add")} */}
                                                                <MDBDropdownMenu>
                                                                    {[...Array(15)].map((x, i) =>
                                                                        <MDBDropdownItem link={true} key={i + 1} onClick={(e) => handleBook(e, card.id, i + 1)}>{i + 1}</MDBDropdownItem>
                                                                    )}
                                                                </MDBDropdownMenu>
                                                            </MDBDropdown>
                                                            <MDBBtn color="primary" className="ps-3 pe-3 ms-2" onClick={() => navigate(`/book/edit/${card.id}`)}
                                                                style={{ minWidth: "fit-content" }}
                                                                aria-label="edit book">
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
                    ))
                }
                <MDBCol>
                    <Pagination paginationFunction={paginationBook} paginationInfo={pagination}></Pagination>
                </MDBCol>
            </MDBRow>

        </MDBCardBody>
    )
}

export default CardMenu