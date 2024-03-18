import TextPDF from "./TextPDF"
const InvoiceItem = ({ quantity, price, item, styles}) => {

    price = price.toFixed(2);
    let total = (price * quantity).toFixed(2);

    return (
        <div className={`view ${styles.row} ${styles.flex}`}>
            <div className={`view ${styles.w48} ${styles.p48} ${styles.pb10}`}>
                <textarea className={`${styles.input} ${styles.dark}`} placeholder="Enter item name/description" style={{ height: 48 + "px" }}></textarea>
            </div>
            <div className={`view ${styles.w17} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={quantity} styling={`${styles.input} ${styles.dark} ${styles.right}`}></TextPDF>
            </div>
            <div className={`view ${styles.w17} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={price + "€"} styling={`${styles.input} ${styles.dark} ${styles.right}`}></TextPDF>
            </div>
            <div className={`view ${styles.w18} ${styles.p48} ${styles.pb10}`}>
                <TextPDF text={total + "€"} styling={`${styles.span} ${styles.dark} ${styles.right}`}></TextPDF>
            </div>
            <button className={`${styles.link} ${styles.row__remove}`} aria-label="Remove Row" title="Remove Row">
                <span className={`${styles.icon} ${styles.iconRemove} ${styles.bgred}`}></span></button>
        </div>
    )

}

export default InvoiceItem