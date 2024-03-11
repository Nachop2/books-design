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


const CreateQuiz = ({ quizToBeEdited }) => {
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
        // Si la edición está activada, esto se encarga de recoger los datos de las categorías correspondientes
        // y actualizar las categorías seleccionadas
        const quizCategoryData = async (e) => {
            if (quizToBeEdited && categories.length !== 0) {
                const data = quizToBeEdited.category_names.map(category_name => {
                    return categories.find(category => category.name === category_name);
                });
                setSelectedCategories(data);
            }
        }

        quizCategoryData();
    }, [categories]);


    useEffect(() => {
        // Regresa al estado por defecto para la lista de categorías seleccionadas si no hay ninguna
        if (selectedCategories.length === 0) {
            setSelectedCategories([{ id: 1, name: "Sin categorizar", created_at: "", updated_at: "" }]);
        }
    }, [selectedCategories]);

    useEffect(() => {
        // Si la edición está activada, esto se encarga de recoger los datos del test y actualizar
        if (quizToBeEdited) {
            setPreguntas(quizToBeEdited.questions);
            setSelectedVisibility(quizToBeEdited.visibility);
            setIdPreguntaActual(quizToBeEdited.questions.length + 1);

            document.querySelector("#title").value = quizToBeEdited.name;
            document.querySelector("#title").classList.add("active");

            document.querySelector("#description").value = quizToBeEdited.description;
            document.querySelector("#description").classList.add("active");
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

        //formData.append('description', document.querySelector("#description").value);


        console.log(formData);
        if (quizToBeEdited) {

            // Use method spoofing for Laravel, since using PUT doesn't work properly
            formData.append('_method', 'PUT');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/test/` + quizToBeEdited.test_id, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies for the domain
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
                    <MDBTypography tag='h3' className="my-3">{quizToBeEdited ? 'Editar' : 'Crear'} libro</MDBTypography>
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
                        <MDBTextArea className="mt-4" type='text' id='description' label='Descripción' rows={4} />

                        {/* Comprobar que solo se puede exportar o terminar cuestionarios si hay al menos una pregunta */}
                        <MDBBtn type='submit' className='mt-4' block onClick={saveToAccount}>
                            <MDBIcon fas icon="check-double" /> Crear libro
                        </MDBBtn>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateQuiz;