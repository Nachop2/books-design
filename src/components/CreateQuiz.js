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


    const uploadJson = (event) => {
        const file = event.target.files[0];

        if (file.size === 0) {
            console.error("El cuestionario a importar está vacío");
            Swal.fire({
                icon: "error",
                title: "El cuestionario a importar está vacío",
                showConfirmButton: true,
            })
            return;
        }

        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);

        function onReaderLoad(event) {
            const result = event.target.result;

            // Verificar si el resultado es nulo o el archivo está vacío
            if (!result) {
                console.error("El cuestionario a importar está vacío");
                Swal.fire({
                    icon: "error",
                    title: "El cuestionario importado está vacío",
                    showConfirmButton: true,
                })
                return;
            }

            console.log(result);
            const importedQuestions = JSON.parse(result);

            // Verificar el formato del archivo
            // if (!checkFileFormat(importedQuestions)) {
            //     console.error("El formato del archivo es inválido");
            //     Swal.fire({
            //         icon: "error",
            //         title: "El formato del archivo es inválido. Por favor, revise que su cuestionario esté bien escrito o no infringa ninguna norma",
            //         showConfirmButton: true,
            //     })
            //     return;
            // }

            // Continuar con el procesamiento del archivo
            setPreguntas(importedQuestions);
            setIdPreguntaActual(importedQuestions.length + 1);
            Swal.fire({
                icon: "success",
                title: "El cuestionario ha sido importado con éxito",
                showConfirmButton: true,
            })
            console.log("El cuestionario ha sido importado con éxito")
        }

        function checkFileFormat(preguntas) {
            // Verificar si el cuestionario es un arreglo
            if (!Array.isArray(preguntas)) {
                return false;
            }

            const idsUnicos = new Set();
            const enunciadosUnicos = new Set();

            // Verificar cada pregunta en el cuestionario
            for (const pregunta of preguntas) {
                // Comprobar si el ID de la pregunta es único
                if (idsUnicos.has(pregunta.id)) {
                    return false;
                }
                idsUnicos.add(pregunta.id);


                // Comprobar si el enunciado de la pregunta es único
                if (enunciadosUnicos.has(pregunta.enunciado)) {
                    return false;
                }
                enunciadosUnicos.add(pregunta.enunciado);


                // Comprobar si las respuestas no se repiten
                const respuestasUnicas = new Set(pregunta.respuestas);
                if (respuestasUnicas.size !== pregunta.respuestas.length) {
                    return false; // Respuestas no son únicas, formato inválido
                }

                // Comprueba si cada respuesta es una cadena de texto
                if (!pregunta.respuestas.every(respuesta => typeof respuesta === 'string')) {
                    return false;
                }


                // Verificar si la pregunta tiene todas las propiedades necesarias y cumple el formato
                if (
                    typeof pregunta.enunciado !== "string" ||
                    !Array.isArray(pregunta.respuestas) ||
                    pregunta.respuestas.length < 2 ||
                    typeof pregunta.respuestacorrecta !== "number" ||
                    pregunta.respuestacorrecta < 0 ||
                    pregunta.respuestacorrecta % 1 !== 0 ||
                    pregunta.respuestacorrecta >= pregunta.respuestas.length ||
                    typeof pregunta.favorita !== "boolean" ||
                    typeof pregunta.id !== "number" ||
                    pregunta.id % 1 !== 0 ||
                    pregunta.id < 1
                ) {
                    return false;
                }
            }

            // Si todas las preguntas pasan la verificación, el formato es válido
            return true;
        }
    };


    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">{quizToBeEdited ? 'Editar' : 'Crear'} cuestionario</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>

                    <MDBCardText>
                        {/* Título */}
                        <MDBInput type='text' id='title' label='Título'/>

                        {/* Visibilidad del test */}
                        <div className="mt-4">
                            <MDBTypography tag='h6'>Visibilidad</MDBTypography>
                            <select className="form-select mb-4" id='type'
                                value={selectedVisibility} onChange={handleVisibilityTypeSelect}>
                                <option value="">-- Elige la visibilidad--</option>
                                <option value="private">Privada</option>
                                <option value="friend">Solo amigos</option>
                                <option value="public">Publica</option>
                            </select>
                        </div>

                        {/* Descripción */}
                        <MDBTextArea type='text' id='description' label='Descripción' rows={4} />
                        {/* Categorías */}
                        <div className="mt-4">
                            <MDBTypography tag='h6'>Categorías</MDBTypography>
                            <select className="form-select mb-4" id='category'
                                value={selectedCategory} onChange={handleCategorySelect}>
                                <option value="" selected>-- Elija las categorías del test --</option>
                                {categories.map(category => (
                                    <option value={`${category.name}`}>{category.name}</option>
                                ))}
                            </select>
                            <MDBListGroup className="mt-3" id="categories">
                                {selectedCategories.map(category => (
                                    <MDBListGroupItem key={category.id} className="d-flex justify-content-between align-items-center">
                                        {category.name}
                                        {category.name === "Sin categorizar" ?
                                            "" : <MDBIcon icon="times" color="danger" style={{ cursor: "pointer" }} onClick={() => handleCategoryDelete(category.id)} />}
                                    </MDBListGroupItem>
                                ))}
                            </MDBListGroup>
                        </div>


                        {/* Tipo de pregunta */}
                        <div className="mt-4">
                            <MDBTypography tag='h6'>Preguntas</MDBTypography>
                            <select className="form-select mb-4" id='type'
                                value={selectedQuestionType} onChange={handleQuestionTypeSelect}>
                                <option value="">-- Elige el tipo de pregunta --</option>
                                <option value="Opcion multiple">Opción múltiple</option>
                                {/* <option value="Multiple respuestas">Multiple respuestas</option> */}

                                <option value="Verdadero / Falso">Verdadero / Falso</option>
                                {/* <option value="Relacional">Relacional</option> */}
                            </select>
                        </div>

                        {/* Enseñar pregunta según el tipo elegido */}
                        {selectedQuestionType === 'Opcion multiple' && (
                            <div>
                                <MultipleChoiceMain />
                            </div>
                        )}
                        {selectedQuestionType === 'Verdadero / Falso' && (
                            <div>
                                <TrueFalseMain />
                            </div>
                        )}
                        {selectedQuestionType === 'Multiple respuestas' && (
                            <div>
                                <MultipleAnswerMain />
                            </div>
                        )}
                        {selectedQuestionType === 'Relacional' && (
                            <div>
                                <p>Texto de muestra para Relacional</p>
                            </div>
                        )}


                        {/* Importación de cuestionario */}
                        <div className="mt-5">
                            <MDBFile label="Importar cuestionario" id="avatar" name="avatar" accept=".json" onChange={uploadJson} />
                        </div>


                        <CreatedQuestions
                            preguntas={preguntas}
                            removeQuestion={removeQuestion}
                        ></CreatedQuestions>

                        <CheckQuestions
                            preguntas={preguntas}
                        ></CheckQuestions>

                        {/* Comprobar que solo se puede exportar o terminar cuestionarios si hay al menos una pregunta */}
                        {preguntas.length > 0 && (
                            <>
                                <div className="mt-5">
                                    <a id="downloadAnchorElem" href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preguntas))}
                                        download="preguntas.json">
                                        <MDBBtn color="info" block>
                                            <MDBIcon fas icon="file-export" /> Exportar cuestionario
                                        </MDBBtn>
                                    </a>
                                </div>
                                <MDBBtn type='submit' className='mt-4' block onClick={saveToAccount}>
                                    <MDBIcon fas icon="check-double" /> Terminar cuestionario
                                </MDBBtn>
                            </>
                        )}

                        {/* {selectedQuestionType !== "" && (
                            <MDBBtn type='submit' className='mb-4' block>
                                Confirmar
                            </MDBBtn>
                        )} */}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateQuiz;