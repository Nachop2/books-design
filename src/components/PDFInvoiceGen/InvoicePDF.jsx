import styles from "./InvoicePDF.module.css"
import TextPDF from "./TextPDF"
import cabildo from "./logo-cabildo-i2.webp"
import InvoiceItem from "./InvoiceItem"
import { useState } from "react"
const InvoicePDF = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            chosenQuantity: 1,
            price: 10
        },
        {
            id: 4,
            chosenQuantity: 4,
            price: 20
        },
        {
            id: 1,
            chosenQuantity: 2,
            price: 100
        }
    ]);


    const handleQuantity = (index, quantity) => {
        let itemCopy = [...items];
        itemCopy[index].chosenQuantity = quantity
        setItems(itemCopy);
    }

    let totalNoTax = 0;
    items.forEach(element => {
        totalNoTax += element.price * element.chosenQuantity
    });
    let taxes = totalNoTax * 0.21
    let total = taxes + totalNoTax
    totalNoTax = totalNoTax.toFixed(2) + "€";
    taxes = taxes.toFixed(2) + "€";
    total = total.toFixed(2) + "€";


    return (
        <>
            <title>React Invoice Generator</title>

            <div id="root">
                <div className={styles.app}>
                    <div className={`page ${styles.invoiceWrapper}`} >
                        <div className={styles.downloadPDF} title="Save PDF">
                            <a download="0000001.pdf" href=""></a>
                        </div>
                        <div className={`view ${styles.flex}`}>
                            <div className={`view ${styles.w50}`}>
                                <div className={`logo ${styles.image} ${styles.mb5}`}>
                                    <img className={`${styles.image__img}`} src={cabildo} alt="logo" style={{ maxWidth: 100 + "px" }}></img>
                                </div>
                                <TextPDF text="Cabildo de Fuerteventura" styling={`${styles.fs20} ${styles.bold} ${styles.input}`}></TextPDF>
                                <TextPDF text="Uweeeeeeeeeu" styling={styles.input}></TextPDF>
                                <input type="text" className={`${styles.input}`} placeholder="Your Name"></input>
                                <input type="text" className={`${styles.input}`} placeholder="Company's Address"></input>
                                <input type="text" className={`${styles.input}`} placeholder="City, State Zip"></input>
                                <input readOnly="readOnly" type="text" className={`${styles.input}`} placeholder="" value="United States"></input>
                            </div>
                            <div className={`view ${styles.w50}`}>
                                <TextPDF text="Factura" styling={`${styles.input} ${styles.fs45} ${styles.right} ${styles.bold}`}></TextPDF>

                            </div>
                        </div>

                        <div className={`view ${styles.flex} ${styles.mt40}`}>
                            <div className={`view ${styles.w55}`}>
                                <TextPDF text="Factura para:" styling={`${styles.input} ${styles.bold} ${styles.dark} ${styles.mb5}`}></TextPDF>
                                <input type="text" className={`${styles.input}`} placeholder="Your Client's Name"></input>
                                <input type="text" className={`${styles.input}`} placeholder="Client's Address"></input>
                                <input type="text" className={`${styles.input}`} placeholder="City, State Zip"></input>
                                <input readOnly="readOnly" type="text" className={`${styles.input}`} placeholder="" value="Spain"></input>
                            </div>
                            <div className={`view ${styles.w45}`}>
                                <div className={`view flex mb-5`}>
                                    <div className={`view ${styles.w40}`}>
                                        <TextPDF text="Invoice#" styling={`${styles.input}  ${styles.bold}`}></TextPDF>
                                    </div>
                                    <div className={`view ${styles.w60}`}>
                                        <TextPDF text="0000001" styling={styles.input}></TextPDF>
                                    </div>
                                </div>
                                <div className={`view ${styles.flex} ${styles.mb5}`}>
                                    <div className={`view ${styles.w40}`}>
                                        <TextPDF text="Invoice Date" styling={`${styles.input} ${styles.bold}`}></TextPDF>
                                    </div>
                                    <div className={`view ${styles.w60}`}>
                                        <div className="react-datepicker-wrapper">
                                            <div className="react-datepicker__input-container">
                                                <input type="text" className={`${styles.input}`} defaultValue="Mar 13, 2024"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`view ${styles.flex} ${styles.mb5}`}>
                                    <div className={`view ${styles.w40}`}>
                                        <TextPDF text="Due Date" styling={`${styles.input} ${styles.bold}`}></TextPDF>
                                    </div>
                                    <div className={`view ${styles.w60}`}>
                                        <div className="react-datepicker-wrapper">
                                            <div className="react-datepicker__input-container">
                                                <input type="text" className={`${styles.input}`} defaultValue="Apr 12, 2024"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`view ${styles.mt30} ${styles.bgdark} ${styles.flex}`}>
                            <div className={`view ${styles.w48} ${styles.p48}`}>
                                <TextPDF text="Libros" styling={`${styles.input} ${styles.white} ${styles.bold}`}></TextPDF>
                            </div>
                            <div className={`view ${styles.w17} ${styles.p48}`}>
                                <TextPDF text="Cantidad" styling={`${styles.input} ${styles.white} ${styles.bold} ${styles.right}`}></TextPDF>
                            </div>
                            <div className={`view ${styles.w17} ${styles.p48}`}>
                                <TextPDF text="Precio Ud." styling={`${styles.input} ${styles.white} ${styles.bold} ${styles.right}`}></TextPDF>
                            </div>
                            <div className={`view ${styles.w18} ${styles.p48}`}>
                                <TextPDF text="Total" styling={`${styles.input} ${styles.white} ${styles.bold} ${styles.right}`}></TextPDF>
                            </div>
                        </div>


                        {
                            items.map((e, index) => {
                                return <InvoiceItem styles={styles} item={e} handleQuantity={handleQuantity} index={index}></InvoiceItem>
                            })
                        }



                        <div className={`view ${styles.flex}`}>
                            <div className={`view ${styles.w50} ${styles.mt10}`}>
                                <button className={`${styles.link}`}>
                                    <span className={` ${styles.icon} ${styles.iconAdd} ${styles.bggreen} ${styles.mr10}`}></span>
                                    Add Line Item
                                </button>
                            </div>
                            <div className={`view ${styles.w50} ${styles.mt20}`}>
                                <div className={`view ${styles.flex}`}>
                                    <div className={`view ${styles.w50} ${styles.p5}`}>
                                        <TextPDF text="Total sin impuestos" styling={`${styles.input}`}></TextPDF>
                                    </div>
                                    <div className={`view ${styles.w50} ${styles.p5}`}>
                                        <span className={`${styles.span} ${styles.right} ${styles.bold} ${styles.dark}`}>{totalNoTax}</span>
                                    </div>
                                </div>
                                <div className={`view ${styles.flex}`}>
                                    <div className={`view ${styles.w50} ${styles.p5}`}>
                                        <TextPDF text="Impuestos (21%)" styling={`${styles.input}`}></TextPDF>
                                    </div>
                                    <div className={`view ${styles.w50} ${styles.p5}`}>
                                        <span className={`${styles.span} ${styles.right} ${styles.bold} ${styles.dark}`}>{taxes}</span>
                                    </div>
                                </div>
                                <div className={`view ${styles.flex} ${styles.bggray} ${styles.p5}`}>
                                    <div className={`view ${styles.w50} ${styles.p5}`}>
                                        <TextPDF text="TOTAL" styling={`${styles.span} ${styles.right} ${styles.bold} ${styles.wauto} `}></TextPDF>

                                    </div>
                                    <div className={`view ${styles.w50} ${styles.p5} ${styles.flex}`}>
                                        <TextPDF text="" styling={`${styles.input} ${styles.dark} ${styles.bold} ${styles.right} ${styles.ml30}`}></TextPDF>

                                        <span className={`${styles.span} ${styles.right} ${styles.bold} ${styles.dark} ${styles.wauto}`}>{total}</span>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className={`view ${styles.mt20}`}>
                            <input type="text" className={`${styles.input} ${styles.bold} ${styles.w100}`} placeholder="" defaultValue="Notas adicionales"></input>
                            <textarea className={`${styles.input} ${styles.w100}`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                        </div>
                        <div className={`view ${styles.mt20}`}>
                            <input type="text" className={`${styles.input} ${styles.bold} ${styles.w100}`} placeholder="" defaultValue="Terminos y condiciones"></input>
                            <textarea className={`${styles.input} ${styles.w100}`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                        </div>
                    </div >
                </div >

            </div >
            {/* <script>!function (e) {function r(r) { for (var n, i, a = r[0], l = r[1], c = r[2], p = 0, s = []; p < a.length; p++)i = a[p], Object.prototype.hasOwnProperty.call(o, i) && o[i] && s.push(o[i][0]), o[i] = 0; for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]); for (f && f(r); s.length;)s.shift()(); return u.push.apply(u, c || []), t() } function t() { for (var e, r = 0; r < u.length; r++) { for (var t = u[r], n = !0, a = 1; a < t.length; a++) { var l = t[a]; 0 !== o[l] && (n = !1) } n && (u.splice(r--, 1), e = i(i.s = t[0])) } return e } var n = { }, o = {1: 0 }, u = []; function i(r) { if (n[r]) return n[r].exports; var t = n[r] = {i: r, l: !1, exports: { } }; return e[r].call(t.exports, t, t.exports, i), t.l = !0, t.exports } i.m = e, i.c = n, i.d = function (e, r, t) {i.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t })}, i.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 })}, i.t = function (e, r) { if (1 & r && (e = i(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (i.r(t), Object.defineProperty(t, "default", {enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var n in e) i.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, i.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return i.d(r, "a", r), r }, i.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, i.p = "/react-invoice-generator/"; var a = this["webpackJsonpinvoice-generator"] = this["webpackJsonpinvoice-generator"] || [], l = a.push.bind(a); a.push = r, a = a.slice(); for (var c = 0; c < a.length; c++)r(a[c]); var f = l; t() }([])</script> */}
            <script src="React%20Invoice%20Generator_files/2.c4d5f900.chunk.js"></script>
            <script src="React%20Invoice%20Generator_files/main.34d1fa92.chunk.js"></script>
            {/* <textarea tabIndex="-1" aria-hidden="true" 
            style={{minHeight: "0px", maxHeight: "none", height: "0px"}}
            style="min-height: 0px !important; max-height: none !important; height: 0px !important; visibility: hidden !important; overflow: hidden !important; position: absolute !important; z-index: -1000 !important; top: 0px !important; right: 0px !important; border-width: 1px; box-sizing: border-box; font-family: Nunito, sans-serif; font-size: 14px; font-style: normal; font-weight: 400; letter-spacing: normal; line-height: normal; padding: 4px 12px 4px 0px; tab-size: 8; text-indent: 0px; text-rendering: optimizelegibility; text-transform: none; width: 630px; word-break: normal" defaultValue={"x"}></textarea > */}
        </>
    )
}
export default InvoicePDF;
