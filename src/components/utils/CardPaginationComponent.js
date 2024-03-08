import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCardLink, MDBCardText, MDBCardTitle,
    MDBCol, MDBFooter, MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBRipple, MDBRow, MDBTypography
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import {useEffect} from "react";

const CardPaginationComponent = ({ pageName, pageNumber, pageTotal, title, titleIcon, cards, cardsPerPage, cardsPerRow }) => {
    const navigate = useNavigate();
    const currentPage = pageNumber; // Índice de la página actual
    const pageCount = pageTotal; // Total de páginas

    if(cards != null && cards.length == 0){
        cards = null;
    }
    // Controlar que el usuario sea redirigido si a una pagina de la paginación si va directamente a una que no existe
    useEffect(() => {
        if(isNaN(currentPage) || currentPage < 1){
            navigate(`/${pageName}/${title}/1`);
        }
        else if(currentPage > pageCount){
            navigate(`/${pageName}/${title}/${pageCount}`);
        }
    }, [currentPage]);


    const handlePageClick = (newPage) => {
        if(newPage >= 1 && newPage <= pageCount){
            navigate(`/${pageName}/${title}/${newPage}`); // Ir a la nueva página
        }
    };

    const handleShareButtonClick = async (cardId) => {
        // NOTA: El "async" es necesario debido a que "navigator" es una API nativa de JS
        try {
            await navigator.clipboard.writeText(`${process.env.REACT_APP_FRONTEND_URL}/quiz/play/${cardId}`);
            console.log("Quiz URL copied to clipboard successfully");
            await Swal.fire({
                icon: "success",
                text: "Enlace del cuestionario copiado al portapapeles",
                timer: 2000
            });
        }
        catch (error) {
            console.error("Failed to copy quiz URL to clipboard: ", error);
        }
    };

    const startCardIndex = cardsPerPage ? (currentPage - 1) * cardsPerPage : 0; // Índice inicial de las cartas para la página actual
    const endCardIndex = cards ? Math.min(startCardIndex + cardsPerPage, cards.length) : 0; // Índice final de las cartas para la página actual
    const currentCards = cards ? cards.slice(startCardIndex, endCardIndex) : []; // Total de cartas para la página actual


    const leftEllipsisIsTriggered = currentPage > 2; // Enseñar la elipsis izquierda de la paginación a partir de la tercera página
    const rightEllipsisIsTriggered = currentPage < (pageCount - 1); // Enseñar la elipsis derecha de la paginación excepto a partir de la penúltima página

    return (
        <MDBCard>
            <MDBCardHeader>
                <MDBTypography tag='h3' className="text-center my-3">
                    <MDBIcon far icon={titleIcon} /> {title}
                </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
                {/* NOTA: NO cambiar "cards === null" por simplemente "cards": la comparación no funcionaría! */}
                {cards !== null ? (
                    <MDBCardText>
                        <MDBRow className={`row-cols-1 row-cols-md-${cardsPerRow} g-4`}>
                            {currentCards.map((card, i) => (
                                <MDBCol key={i}>
                                    <MDBCard>
                                        <MDBRipple rippleTag='div' className='bg-image hover-zoom'>
                                            <MDBCardImage src={card.image} alt={card.title} position="top" />
                                            <MDBCardLink href={`/quiz/play/${card.id}`}>
                                                <div className='mask'></div>
                                            </MDBCardLink>
                                        </MDBRipple>
                                        <MDBCardBody>
                                            <MDBCardLink href={`/quiz/play/${card.id}`}>
                                                <MDBCardTitle>{card.title}</MDBCardTitle>
                                            </MDBCardLink>
                                            <MDBCardText>{card.text}</MDBCardText>
                                        </MDBCardBody>
                                        <MDBFooter>
                                            <MDBBtn color='link' rippleColor='dark' block onClick={() => handleShareButtonClick(card.id)}>
                                                <MDBIcon fas icon="share-alt" />
                                            </MDBBtn>
                                        </MDBFooter>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow>

                        <nav aria-label="Pagination" className="d-flex justify-content-center mt-5">
                            <MDBPagination size='lg' className='mb-0'>
                                <MDBPaginationItem disabled={currentPage === 1}
                                                   style={{ cursor: currentPage === 1 ? "default" : "pointer" }}>
                                    <MDBPaginationLink onClick={() => handlePageClick(currentPage - 1)} tabIndex="-1" >
                                        <MDBIcon fas icon="backward" />
                                    </MDBPaginationLink>
                                </MDBPaginationItem>

                                {/* Enseñar la elipsis izquierda si ya se está ya en la tercera página */}
                                {leftEllipsisIsTriggered && (
                                    <MDBPaginationItem style={{ cursor: "pointer" }}>
                                        <MDBPaginationLink onClick={() => handlePageClick(currentPage - 2)}>
                                            <MDBIcon fas icon="ellipsis-h" />
                                        </MDBPaginationLink>
                                    </MDBPaginationItem>
                                )}

                                {/* Enseñar el número de la página anterior */}
                                {currentPage > 1 && (
                                    <MDBPaginationItem style={{ cursor: "pointer" }}>
                                        <MDBPaginationLink onClick={() => handlePageClick(currentPage - 1)}>
                                            {currentPage - 1}
                                        </MDBPaginationLink>
                                    </MDBPaginationItem>
                                )}

                                {/* Enseñar el número de la página actual */}
                                <MDBPaginationItem active style={{ cursor: "pointer" }}>
                                    <MDBPaginationLink>{currentPage}</MDBPaginationLink>
                                </MDBPaginationItem>

                                {/* Enseñar el número de la página siguiente */}
                                {currentPage < pageCount && (
                                    <MDBPaginationItem style={{ cursor: "pointer" }}>
                                        <MDBPaginationLink onClick={() => handlePageClick(currentPage + 1)}>
                                            {currentPage + 1}
                                        </MDBPaginationLink>
                                    </MDBPaginationItem>
                                )}

                                {/* Quitar la elipsis derecha si ya se está ya en la penúltima página */}
                                {rightEllipsisIsTriggered && (
                                    <MDBPaginationItem style={{ cursor: "pointer" }}>
                                        <MDBPaginationLink onClick={() => handlePageClick(currentPage + 2)}>
                                            <MDBIcon fas icon="ellipsis-h" />
                                        </MDBPaginationLink>
                                    </MDBPaginationItem>
                                )}

                                {/* Botón de página siguiente */}
                                <MDBPaginationItem disabled={currentPage === pageCount}
                                                   style={{ cursor: currentPage === pageCount ? "default" : "pointer" }}>
                                    <MDBPaginationLink onClick={() => handlePageClick(currentPage + 1)}>
                                        <MDBIcon fas icon="forward" />
                                    </MDBPaginationLink>
                                </MDBPaginationItem>
                            </MDBPagination>
                        </nav>
                    </MDBCardText>
                ) : (
                    <MDBCardText>
                        <div className="d-flex justify-content-center">
                            <MDBTypography tag="h4">No existen cuestionarios actualmente para esta categoría</MDBTypography>
                        </div>
                    </MDBCardText>
                )}
            </MDBCardBody>
        </MDBCard>
    );
}

export default CardPaginationComponent;
