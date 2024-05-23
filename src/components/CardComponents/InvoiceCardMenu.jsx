import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardLink, MDBCardTitle, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { BookInvoiceContext } from "../BookContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const InvoiceCardMenu = ({ term }) => {

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoices`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const newData = await response.json();
      console.log(newData);
      setPagination([newData.current_page, newData.next_page_url, newData.last_page, newData.last_page_url, newData.first_page_url, newData.prev_page_url])

      setInvoices(newData.data)
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const searchInvoice = async () => {
      if (term == "") {
        fetchInvoices();
        return true;
      }
      term = parseInt(term, 10)
      navigate("/pdf/" + term);
    }
    searchInvoice();
  }, [term])

  useEffect(() => {
    fetchInvoices();
  }, [])

  const token = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  useEffect(() => {
  //   let dateMatch = invoice.created_at.match(/(\d{4})-(\d{2})-(\d{2})/);
  // const dateArray = dateMatch[0].split('-');
  // document.querySelector("#date").textContent = dateArray[2] + "/" + dateArray[1] + "/" +  dateArray[0];
    const prepareCards = invoices.map(invoice => ({
      id: invoice.id,
      title: "Factura#" + (invoice.id).toString().padStart(7, "0") + " - Cliente: " + invoice.clientName,
      category_names: ["Emitido: " + invoice.created_at.match(/(\d{4})-(\d{2})-(\d{2})/)[0]],
      //image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
    }));
    setCards(prepareCards);
  }, [invoices])


  return (

    <MDBCardBody>
      <MDBRow className="row-cols-1 row-cols-md-12 g-4">
        {
          cards.map((card, i) => (
            <MDBCol key={i} className="col-6">
              <MDBCard>

                <MDBCardBody>

                  <MDBRow>
                    <MDBCol className="text-center text-lg-start col-8">
                      {/* href={`/quiz/play/${card.id}`} */}
                      <MDBCardTitle className="text-primary" dangerouslySetInnerHTML={{ __html: card.title }}></MDBCardTitle>
                      {card.category_names.map(name => (
                        <MDBBadge pill light color='primary' className="mb-3 me-1">
                          {name}
                        </MDBBadge>

                      ))}
                      {/* <MDBCardText>{card.text}</MDBCardText> */}

                    </MDBCol>
                    <MDBCol className="d-flex align-items-center justify-content-center justify-content-lg-end " >
                      <MDBBtn color="primary" className="ps-3 pe-3 ms-2" onClick={() => navigate(`/pdf/${card.id}`)}
                        style={{ minWidth: "fit-content" }}
                        aria-label="edit book">
                        <MDBIcon fas icon="eye" />
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        }
        <MDBCol>
          <Pagination paginationFunction={fetchInvoices} paginationInfo={pagination}></Pagination>
        </MDBCol>
      </MDBRow>

    </MDBCardBody>
  )
}

export default InvoiceCardMenu