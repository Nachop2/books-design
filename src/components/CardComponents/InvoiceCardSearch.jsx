import {MDBBtn, MDBCardHeader, MDBCol, MDBIcon, MDBRow, MDBTypography} from "mdb-react-ui-kit";

const InvoiceCardSearch = ({fetchInvoiceSearch}) => {

  return (
      <MDBCardHeader>
          <MDBRow>
              <MDBCol className="col-2">
                  <MDBTypography tag='h3' className="text-center my-3">
                      <MDBIcon fas icon={"file-pdf"} /> {"Facturas"}
                  </MDBTypography>
              </MDBCol>
              <MDBCol className="d-flex " style={{ alignItems: "center" }}>
                  <form className="input-group my-2">
                      <input type="search" className="form-control" placeholder="Buscar..." aria-label="Search" id="invoiceSearch"/>
                      <MDBBtn color="primary"
                      aria-label="search books"
                      onClick={(e)=>fetchInvoiceSearch(e,document.getElementById("invoiceSearch").value)}
                      ><MDBIcon fas icon="search" /></MDBBtn>
                  </form>
              </MDBCol>
          </MDBRow>
      </MDBCardHeader>
  );

}

export default InvoiceCardSearch