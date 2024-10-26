import {useParams} from "react-router-dom";
import CreateQuiz from "./CreateBook";
import {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBTypography} from "mdb-react-ui-kit";

const EditBook = () => {
    const {bookId} = useParams(); // Parámetros de la edición del cuestionario
    const [loading, setLoading] = useState(true); // Estado de carga (NOTA: Importante dejar, pues los datos pueden llegar tarde desde la API)
    const [bookToBeEdited, setBookToBeEdited] = useState({});

    useEffect(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/${bookId}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch book data");
            }
            const bookData = await response.json();
            console.log(bookData);
            setBookToBeEdited(bookData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }, [bookId]);

    if (loading) {
        // Mostrar el indicador de carga si los datos aún no se cargan
        return (
            <div className="d-flex justify-content-center mt-5">
                <MDBCard>
                    <MDBCardBody>
                        <MDBTypography tag="h2">Cargando...</MDBTypography>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }

    return (
        <CreateQuiz bookToBeEdited={bookToBeEdited}/>
    );
}

export default EditBook;