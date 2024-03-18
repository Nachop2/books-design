const TextPDF = ({ text, styling }) => {

    return (
        <p className={styling} style={{background:"transparent",fontFamily:"sans-serif;"}}>{text}</p>
    );
}

export default TextPDF;