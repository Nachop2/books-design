import style from "./InvoicePDF.module.css"
const InvoicePDF = () => {
    return (

        <>
            <title>React Invoice Generator</title>

            <div id="root">
                <div className={style.app}>
                    <div className={`page ${style.invoiceWrapper}`} >
                        <div className={style.downloadPDF} title="Save PDF">
                            <a download="0000001.pdf" href="blob:https://tuanpham-dev.github.io/3aab8233-1285-4e4c-8544-adcb083a4a8a"></a>
                        </div>
                        <div className={`view ${style.flex}`}>
                            <div className={`view ${style.w50}`}>
                                <div className={`logo ${style.image}`}>
                                    <button type="button" className={style.image__upload}>Your Logo</button>
                                    <input tabIndex="-1" type="file" accept="image/*" className={style.image__file}></input>
                                </div>
                                <input type="text" className={`${style.fs20} ${style.bold} ${style.input}`} placeholder="Your Company" defaultValue="Cabildo de Fuerteventura"></input>
                                <input type="text" className={`${style.input}`} placeholder="Your Name"></input>
                                <input type="text" className={`${style.input}`} placeholder="Company's Address"></input>
                                <input type="text" className={`${style.input}`} placeholder="City, State Zip"></input>
                                <input readOnly="readOnly" type="text" className={`${style.input}`} placeholder="" value="United States"></input>
                            </div>
                            <div className={`view ${style.w50}`}>
                                <input type="text" className={`${style.input} ${style.fs45} ${style.right} ${style.bold}`} placeholder="Invoice" defaultValue="Factura"></input>
                            </div>
                        </div>

                        <div className={`view ${style.flex} ${style.mt40}`}>
                            <div className={`view ${style.w55}`}>
                                <input type="text" className={`${style.input} ${style.bold} ${style.dark} ${style.mb5}`} placeholder="" defaultValue="Factura para:"></input>
                                <input type="text" className={`${style.input}`} placeholder="Your Client's Name"></input>
                                <input type="text" className={`${style.input}`} placeholder="Client's Address"></input>
                                <input type="text" className={`${style.input}`} placeholder="City, State Zip"></input>
                                <input readOnly="readOnly" type="text" className={`${style.input}`} placeholder="" value="Spain"></input>
                            </div>
                            <div className={`view ${style.w45}`}>
                                <div className={`view flex mb-5`}>
                                    <div className={`view ${style.w40}`}>
                                        <input type="text" className={`${style.input} ${style.bold}`} placeholder="" defaultValue="Invoice#"></input>
                                    </div>
                                    <div className={`view ${style.w60}`}>
                                        <input type="text" className={`${style.input}`} placeholder="INV-12" defaultValue="0000001"></input>
                                    </div>
                                </div>
                                <div className={`view ${style.flex} ${style.mb5}`}>
                                    <div className={`view ${style.w40}`}>
                                        <input type="text" className={`${style.input} ${style.bold}`} placeholder="" defaultValue="Invoice Date"></input>
                                    </div>
                                    <div className={`view ${style.w60}`}>
                                        <div className="react-datepicker-wrapper">
                                            <div className="react-datepicker__input-container">
                                                <input type="text" className={`${style.input}`} defaultValue="Mar 13, 2024"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`view ${style.flex} ${style.mb5}`}>
                                    <div className={`view ${style.w40}`}>
                                        <input type="text" className={`${style.input} ${style.bold}`} placeholder="" defaultValue="Due Date"></input>
                                    </div>
                                    <div className={`view ${style.w60}`}>
                                        <div className="react-datepicker-wrapper">
                                            <div className="react-datepicker__input-container">
                                                <input type="text" className={`${style.input}`} defaultValue="Apr 12, 2024"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`view ${style.mt30} ${style.bgdark} ${style.flex}`}>
                            <div className={`view ${style.w48} ${style.p48}`}>
                                <input type="text" className={`${style.input} ${style.white} ${style.bold}`} placeholder="" defaultValue="Item Description"></input></div>
                            <div className={`view ${style.w17} ${style.p48}`}>
                                <input type="text" className={`${style.input} ${style.white} ${style.bold} ${style.right}`} placeholder="" defaultValue="Cantidad"></input></div>
                            <div className={`view ${style.w17} ${style.p48}`}>
                                <input type="text" className={`${style.input} ${style.white} ${style.bold} ${style.right}`} placeholder="" defaultValue="Precio Ud."></input></div>
                            <div className={`view ${style.w18} ${style.p48}`}>
                                <input type="text" className={`${style.input} ${style.white} ${style.bold} ${style.right}`} placeholder="" defaultValue="Total"></input></div>
                        </div>
                        <div className={`view ${style.row} ${style.flex}`}>
                            <div className={`view ${style.w48} ${style.p48} ${style.pb10}`}>
                                <textarea className={`${style.input} ${style.dark}`} placeholder="Enter item name/description" style={{ height: 48 + "px" }}></textarea>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className={`${style.input} ${style.dark} ${style.right}`} placeholder="" defaultValue="2"></input>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className={`${style.input} ${style.dark} ${style.right}`} placeholder="" defaultValue="100.00"></input>
                            </div>
                            <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}>
                                <span className={`${style.span} ${style.dark} ${style.right}`}>200.00</span>
                            </div>
                            <button className={`${style.link} ${style.row__remove}`} aria-label="Remove Row" title="Remove Row">
                                <span className={`${style.icon} ${style.iconRemove} ${style.bgred}`}></span></button>
                        </div>
                        <div className={`view ${style.row} ${style.flex}`}>
                            <div className={`view ${style.w48} ${style.p48} ${style.pb10}`}>
                                <textarea className={`${style.input} ${style.dark}`} placeholder="Enter item name/description" style={{ height: 48 + "px" }}></textarea>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className={`${style.input} ${style.dark} ${style.right}`} placeholder="" defaultValue="1"></input>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className={`${style.input} ${style.dark} ${style.right}`} placeholder="" defaultValue="10.00"></input>
                            </div>
                            <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}>
                                <span className={`${style.span} ${style.dark} ${style.right}`}>10.00</span>
                            </div>
                            <button className={`${style.link} ${style.row__remove}`} aria-label="Remove Row" title="Remove Row">
                                <span className={`${style.icon} ${style.iconRemove} ${style.bgred}`}></span >
                            </button >
                        </div >

                        <div className={`view ${style.flex}`}>
                            <div className={`view ${style.w50} ${style.mt10}`}>
                                <button className={`${style.link}`}>
                                    <span className={` ${style.icon} ${style.iconAdd} ${style.bggreen} ${style.mr10}`}></span>
                                    Add Line Item
                                </button>
                            </div>
                            <div className={`view ${style.w50} ${style.mt20}`}>
                                <div className={`view ${style.flex}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className={`${style.input}`} placeholder="" defaultValue="Total sin impuestos"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <span className={`${style.span} ${style.right} ${style.bold} ${style.dark}`}>210.00</span>
                                    </div>
                                </div>
                                <div className={`view ${style.flex}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className={`${style.input}`} placeholder="" defaultValue="Impuestos (21%)"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <span className={`${style.span} ${style.right} ${style.bold} ${style.dark}`}>44.10</span>
                                    </div>
                                </div>
                                <div className={`view ${style.flex} ${style.bggray} ${style.p5}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className={`${style.input} ${style.bold}`} placeholder="" defaultValue="TOTAL"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5} ${style.flex}`}>
                                        <input type="text" className={`${style.input} ${style.dark} ${style.bold} ${style.right} ${style.ml30}`} placeholder="" defaultValue="€"></input>
                                        <span className={`${style.span} ${style.right} ${style.bold} ${style.dark} ${style.wauto}`}>254.10</span>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className={`view ${style.mt20}`}>
                            <input type="text" className={`${style.input} ${style.bold} ${style.w100}`} placeholder="" defaultValue="Notas adicionales"></input>
                            <textarea className={`${style.input} ${style.w100}`} placeholder="" style={{ height: 48 + "px" }}></textarea>
                        </div>
                        <div className={`view ${style.mt20}`}>
                            <input type="text" className={`${style.input} ${style.bold} ${style.w100}`} placeholder="" defaultValue="Terminos y condiciones"></input>
                            <textarea className={`${style.input} ${style.w100}`} placeholder="" style={{ height: 48 + "px" }}></textarea>
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
