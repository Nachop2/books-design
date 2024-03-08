import {
    MDBBtn,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle, MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

export const Question = ({ pregunta, removeQuestion }) => {
    const { enunciado, respuestas } = pregunta;



    return (
        <MDBListGroupItem>
            <MDBCard className="m-3">
                <div className="d-flex justify-content-end">
                    <MDBBtn color='danger' className='btn-close mt-2 me-2' aria-label='Close'
                            onClick={() => removeQuestion(pregunta.id)}></MDBBtn>
                </div>
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
    )
}

export default Question;