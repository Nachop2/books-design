import {MDBCard, MDBCardBody, MDBCardText, MDBTypography} from "mdb-react-ui-kit";

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard className="mt-5">
                <MDBCardBody>
                    <MDBCardText>
                        <MDBTypography tag="h2">Error 404 - Página no encontrada</MDBTypography>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default NotFound;