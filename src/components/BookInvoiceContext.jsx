import { createContext, useEffect, useState } from "react";

const BookInvoiceContext = createContext(null);

const BookInvoiceContextProvider = ({ children }) => {
    const [invoiceBooks, setInvoiceBooks] = useState([]);

    const fetchBook = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, {

            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setInvoiceBooks(data);
            })
            .catch(error => console.error("error", error));
    };

    const bookTest = async (id, reset=false) => {

        if(reset){
            setInvoiceBooks([]);
        }

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(book => {
                console.log(book);
                //setInvoiceBooks(data);


                const prepareCards = {
                    id: book.id,
                    title: book.name,
                    stock: book.stock,
                    chosenQuantity: 1,
                    donation: false,
                    text: book.description || "Sin descripción",
                    price: parseInt(book.sellingAt),
                    category_names: ["ISBN: " + book.isbn, "Autor: " + book.author],
                    //image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
                };

                let invoiceCopy = [...invoiceBooks];
                invoiceCopy.push(prepareCards)
                console.log(invoiceCopy);

                setInvoiceBooks(invoiceCopy);
            })
            .catch(error => console.error("error", error));
        console.log(invoiceBooks);
    }

    return (
        <BookInvoiceContext.Provider value={{ list: setInvoiceBooks, setInvoiceBooks, bookTest, invoiceBooks }}>
            {children}
        </BookInvoiceContext.Provider>
    );
}

export { BookInvoiceContext, BookInvoiceContextProvider };