const TextPDF = ({ text, styling }) => {
    console.log(text);
    console.log(styling);
    return (
        <p className={styling} style={{background:"transparent"}}>{text}</p>
    )
}

export default TextPDF;