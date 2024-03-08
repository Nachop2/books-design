import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const Privacy = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard alignment='center'>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="user-secret" /> Política de privacidad
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem noBorders>
                                <p>
                                    Estamos comprometidos a proteger su privacidad.
                                    Solo utilizaremos la información que recopilamos sobre usted de manera legal
                                    (de acuerdo con el Reglamento General de Protección de Datos (GDPR).
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag='h4' className="py-3 border-bottom">
                                    Recopilación de Información Personal
                                </MDBTypography>
                                <p>
                                    Recopilamos información sobre usted por 2 razones: primero, para procesar su pedido y segundo, para brindarle
                                    el mejor servicio posible. No le enviaremos correos electrónicos en el futuro
                                    a menos que nos haya dado su consentimiento.
                                    Le daremos la oportunidad de rechazar cualquier correo electrónico de marketing de nosotros
                                    o de otro comerciante en el futuro.
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag="h4" className="py-3 border-bottom">
                                    Uso de la Información Personal
                                </MDBTypography>
                                <p>
                                    No venderemos, distribuiremos o alquilaremos su información personal a terceros
                                    a menos que tengamos su permiso o
                                    estemos obligados por ley a hacerlo.
                                    Podemos usar su información personal para enviarle información promocional sobre terceros
                                    que creemos que pueden ser de su interés si nos dice que desea que esto suceda.
                                </p>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Privacy;