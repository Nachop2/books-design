import {useContext} from "react";
import {CreateQuizContext} from "../CreateQuizContext";
import TrueFalseQuestion from "./TrueFalseQuestion";

const TrueFalseMain = () => {
    const { currentQuestionId, questions } = useContext(CreateQuizContext);
    const { preguntas, setPreguntas } = questions;
    let { idPreguntaActual, setIdPreguntaActual} = currentQuestionId;

    const addQuestion = (nueva) => {
        nueva.id = idPreguntaActual;
        setIdPreguntaActual(idPreguntaActual + 1); {/* NOTA: No usar el incrementor "++": ¡no funciona! */}
        setPreguntas([...preguntas, nueva]);
    }

    return (
        <>
            <TrueFalseQuestion addPregunta={addQuestion}/>
        </>
    );
}

export default TrueFalseMain;