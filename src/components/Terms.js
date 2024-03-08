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

const Terms = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard alignment='center'>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="scroll" /> Términos y condiciones
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem noBorders>
                                <p>
                                    Bienvenido a nuestro sitio web de trivia. Si continúa navegando y utilizando este sitio web,
                                    acepta cumplir con los siguientes términos y condiciones de uso,
                                    que junto con nuestra política de privacidad rigen nuestra relación con usted en relación
                                    con este sitio web. Si no está de acuerdo con alguna parte de estos términos y condiciones,
                                    por favor no utilice nuestro sitio web.
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag='h4' className="py-3 border-bottom">
                                    El uso de este sitio web está sujeto a los siguientes términos de uso:
                                </MDBTypography>
                                <MDBListGroup light numbered>
                                    <MDBListGroupItem noBorders>
                                        El contenido de las páginas de este sitio web es únicamente para su información general y uso.
                                        Está sujeto a cambios sin previo aviso.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Este sitio web utiliza cookies para monitorear las preferencias de navegación.
                                        Si permite que se utilicen cookies, la siguiente información personal puede ser almacenada
                                        por nosotros para uso de terceros.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Ni nosotros ni terceros proporcionamos ninguna garantía o garantía en cuanto a la precisión,
                                        puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados
                                        u ofrecidos en este sitio web para un propósito particular.
                                        Usted reconoce que tal información y materiales pueden contener imprecisiones o errores,
                                        y excluimos expresamente la responsabilidad por tales imprecisiones o errores en la máxima medida permitida por la ley.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Su uso de cualquier información o material en este sitio web es totalmente bajo su propio riesgo,
                                        por lo que no seremos responsables. Será su responsabilidad asegurarse de que cualquier producto,
                                        servicio o información disponible a través de este sitio web satisfaga sus requisitos específicos.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Este sitio web contiene material que es propiedad de nosotros o con licencia para nosotros.
                                        Este material incluye, entre otros, el diseño, la disposición, el aspecto, la apariencia y los gráficos.
                                        Se prohíbe la reproducción que no esté de acuerdo con el aviso de derechos de autor,
                                        que forma parte de estos términos y condiciones.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Todas las marcas comerciales reproducidas en este sitio web, que no son propiedad de,
                                        o con licencia para, el operador, son reconocidas en el sitio web.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        El uso no autorizado de este sitio web puede dar lugar a una reclamación por daños y perjuicios
                                        y/o ser un delito penal.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web.
                                        Estos enlaces se proporcionan para su conveniencia para proporcionar más información.
                                        No significan que respaldemos el (los) sitio(s) web. No tenemos ninguna responsabilidad
                                        por el contenido del (los) sitio(s) web vinculado(s).
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web.
                                        Estos enlaces se proporcionan para su conveniencia para proporcionar más información.
                                        No significan que respaldemos el (los) sitio(s) web. No tenemos ninguna responsabilidad
                                        por el contenido del (los) sitio(s) web vinculado(s).
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Su uso de este sitio web y cualquier disputa derivada de dicho uso del sitio web está sujeto
                                        a las leyes de Inglaterra, Irlanda del Norte, Escocia y Gales.
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBListGroupItem>


                        </MDBListGroup>

                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Terms;