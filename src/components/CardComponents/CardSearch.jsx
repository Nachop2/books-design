import {MDBBtn, MDBCardHeader, MDBCol, MDBIcon, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {BookInvoiceContext} from "../BookContext";
import {useContext} from "react";


const CardSearch = () => {
    const { fetchBooksSearch } = useContext(BookInvoiceContext)

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
                        <input type="search" className="form-control" placeholder="Buscar..." aria-label="Search" id="bookSearch"/>
                        <MDBBtn color="primary"
                        aria-label="search books"
                        onClick={(e)=>fetchBooksSearch(e,document.getElementById("bookSearch").value)}
                        ><MDBIcon fas icon="search" /></MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBCardHeader>
    );

}

export default CardSearch