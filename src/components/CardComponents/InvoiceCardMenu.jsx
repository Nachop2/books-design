import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardLink, MDBCardTitle, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { BookInvoiceContext } from "../BookContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const InvoiceCardMenu = ({ enabledButtons = true }) => {

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState([]);
  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoices`, {
        method: 'GET',
        //credentials: 'include'
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
    fetchInvoices();
  }, [])

  const token = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  useEffect(() => {
    const prepareCards = invoices.map(invoice => ({
      id: invoice.id,
      title: "Factura: " + (invoice.id).toString().padStart(7, "0") + " - Cliente: " + invoice.clientName,
      category_names: ["Emitido: " + invoice.created_at],
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
                {!enabledButtons ?
                  card.stock > 0 ?
                    <div
                      className='mask rounded-3'
                      style={{
                        background: 'rgba(0, 0, 255, 0.075)',
                        cursor: "pointer"
                      }}
                      onClick={() => bookTest(card.id)}
                    ></div>
                    :
                    <div
                      className='mask rounded-3'
                      style={{
                        background: 'rgba(255, 0, 0, 0.075)',
                        cursor: "not-allowed"
                      }}
                    ></div> : null}
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