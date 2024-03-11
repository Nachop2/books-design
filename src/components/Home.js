import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage, MDBCardLink,
    MDBCardText,
    MDBCardTitle,
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselItem,
    MDBCol,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBRipple,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

const Home = () => {
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

    const handleBook = async (id, type, amount) => {
        const formData = new FormData();
        formData.append('_method', "PUT");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + type + '/' + id + '/' + amount, {
            method: 'POST',
            //credentials: 'include'
            body: formData,
        });
        if (!response.ok) {
            console.log(response);
            throw new Error("Failed to add books");
        } else {
            console.log(await response.json());
            setCards([]);
            fetchBooks();
            console.log("book gaming");
        }
    }



    const titles = [
        { title: "Libros", icon: "clipboard-list" },
    ];



    const carouselItems = [
        {
            id: 1,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg',
            alt: 'First slide',
            caption: { title: 'First slide label', text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.' }
        },
        {
            id: 2,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
            alt: 'Second slide',
            caption: { title: 'Second slide label', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
        },
        {
            id: 3,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg',
            alt: 'Third slide',
            caption: { title: 'Third slide label', text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.' }
        }
    ];

    return (
        <div>
            {/* <MDBCarousel showIndicators showControls fade>
                {carouselItems.map((item) => (
                    <MDBCarouselItem key={item.id} itemId={item.id}>
                        <img src={item.src} className='d-block w-100' alt={item.alt} />
                        <MDBCarouselCaption>
                            <h5>{item.caption.title}</h5>
                            <p>{item.caption.text}</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                ))}
            </MDBCarousel> */}

            {titles.map((title, index) => (
                <div className="mt-5" key={index}>
                    <MDBCard>
                        <MDBCardHeader>
                            



                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>

                                <MDBRow className="row-cols-1 row-cols-md-12 g-4">
                                    {cards.map((card, i) => (
                                        <MDBCol key={i}>

                                            <MDBCard>
                                                {/* <MDBRipple rippleTag='div' className='bg-image hover-zoom'>
                                                        <MDBCardImage src={card.image} alt={card.title} position="top" />
                                                        <MDBCardLink href={`/quiz/play/${card.id}`}>
                                                            <div className='mask'></div>
                                                        </MDBCardLink>
                                                    </MDBRipple> */}

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
                                                            <MDBCardText>{card.text}</MDBCardText>

                                                        </MDBCol>
                                                        <MDBCol className="d-flex" style={{ justifyContent: "flex-end", alignItems: "center" }}>
                                                            <MDBBadge pill light color='primary' className="p-2 me-2">
                                                                Cantidad: {card.stock}
                                                            </MDBBadge>
                                                            <MDBBtn color="danger" className="ms-2" href="" onClick={() => handleBook(card.id, "sell", 1)}>
                                                                <MDBIcon fas icon="dollar-sign" /> Vender
                                                            </MDBBtn>
                                                            <MDBDropdown>


                                                                <MDBDropdownToggle color="success" className="ms-2" href="" ><MDBIcon fas icon="sign-in-alt" /> Añadir</MDBDropdownToggle>
                                                                {/* onClick={() => handleBook(card.id, "add")} */}
                                                                <MDBDropdownMenu>
                                                                    {[...Array(15)].map((x, i) =>
                                                                        <MDBDropdownItem link key={i + 1} onClick={() => handleBook(card.id, "add", i + 1)}>{i + 1}</MDBDropdownItem>
                                                                    )}
                                                                </MDBDropdownMenu>
                                                            </MDBDropdown>
                                                        </MDBCol>
                                                    </MDBRow>


                                                </MDBCardBody>

                                            </MDBCard>
                                        </MDBCol>
                                    ))}
                                </MDBRow>
                                <div className="d-flex justify-content-center mt-5">
                                    <MDBCardLink href="/category/1">Ver más de "{title.title}"</MDBCardLink>
                                </div>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            ))}
        </div>
    );
}

export default Home;