import { useState } from "react";
import TextPDF from "./TextPDF"

import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
} from "mdb-react-ui-kit";

const InvoiceItem = ({ styles, item, handleQuantity, handleDelete, index }) => {
    let price = item.price
    price = price.toFixed(2);
    let total = (price * item.chosenQuantity).toFixed(2);



    return (
        <div className={`view ${styles.row} ${styles.flex}`}>
            <div className={`view ${styles.w48} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={item.title} styling={`${styles.input} ${styles.dark}`}></TextPDF>
            </div>
            <div className={`view ${styles.w17} ${styles.p48} ${styles.pb10}`}>
                {/* <TextPDF text={quantity} styling={`${styles.input} ${styles.dark} ${styles.right}`}></TextPDF> */}

                <select value={item.chosenQuantity} className={`${styles.select} ${styles.dark} ${styles.right}`}>
                    {[...Array(15)].map((x, i) =>
                        <option value={i + 1} onClick={(e) => handleQuantity(index, (i + 1))}>{i + 1}</option>
                    )}
                </select>

                {/* <MDBDropdown>
                    <MDBDropdownToggle color="" className="ms-2" > Añadir</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        {[...Array(15)].map((x, i) =>
                            <MDBDropdownItem link={true} key={i + 1} onClick={(e) => handleBook(e, card.id, "add", i + 1)}>{i + 1}</MDBDropdownItem>
                        )}
                    </MDBDropdownMenu>
                </MDBDropdown> */}

            </div>
            <div className={`view ${styles.w17} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={price + "€"} styling={`${styles.input} ${styles.dark} ${styles.right}`}></TextPDF>
            </div >
            <div className={`view ${styles.w18} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={total + "€"} styling={`${styles.span} ${styles.dark} ${styles.right}`}></TextPDF>
            </div>
            <button className={`${styles.link} ${styles.row__remove}`} aria-label="Remove Row" title="Remove Row"
                onClick={() => { handleDelete(index) }}>
                <span className={`${styles.icon} ${styles.iconRemove} ${styles.bgred}`}></span></button>
        </div>
    )

}

export default InvoiceItem