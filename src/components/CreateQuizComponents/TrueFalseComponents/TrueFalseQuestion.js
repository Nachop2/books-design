import {useState} from "react";
import Swal from "sweetalert2";
import {MDBBtn, MDBIcon, MDBInput, MDBRadio, MDBSwitch, MDBTextArea, MDBTypography} from "mdb-react-ui-kit";

const TrueFalseQuestion = ({ addPregunta }) => {
    const [pregunta, setPregunta] = useState({
        enunciado: "",
        respuestas: ["Verdadero", "Falso"],
        tipo: "falsoVerdadero",
        respuestacorrecta: -1,
        favorita: false
    })

    function handleValidation() {
        let errors = [];
        if (pregunta.enunciado?.trim().length === 0) {
            errors.push("Enunciado");
        }

        if (pregunta.respuestacorrecta === -1) {
            errors.push("Respuesta correcta");
        }

        // Return errors, or validation passed
        if (errors.length === 0) {
            return true;
        } else {
            return errors;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let check = handleValidation();
        if (check !== true) {
            let errors = "";
            check.forEach((e, index) => {
                if (index === 0){
                    errors += e;
                }
                else {
                    errors += ", " + e;
                }
            })
            Swal.fire({
                icon: "error",
                title: "La pregunta tiene campos vacios: " + errors,
                showConfirmButton: true,
            })
        } else {
            addPregunta({
                ...pregunta
            });
            Swal.fire({
                icon: "success",
                title: "Pregunta añadida correctamente",
                showConfirmButton: false,
                timer: 1200
            })
        }
    }

    const handleChange = (e) => {
        let nuevoValor = (e.target.type === "checkbox") ? e.target.checked : e.target.value;

        if (e.target.type === "radio") {
            nuevoValor = parseInt(e.target.id[e.target.id.length - 1])
        }

        console.log(e.target.name);
        console.log(nuevoValor);
        if (e.target.type !== "text") {
            setPregunta({
                ...pregunta,
                [e.target.name]: nuevoValor
            })
        } else {
            // Create a copy
            const updatedRespuestas = [...pregunta.respuestas];
            // Update respuesta array
            updatedRespuestas[e.target.name[e.target.name.length - 1]] = e.target.value;
            setPregunta({
                ...pregunta,
                respuestas: updatedRespuestas
            })
        }
    }


    return (
        //En cada elemento usamos el spreed operator ... para crear una copia del estado y modificar
        //el valor que ha cambiado
        <form className="mt-5" onSubmit={handleSubmit}>
            <MDBTypography tag='strong' className="text-info">
                (Recuerde marcar la respuesta correcta para cada pregunta)
            </MDBTypography>
            <MDBTextArea label='Enunciado de pregunta' className="mt-3"
                         id='textAreaExample' rows={4} name="enunciado"
                         value={pregunta.enunciado} onChange={handleChange}/>
            {
                pregunta.respuestas.map((respuesta, index) => {
                    return (
                        <div className="form-check mt-5" key={index}>
                            <MDBRadio name="respuestacorrecta" id={"inputCheck" + index} onChange={handleChange}/>
                            <MDBInput type="text" label={"Respuesta " + respuesta} className="mb-2"
                                      name={"respuesta" + index} htmlFor={"inputCheck" + index}
                                      value={pregunta.respuestas[index]} onChange={handleChange} disabled/>
                        </div>
                    )
                })

            }


            <div className="form-check form-switch form-check-reverse mt-3">
                <MDBSwitch name="favorita" id="inputCheckFavourite" label="Favorita" checked={pregunta.favorita}
                    //onChange={(e) => (setRegistroForm({...registroForm, priority: e.target.checked}))}/
                           onChange={handleChange}/>
            </div>
            <div className="d-grid gap-2 mt-3">
                <MDBBtn type="submit" color="success">
                    <MDBIcon fas icon="check" /> Terminar pregunta
                </MDBBtn>
            </div>
        </form>
    )
}

export default TrueFalseQuestion;