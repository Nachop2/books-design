import {useEffect, useState} from "react";
import {
    MDBAccordion, MDBAccordionItem,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBIcon, MDBListGroup, MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const QuestionBank = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async (e) => {
            // NOTA: En vez de usar la ruta "https://localhost:8000/api/user/tests",
            // sería ideal usar una ruta que directamente cogiera datos de solamente las preguntas
            // creadas por el usuario
            try {
                const response = await fetch('https://localhost:8000/api/user/tests', {
                    
                    method: 'GET',
                    credentials: 'include', // Include cookies for the domain
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const questionData = await response.json();
                console.log(questionData);
                setQuestions(questionData.questions); // TODO - NOTA: Sustituir "questionData.questions" por lo que se saque de otra ruta futura
            }
            catch (error) {
                console.error('There was a problem with the fetching the user questions :', error);
            }
        }

        fetchQuestions();
    }, []);


    return (
        <div className="d-flex justify-content-center mt-5">
            <MDBCard alignment='center'>
                <MDBCardHeader>
                    <MDBTypography tag='h3'>
                        <MDBIcon fas icon="th-list" /> Banco de preguntas
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBAccordion flush initialActive={1}>
                            {questions.map((question, index) => (
                                <MDBAccordionItem collapseId={index + 1} headerTitle={question.enunciado}>
                                    <MDBListGroup light small>
                                        {question.respuestas.map(respuesta => (
                                            <MDBListGroupItem>
                                                {respuesta === question.respuestas[question.respuestacorrecta] ? (
                                                    <MDBIcon fas icon="check" color="success"/>
                                                ) : (
                                                    <MDBIcon fas icon="times-circle" color="danger"/>
                                                )}
                                                {respuesta}
                                            </MDBListGroupItem>
                                        ))}
                                    </MDBListGroup>
                                </MDBAccordionItem>
                            ))}
                        </MDBAccordion>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default QuestionBank;