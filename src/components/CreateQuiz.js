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

    const handleCategoryDelete = (categoryId) => {
        setSelectedCategories((prevCategories) => prevCategories.filter(category => category.id !== categoryId));
    };

    const handleCategorySelect = (event) => {
        const selectedCategoryName = event.target.value;

        if (selectedCategoryName && !selectedCategories.some(category => category.name === selectedCategoryName)) {
            handleCategoryDelete(selectedCategories.find(category => category.name === "Sin categorizar")?.id);

            const newCategory = {
                id: categories.find(category => category.name === selectedCategoryName)?.id, // El ID sería idéntico al que le corresponde de la BD
                name: selectedCategoryName,
                created_at: categories.find(category => category.name === selectedCategoryName)?.created_at,
                updated_at: categories.find(category => category.name === selectedCategoryName)?.updated_at
            };

            setSelectedCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    };

    const handleVisibilityTypeSelect = (event) => {
        setSelectedVisibility(event.target.value);
    };

    const handleQuestionTypeSelect = (event) => {
        setSelectedQuestionType(event.target.value);
    };

    const removeQuestion = (id) => {
        Swal.fire({
            title: `¿Borrar la pregunta nº${id}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ca104",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, bórrala"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Aa" + id);
                console.log(id);

                // Hacer que las preguntas estén ordenadas, independientemente de cuál se borre:
                setPreguntas(preguntas
                    .filter((pregunta) => pregunta.id !== id)
                    .map((pregunta, index) => ({ ...pregunta, id: index + 1 })));
                setIdPreguntaActual(preguntas.length);

                Swal.fire({
                    title: "¡Eliminada!",
                    text: "La pregunta fue eliminada correctamente",
                    icon: "success"
                });
            }
        });

    }


    const saveToAccount = async () => {
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append('name', document.querySelector("#title").value);
        formData.append('visibility', selectedVisibility);
        formData.append('description', document.querySelector("#description").value);


        let CategoryIDs = [];

        selectedCategories.forEach(element => {
            CategoryIDs.push(element.id);
        });

        console.log(CategoryIDs);

        // Append each category ID individually
        CategoryIDs.forEach((categoryId) => {
            formData.append('category_ids[]', categoryId); // Notice 'category_ids[]' to denote it's an array
        });

        let blob = new Blob([JSON.stringify(preguntas)], { type: "application/json" });
        let file = new File([blob], "preguntas.json", {
            type: "application/json",
            lastModified: new Date()
        });
        formData.append('test_file', file);


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
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload-test`, {

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
                        title: "El cuestionario ha sido subido a la plataforma con éxito",
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
                        <MDBInput type='text' id='title' label='Título' />
                        <MDBInput className="mt-4" type='text' id='ISBN' label='ISBN' />
                        <MDBInput className="mt-4" type='text' id='Autor' label='Autor' />

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