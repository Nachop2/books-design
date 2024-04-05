import { createContext, useEffect, useState } from "react";

const BookInvoiceContext = createContext({ invoiceBooks: [], setInvoiceBooks: () => { }, loading: false });

const BookInvoiceContextProvider = ({ children }) => {
    const [invoiceBooks, setInvoiceBooks] = useState([]);
    const [books, setBooks] = useState([]);
    let loading = false;
    
    const fetchBooksSearch = async (event, term) => {
        event.preventDefault();
        console.log(term);
        if(term == ""){
            fetchBooks();
            return true;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books/search?search=`+term, {
                method: 'GET',
                //credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const newData = await response.json();
            console.log(newData);

            setBooks(newData.data)
        }
        catch (error) {
            console.error(error);
        }
    };


    const fetchBooks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books`, {
                method: 'GET',
                //credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const newData = await response.json();
            console.log(newData);

            setBooks(newData)
        }
        catch (error) {
            console.error(error);
        }
    };



    const bookTest = async (id, reset = false) => {

        if (reset) {
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
        <BookInvoiceContext.Provider value={{ setInvoiceBooks, bookTest, invoiceBooks, loading, fetchBooksSearch, fetchBooks, books }}>
            {children}
        </BookInvoiceContext.Provider>
    );
}

export { BookInvoiceContext, BookInvoiceContextProvider };