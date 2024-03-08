import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader, MDBIcon,
    MDBTypography
} from "mdb-react-ui-kit";

const Settings = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="cog" /> Settings
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <div className="d-grid gap-2">
                        <MDBBtn color="danger">Delete account</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Settings;
