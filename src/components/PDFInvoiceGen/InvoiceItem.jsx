import { useState } from "react";
import TextPDF from "./TextPDF"

import {
    MDBCheckbox,
    MDBCol,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBRow,
} from "mdb-react-ui-kit";

const InvoiceItem = ({ styles, item, handleQuantity, handleDelete, index }) => {

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
            <MDBRow className="align-items-center mx-0 mt-1">
                <MDBCol className="col-4 px-2">
                    <TextPDF text={item.title} styling={`${styles.input} ${styles.dark}`}></TextPDF>
                </MDBCol>
                <MDBCol className="px-2 col-2">
                    <div className="ps-1 pe-3">
                        <select value={item.chosenQuantity} className={`${styles.select} ${styles.dark} text-end `}>
                            {[...Array(item.stock)].map((x, i) =>
                                <option value={i + 1} onClick={(e) => handleQuantity(index, (i + 1), e)} >{i + 1}</option>
                            )}
                        </select>
                    </div>

                </MDBCol>
                <MDBCol className="text-center px-2 col-2">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' aria-label='...'></MDBCheckbox>
                </MDBCol>
                <MDBCol className="col-2 px-2 col-2">
                    <TextPDF text={price + "€"} styling={`${styles.input} ${styles.dark} text-center`}></TextPDF>
                </MDBCol>
                <MDBCol className="px-2 col-1 col-2">
                    <TextPDF text={total + "€"} styling={`${styles.span} ${styles.dark} text-end`}></TextPDF>
                </MDBCol>
            </MDBRow>







            
        </>

    )

}

export default InvoiceItem