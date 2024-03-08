import {createContext, useState} from "react";

const CreateQuizContext = createContext();
const CreateQuizContextProvider = ({ children }) => {
    const [idPreguntaActual, setIdPreguntaActual] = useState(1);
    const [preguntas, setPreguntas] = useState([]);

    return (
        <CreateQuizContext.Provider value={{
            currentQuestionId: {idPreguntaActual, setIdPreguntaActual},
            questions: {preguntas, setPreguntas}
        }}>
            {children}
        </CreateQuizContext.Provider>
    );
};

export { CreateQuizContext, CreateQuizContextProvider };