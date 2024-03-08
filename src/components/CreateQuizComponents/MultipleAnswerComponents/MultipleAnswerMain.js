import { useEffect, useContext } from 'react';
import { MultipleAnswerQuestion } from './MultipleAnswerQuestion';
import {CreateQuizContext} from "../CreateQuizContext";

function MultipleAnswerMain() {
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
      <MultipleAnswerQuestion
        addPregunta={addQuestion}>
      </MultipleAnswerQuestion>
    </>
  );
}

export default MultipleAnswerMain;
