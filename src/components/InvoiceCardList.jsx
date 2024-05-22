import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage, MDBCardLink,
  MDBCardText,
  MDBCardTitle,
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselItem,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRipple,
  MDBRow,
  MDBTypography
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardMenu from "./CardComponents/CardMenu";
import CardSearch from "./CardComponents/CardSearch";
import InvoiceCardMenu from "./CardComponents/InvoiceCardMenu";
const InvoiceCardList = ({ buttons = true }) => {

  return (
      <div className="mt-5">
          <MDBCard>
              <CardSearch></CardSearch>
              <InvoiceCardMenu></InvoiceCardMenu>
          </MDBCard>
      </div>

  );
}

export default InvoiceCardList;