import {MDBCard} from "mdb-react-ui-kit";
import {useState} from "react";
import InvoiceCardMenu from "./CardComponents/InvoiceCardMenu";
import InvoiceCardSearch from "./CardComponents/InvoiceCardSearch";

const InvoiceCardList = ({ buttons = true }) => {

  const [term, setTerm] = useState("");

  const fetchInvoiceSearch = async (event, newTerm) => {
    setTerm(newTerm);
    event.preventDefault();
    console.log(term);
    
};

  return (
      <div className="mt-5">
          <MDBCard>
              <InvoiceCardSearch  fetchInvoiceSearch={fetchInvoiceSearch}></InvoiceCardSearch>
              <InvoiceCardMenu term={term}></InvoiceCardMenu>
          </MDBCard>
      </div>

  );
}

export default InvoiceCardList;