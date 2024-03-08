import {
    MDBBtnGroup,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle, MDBListGroup, MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

export const CheckQuestions = ({ preguntas }) => {
    return (
        <div className="mt-5">
            {preguntas.length > 0 && (<h1>¡Comprueba tu test!</h1>)}
            <MDBListGroup light>
                {
                    preguntas.map(pregunta => {
                        const { enunciado, respuesta } = pregunta;
                        return (
                            <MDBListGroupItem>
                                <MDBCard className="m-3">
                                    <MDBCardHeader className="text-center">
                                        <MDBTypography tag="h4">Pregunta nº{pregunta.id}</MDBTypography>
                                    </MDBCardHeader>
                                    <MDBCardBody className="text-center">
                                        <MDBCardTitle>{enunciado}</MDBCardTitle>
                                        <MDBCardText className="mt-4">
                                            <MDBBtnGroup vertical>
                                                {
                                                    pregunta.respuestas.map((respuesta, index) => {
                                                        console.log(respuesta);
                                                        return (
                                                            <>
                                                                <input
                                                                    type="radio"
                                                                    className="btn-check"
                                                                    name={`btn-respuesta`}
                                                                    id={`${pregunta.id}vbtn-radio${index}test`}
                                                                    autoComplete="off"
                                                                />
                                                                <label
                                                                    className="btn btn-outline-danger"
                                                                    htmlFor={`${pregunta.id}vbtn-radio${index}test`}
                                                                >
                                                                    {respuesta}
                                                                </label>
                                                            </>
                                                        )
                                                    })

                                                }
                                            </MDBBtnGroup>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBListGroupItem>
                            // <Pregunta key={p.id} pregunta={p} />
                        )
                    })
                }
            </MDBListGroup>
        </div>
    )
    // const [pregunta, setPregunta] = useState({
    //     enunciado: "",
    //     respuestas: ["", "", "", ""],
    //     respuestacorrecta: -1,
    //     favorita: false
    // })
}

export default CheckQuestions;