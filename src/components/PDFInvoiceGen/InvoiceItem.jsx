import { useState } from "react";

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

const InvoiceItem = ({ styles, item, handleQuantity, handleDelete, handleDonation, index, view = false }) => {

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
                    <p className={`pdfPad d-inline-block pdfFont text-black`}>{item.title}</p>

                </MDBCol>
                <MDBCol className="px-2 col-2">
                    {!view ? (
                        <div className="ps-1 pe-3">
                            <select defaultValue={item.chosenQuantity} className={`${styles.select} text-black text-end `}>
                                {[...Array(item.stock)].map((x, i) =>
                                    <option value={i + 1} onClick={(e) => handleQuantity(index, (i + 1), e)} >{i + 1}</option>
                                )}
                            </select>
                        </div>

                    ) : (
                        <p className="w-100 pdfPad d-inline-block pdfFont fw-bold text-black text-center">{item.chosenQuantity}</p>
                    )}


                </MDBCol>
                <MDBCol className="text-center px-2 col-2">
                    {!view ? (
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' aria-label='...' onClick={() => { handleDonation(index) }}></MDBCheckbox>

                    ) : (
                        <MDBCheckbox
                            id='controlledCheckbox'
                            checked={item.donation}
                            disabled
                        />
                    )}
                </MDBCol>
                <MDBCol className="col-2 px-2 col-2">
                    <p className={`w-100 pdfPad d-inline-block pdfFont text-black text-center`}>{price + "€"}</p>

                </MDBCol>
                <MDBCol className="px-2 col-1 col-2">
                    <p className={`w-100 pdfPad d-inline-block pdfFont text-black text-end fw-bold`}>{total + "€"}</p>
                </MDBCol>
                {!view ? (
                    <div style={{ height: "0px", width: "0px" }} className="xVoid ">
                    <MDBIcon fas icon="times-circle" className="text-danger xButtonCSSInvoice py-3 pe-2" size="lg"
                        onClick={(e) => handleDelete(index)}
                    />
                </div>
                ):(
                    <>
                    </>
                )}
                
            </MDBRow>
        </>

    )

}

export default InvoiceItem