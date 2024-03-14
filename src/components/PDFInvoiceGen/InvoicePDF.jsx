import style from "./InvoicePDF.module.css"
const InvoicePDF = () => {
    return (

        <>
            <title>React Invoice Generator</title>

            <div id="root">
                <div className={style.app}>
                    <h1 className={`${style.center} ${style.fs30}`}>React Invoice Generator</h1>
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
                                        <input type="text" className="input bold" placeholder="" defaultValue="Invoice#"></input>
                                    </div>
                                    <div className={`view ${style.w60}`}>
                                        <input type="text" className={`${style.input}`} placeholder="INV-12" defaultValue="0000001"></input>
                                    </div>
                                </div>
                                <div className={`view ${style.flex} ${style.mb5}`}>
                                    <div className={`view ${style.w40}`}>
                                        <input type="text" className="input bold" placeholder="" defaultValue="Invoice Date"></input>
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
                                        <input type="text" className="input bold" placeholder="" defaultValue="Due Date"></input>
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
                                <input type="text" className="input white bold" placeholder="" defaultValue="Item Description"></input></div>
                            <div className={`view ${style.w17} ${style.p48}`}>
                                <input type="text" className="input white bold right" placeholder="" defaultValue="Cantidad"></input></div>
                            <div className={`view ${style.w17} ${style.p48}`}>
                                <input type="text" className="input white bold right" placeholder="" defaultValue="Precio Ud."></input></div>
                            <div className={`view ${style.w18} ${style.p48}`}>
                                <input type="text" className="input white bold right" placeholder="" defaultValue="Total"></input></div>
                        </div>
                        <div className={`view ${style.row} ${style.flex}`}>
                            <div className={`view w-48 ${style.p48} ${style.pb10}`}>
                                <textarea className="input dark" placeholder="Enter item name/description" style={{ height: 48 + "px" }}></textarea>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className="input dark right" placeholder="" defaultValue="2"></input>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className="input dark right" placeholder="" defaultValue="100.00"></input>
                            </div>
                            <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}>
                                <span className="span dark right">200.00</span>
                            </div>
                            <button className="link row__remove" aria-label="Remove Row" title="Remove Row">
                                <span className="icon icon-remove bg-red"></span></button>
                        </div>
                        <div className={`view ${style.row} ${style.flex}`}>
                            <div className={`view w-48 ${style.p48} ${style.pb10}`}>
                                <textarea className="input dark" placeholder="Enter item name/description" style={{ height: 48 + "px" }}></textarea>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className="input dark right" placeholder="" defaultValue="1"></input>
                            </div>
                            <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}>
                                <input type="text" className="input dark right" placeholder="" defaultValue="10.00"></input>
                            </div>
                            <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}>
                                <span className="span dark right">10.00</span>
                            </div>
                            <button className="link row__remove" aria-label="Remove Row" title="Remove Row">
                                <span className="icon icon-remove bg-red"></span >
                            </button >
                        </div >

                        <div className={`view ${style.flex}`}>
                            <div className={`view ${style.w50} ${style.mt10}`}>
                                <button className="link">
                                    <span className="icon icon-add bg-green mr-10"></span>
                                    Add Line Item
                                </button>
                            </div>
                            <div className={`view ${style.w50} ${style.mt20}`}>
                                <div className={`view ${style.flex}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className={`${style.input}`} placeholder="" defaultValue="Total sin impuestos"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <span className="span right bold dark">210.00</span>
                                    </div>
                                </div>
                                <div className={`view ${style.flex}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className={`${style.input}`} placeholder="" defaultValue="Impuestos (21%)"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <span className="span right bold dark">44.10</span>
                                    </div>
                                </div>
                                <div className={`view ${style.flex} ${style.bggray} ${style.p5}`}>
                                    <div className={`view ${style.w50} ${style.p5}`}>
                                        <input type="text" className="input bold" placeholder="" defaultValue="TOTAL"></input>
                                    </div>
                                    <div className={`view ${style.w50} ${style.p5} ${style.flex}`}>
                                        <input type="text" className="input dark bold right ml-30" placeholder="" defaultValue="€"></input>
                                        <span className="span right bold dark w-auto">254.10</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`view ${style.mt20}`}>
                                <input type="text" className="input bold w-100" placeholder="" defaultValue="Notas adicionales"></input>
                                <textarea className="input w-100" placeholder="" style={{ height: 48 + "px" }}></textarea>
                            </div>
                            <div className={`view ${style.mt20}`}>
                                <input type="text" className="input bold w-100" placeholder="" defaultValue="Terminos y condiciones"></input>
                                <textarea className="input w-100" placeholder="" style={{ height: 48 + "px" }}></textarea>
                            </div>
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

    {/* <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <link rel="icon" href="https://tuanpham-dev.github.io/react-invoice-generator/favicon.ico">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#000000">
    <meta name="description" content="React Invoice Generator allows you quickly make invoices and save them as PDF">
    <link rel="apple-touch-icon" href="https://tuanpham-dev.github.io/react-invoice-generator/logo192.png">
    <link rel="manifest" href="https://tuanpham-dev.github.io/react-invoice-generator/manifest.json">
    <link rel="stylesheet" href="React%20Invoice%20Generator_files/css.css">
    <title>React Invoice Generator</title>
    <link href="React%20Invoice%20Generator_files/2.0d77bc6e.chunk.css" rel="stylesheet">
    <link href="React%20Invoice%20Generator_files/main.1a8caee2.chunk.css" rel="stylesheet">
</head> */}
    //     <div id="root">
    //         <div className="app">
    //             <h1 className="center fs-30">React Invoice Generator</h1>
    //             <div className="page invoice-wrapper">
    //                 <div className="download-pdf " title="Save PDF"><a download="0000001.pdf"
    //                         href="blob:https://tuanpham-dev.github.io/3aab8233-1285-4e4c-8544-adcb083a4a8a"></a></div>
    //                 <div className={`view ${style.flex}`}>
    //                     <div className={`view w-50">
    //                         <div className="image  logo"><button type="button" className="image__upload">Your Logo</button><input
    //                                 tabIndex="-1" type="file" accept="image/*" className="image__file"></div><input type="text"
    //                             className="input fs-20 bold" placeholder="Your Company" value="Cabildo de Fuerteventura"><input
    //                             type="text" className={`${style.input}`} placeholder="Your Name"><input type="text" className={`${style.input}`}
    //                             placeholder="Company's Address"><input type="text" className={`${style.input}`}
    //                             placeholder="City, State Zip"><input readOnly="readOnly" type="text" className={`${style.input}`}
    //                             placeholder="" value="United States">
    //                     </div>
    //                     <div className={`view w-50"><input type="text" className="input fs-45 right bold" placeholder="Invoice"
    //                             value="Factura"></div>
    //                 </div>
    //                 <div className={`view flex mt-40">
    //                     <div className={`view w-55"><input type="text" className="input bold dark mb-5" placeholder=""
    //                             value="Factura para:"><input type="text" className={`${style.input}`}
    //                             placeholder="Your Client's Name"><input type="text" className={`${style.input}`}
    //                             placeholder="Client's Address"><input type="text" className={`${style.input}`}
    //                             placeholder="City, State Zip"><input readOnly="readOnly" type="text" className={`${style.input}`}
    //                             placeholder="" value="Spain"></div>
    //                     <div className={`view w-45">
    //                         <div className={`view ${style.flex} ${style.mb5}`}>
    //                             <div className={`view ${style.w40}`}><input type="text" className="input bold" placeholder=""
    //                                     value="Invoice#"></div>
    //                             <div className={`view ${style.w60}`}><input type="text" className={`${style.input}`} placeholder="INV-12"
    //                                     value="0000001"></div>
    //                         </div>
    //                         <div className={`view ${style.flex} ${style.mb5}`}>
    //                             <div className={`view ${style.w40}`}><input type="text" className="input bold" placeholder=""
    //                                     value="Invoice Date"></div>
    //                             <div className={`view ${style.w60}`}>
    //                                 <div className="react-datepicker-wrapper">
    //                                     <div className="react-datepicker__input-container"><input type="text" className={`${style.input}`}
    //                                             value="Mar 13, 2024"></div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className={`view ${style.flex} ${style.mb5}`}>
    //                             <div className={`view ${style.w40}`}><input type="text" className="input bold" placeholder=""
    //                                     value="Due Date"></div>
    //                             <div className={`view ${style.w60}`}>
    //                                 <div className="react-datepicker-wrapper">
    //                                     <div className="react-datepicker__input-container"><input type="text" className={`${style.input}`}
    //                                             value="Apr 12, 2024"></div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className={`view mt-30 bg-dark flex">
    //                     <div className={`view w-48 ${style.p48}"><input type="text" className="input white bold" placeholder=""
    //                             value="Item Description"></div>
    //                     <div className={`view ${style.w17} ${style.p48}"><input type="text" className="input white bold right" placeholder=""
    //                             value="Cantidad"></div>
    //                     <div className={`view ${style.w17} ${style.p48}"><input type="text" className="input white bold right" placeholder=""
    //                             value="Precio Ud."></div>
    //                     <div className={`view ${style.w18} ${style.p48}"><input type="text" className="input white bold right" placeholder=""
    //                             value="Total"></div>
    //                 </div>
    //                 <div className={`view ${style.row} ${style.flex}`}>
    //                     <div className={`view w-48 ${style.p48} ${style.pb10}`}><textarea className="input dark"
    //                             placeholder="Enter item name/description" style="height: 48px !important;"></textarea></div>
    //                     <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}><input type="text" className="input dark right" placeholder=""
    //                             value="2"></div>
    //                     <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}><input type="text" className="input dark right" placeholder=""
    //                             value="100.00"></div>
    //                     <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}><span className="span dark right">200.00</span></div><button
    //                         className="link row__remove" aria-label="Remove Row" title="Remove Row"><span
    //                             className="icon icon-remove bg-red"></span></button>
    //                 </div>
    //                 <div className={`view ${style.row} ${style.flex}`}>
    //                     <div className={`view w-48 ${style.p48} ${style.pb10}`}><textarea className="input dark"
    //                             placeholder="Enter item name/description" style="height: 48px !important;"></textarea></div>
    //                     <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}><input type="text" className="input dark right" placeholder=""
    //                             value="1"></div>
    //                     <div className={`view ${style.w17} ${style.p48} ${style.pb10}`}><input type="text" className="input dark right" placeholder=""
    //                             value="10.00"></div>
    //                     <div className={`view ${style.w18} ${style.p48} ${style.pb10}`}><span className="span dark right">10.00</span></div><button
    //                         className="link row__remove" aria-label="Remove Row" title="Remove Row"><span
    //                             className="icon icon-remove bg-red"></span ></button >
    //                 </div >
    //                 <div className={`view ${style.flex}`}>
    //                     <div className={`view w-50 mt-10"><button className="link"><span
    //                                 className="icon icon-add bg-green mr-10"></span>Add Line Item</button></div>
    //                     <div className={`view w-50 mt-20">
    //                         <div className={`view ${style.flex}`}>
    //                             <div className={`view ${style.w50} ${style.p5}`}><input type="text" className={`${style.input}`} placeholder=""
    //                                     value="Total sin impuestos"></div>
    //                             <div className={`view ${style.w50} ${style.p5}`}><span className="span right bold dark">210.00</span></div>
    //                         </div>
    //                         <div className={`view ${style.flex}`}>
    //                             <div className={`view ${style.w50} ${style.p5}`}><input type="text" className={`${style.input}`} placeholder=""
    //                                     value="Impuestos (21%)"></div>
    //                             <div className={`view ${style.w50} ${style.p5}`}><span className="span right bold dark">44.10</span></div>
    //                         </div>
    //                         <div className={`view flex bg-gray p-5">
    //                             <div className={`view ${style.w50} ${style.p5}`}><input type="text" className="input bold" placeholder=""
    //                                     value="TOTAL"></div>
    //                             <div className={`view w-50 p-5 flex"><input type="text" className="input dark bold right ml-30"
    //                                     placeholder="" value="€"><span className="span right bold dark w-auto">254.10</span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className={`view ${style.mt20}`}><input type="text" className="input bold w-100" placeholder=""
    //                         value="Notas adicionales"><textarea className="input w-100" placeholder=""
    //                         style="height: 48px !important;"></textarea></div>
    //                 <div className={`view ${style.mt20}`}><input type="text" className="input bold w-100" placeholder=""
    //                         value="Terminos y condiciones"><textarea className="input w-100" placeholder=""
    //                         style="height: 48px !important;"></textarea></div>
    //             </div>
    //         </div>
    //     </div>
    //     <script>!function (e) { function r(r) { for (var n, i, a = r[0], l = r[1], c = r[2], p = 0, s = []; p < a.length; p++)i = a[p], Object.prototype.hasOwnProperty.call(o, i) && o[i] && s.push(o[i][0]), o[i] = 0; for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]); for (f && f(r); s.length;)s.shift()(); return u.push.apply(u, c || []), t() } function t() { for (var e, r = 0; r < u.length; r++) { for (var t = u[r], n = !0, a = 1; a < t.length; a++) { var l = t[a]; 0 !== o[l] && (n = !1) } n && (u.splice(r--, 1), e = i(i.s = t[0])) } return e } var n = {}, o = { 1: 0 }, u = []; function i(r) { if (n[r]) return n[r].exports; var t = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(t.exports, t, t.exports, i), t.l = !0, t.exports } i.m = e, i.c = n, i.d = function (e, r, t) { i.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, i.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, i.t = function (e, r) { if (1 & r && (e = i(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (i.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var n in e) i.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, i.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return i.d(r, "a", r), r }, i.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, i.p = "/react-invoice-generator/"; var a = this["webpackJsonpinvoice-generator"] = this["webpackJsonpinvoice-generator"] || [], l = a.push.bind(a); a.push = r, a = a.slice(); for (var c = 0; c < a.length; c++)r(a[c]); var f = l; t() }([])</script>
    //     <script src="React%20Invoice%20Generator_files/2.c4d5f900.chunk.js"></script>
    //     <script src="React%20Invoice%20Generator_files/main.34d1fa92.chunk.js"></script><textarea tabIndex="-1"
    //         aria-hidden="true"
    //         style="min-height: 0px !important; max-height: none !important; height: 0px !important; visibility: hidden !important; overflow: hidden !important; position: absolute !important; z-index: -1000 !important; top: 0px !important; right: 0px !important; border-width: 1px; box-sizing: border-box; font-family: Nunito, sans-serif; font-size: 14px; font-style: normal; font-weight: 400; letter-spacing: normal; line-height: normal; padding: 4px 12px 4px 0px; tab-size: 8; text-indent: 0px; text-rendering: optimizelegibility; text-transform: none; width: 630px; word-break: normal;">x</textarea>
    // </body>
}
export default InvoicePDF;
