import ReactPDF, { PDFDownloadLink, PDFRenderer, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import ReactDOM from 'react-dom';
import { Page } from "@react-pdf/renderer";
import { Text } from "@react-pdf/renderer";
import { Document } from "@react-pdf/renderer";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
const PdfRender = () => {

    return (
        <div className="w-100">
            <PDFViewer className="w-100 vh-100">
                <Document>
                    <InvoicePDF pdf={true}></InvoicePDF>
                </Document>
            </PDFViewer>
        </div>


    )
}
export default PdfRender;