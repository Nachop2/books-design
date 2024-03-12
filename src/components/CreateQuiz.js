import { useState, useContext, useEffect } from "react";
import { CreateQuizContext } from "./CreateQuizComponents/CreateQuizContext";
import { useParams, useSearchParams } from "react-router-dom";
import CreatedQuestions from "./CreateQuizComponents/CreatedQuestions";
import CheckQuestions from "./CreateQuizComponents/CheckQuestions";
import Swal from "sweetalert2";
import {
    MDBBtn, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText, MDBCheckbox, MDBFile, MDBIcon,
    MDBInput, MDBListGroup, MDBListGroupItem, MDBTextArea,
    MDBTypography
} from "mdb-react-ui-kit";

import MultipleChoiceMain from "./CreateQuizComponents/MultipleChoiceComponents/MultipleChoiceMain";
import TrueFalseMain from "./CreateQuizComponents/TrueFalseComponents/TrueFalseMain";
import MultipleAnswerMain from "./CreateQuizComponents/MultipleAnswerComponents/MultipleAnswerMain";
import { CategoryContext } from "./CategoryContext";


const CreateQuiz = ({ bookToBeEdited }) => {
    const { categories, setCategories } = useContext(CategoryContext);
    const { currentQuestionId, questions } = useContext(CreateQuizContext);


    const [selectedCategory, setSelectedCategory] = useState(""); // Controla la opción seleccionada del desplegable de categorías
    const [selectedQuestionType, setSelectedQuestionType] = useState("");
    const [selectedVisibility, setSelectedVisibility] = useState(""); // Controla la opción seleccionada del desplegable de visibilidad
    const [selectedCategories, setSelectedCategories] = useState([ // Lista de categorías seleccionadas
        { id: 1, name: "Sin categorizar", created_at: "", updated_at: "" }
    ]);

    const { preguntas, setPreguntas } = questions;
    const { idPreguntaActual, setIdPreguntaActual } = currentQuestionId;

    const [searchParams, setSearchParams] = useSearchParams();



    useEffect(() => {
        // Si la edición está activada, esto se encarga de recoger los datos del test y actualizar
        if (bookToBeEdited) {
            document.querySelector("#name").value = bookToBeEdited.name;
            document.querySelector("#name").classList.add("active");

            document.querySelector("#isbn").value = bookToBeEdited.isbn;
            document.querySelector("#isbn").classList.add("active");

            document.querySelector("#author").value = bookToBeEdited.author;
            document.querySelector("#author").classList.add("active");

            document.querySelector("#imprenta").value = bookToBeEdited.imprenta;
            document.querySelector("#imprenta").classList.add("active");

            document.querySelector("#price").value = bookToBeEdited.price;
            document.querySelector("#price").classList.add("active");

            document.querySelector("#sellingAt").value = bookToBeEdited.sellingAt;
            document.querySelector("#sellingAt").classList.add("active");

            // document.querySelector("#description").value = bookToBeEdited.description;
            // document.querySelector("#description").classList.add("active");
        }

    }, []);

    const saveToAccount = async () => {
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append('name', document.querySelector("#name").value);
        formData.append('isbn', document.querySelector("#isbn").value);
        formData.append('author', document.querySelector("#author").value);
        formData.append('imprenta', document.querySelector("#imprenta").value);
        formData.append('price', document.querySelector("#price").value);
        formData.append('sellingAt', document.querySelector("#sellingAt").value);

        //formData.append('description', document.querySelector("#description").value);


        console.log(formData);
        if (bookToBeEdited) {

            // Use method spoofing for Laravel, since using PUT doesn't work properly
            formData.append('_method', 'PUT');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + bookToBeEdited.id, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                //credentials: 'include', // Include cookies for the domain
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        icon: "success",
                        title: "El cuestionario fue actualizado con éxito",
                        showConfirmButton: true,
                    })
                })
                .catch(error => console.error('Error:', error));
        } else {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                //credentials: 'include', // Include cookies for the domain
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        icon: "success",
                        title: "El libro se subido a la plataforma con éxito",
                        showConfirmButton: true,
                    })
                })
                .catch(error => console.error('Error:', error));
        }

    }


    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">{bookToBeEdited ? 'Editar' : 'Crear'} libro</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>

                    <MDBCardText>
                        {/* Título */}
                        <MDBInput type='text' id='name' label='Título' />
                        <MDBInput className="mt-4" type='text' id='isbn' label='ISBN' />
                        <MDBInput className="mt-4" type='text' id='author' label='Autor' />
                        <MDBInput className="mt-4" type='text' id='imprenta' label='Imprenta' />
                        <MDBInput className="mt-4" type='number' id='price' label='Precio de compra' />
                        <MDBInput className="mt-4" type='number' id='sellingAt' label='Precio de venta' />

                        {/* Descripción */}
                        {/* <MDBTextArea className="mt-4" type='text' id='description' label='Descripción' rows={4} /> */}

                        {/* Comprobar que solo se puede exportar o terminar cuestionarios si hay al menos una pregunta */}
                        <MDBBtn type='submit' className='mt-4' block onClick={saveToAccount}>
                            <MDBIcon fas icon="check-double" /> {bookToBeEdited ? 'Guardar cambios' : 'Crear libro'}
                        </MDBBtn>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateQuiz;