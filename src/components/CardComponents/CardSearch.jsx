import {
    MDBBtn,
    MDBCardHeader,
    MDBCol,
    MDBIcon,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";


const CardSearch = () => {

    return (
        <MDBCardHeader>
            <MDBRow>
                <MDBCol className="col-2">
                    <MDBTypography tag='h3' className="text-center my-3">
                        <MDBIcon fas icon={"book-open"} /> {"Libros"}
                    </MDBTypography>
                </MDBCol>
                <MDBCol className="d-flex " style={{ alignItems: "center" }}>
                    <form className="input-group my-2">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        <MDBBtn color="primary"><MDBIcon fas icon="search" /></MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBCardHeader>
    );

}

export default CardSearch