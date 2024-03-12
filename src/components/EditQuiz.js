import { useParams } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import { useEffect, useState } from "react";
import {MDBCard, MDBCardBody, MDBTypography} from "mdb-react-ui-kit";

const EditQuiz = () => {
    const { bookId } = useParams(); // Parámetros de la edición del cuestionario
    const [loading, setLoading] = useState(true); // Estado de carga (NOTA: Importante dejar, pues los datos pueden llegar tarde desde la API)
    const [bookToBeEdited, setBookToBeEdited] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/${bookId}`, {
                    
                    method: 'GET',
                    //credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch quiz data");
                }
                const bookData = await response.json();
                console.log(bookData);
                setBookToBeEdited(bookData);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchQuiz();
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
        <CreateQuiz bookToBeEdited={bookToBeEdited} />
    );
}

export default EditQuiz;