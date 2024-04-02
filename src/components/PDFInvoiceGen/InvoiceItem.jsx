import { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import {
    MDBCheckbox,
    MDBCol,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";

const InvoiceItem = ({ styles, item, handleQuantity, handleDelete, handleDonation, index }) => {

    let price = 0;
    let total = 0;
    if (item.donation == false) {
        price = item.price
        price = price.toFixed(2);
        total = (price * item.chosenQuantity).toFixed(2);
    } else {
        price = price.toFixed(2);
        total = total.toFixed(2);
    }




    return (
        <>
            <MDBRow className="align-items-center mx-0 mt-1 theHover">
                <MDBCol className="col-4 px-2">
                    <Text className={`pdfPad d-inline-block pdfFont text-black`}>{item.title}</Text>

                </MDBCol>
                <MDBCol className="px-2 col-2">
                    <div className="ps-1 pe-3">
                        <select value={item.chosenQuantity} className={`${styles.select} text-black text-end `}>
                            {[...Array(item.stock)].map((x, i) =>
                                <option value={i + 1} onClick={(e) => handleQuantity(index, (i + 1), e)} >{i + 1}</option>
                            )}
                        </select>
                    </div>

                </MDBCol>
                <MDBCol className="text-center px-2 col-2">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' aria-label='...' onClick={() => { handleDonation(index) }}></MDBCheckbox>
                </MDBCol>
                <MDBCol className="col-2 px-2 col-2">
                    <Text className={`w-100 pdfPad d-inline-block pdfFont text-black text-center`}>{price + "€"}</Text>

                </MDBCol>
                <MDBCol className="px-2 col-1 col-2">
                    <Text className={`w-100 pdfPad d-inline-block pdfFont text-black text-end fw-bold`}>{total + "€"}</Text>
                </MDBCol>
                <div style={{ height: "0px", width: "0px" }} className="xVoid ">
                    <MDBIcon fas icon="times-circle" className="text-danger xButtonCSSInvoice py-3 pe-2" size="lg"
                        onClick={(e) => handleDelete(index)}
                    />
                </div>
            </MDBRow>
        </>

    )

}

export default InvoiceItem