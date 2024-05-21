import { createContext, useEffect, useState } from "react";

const BookInvoiceContext = createContext({ invoiceBooks: [], setInvoiceBooks: () => { }, loading: false });

const BookInvoiceContextProvider = ({ children }) => {
    const [invoiceBooks, setInvoiceBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState([]);
    let loading = false;


    const paginationBook = async (paginationLink) => {
        try {
            const response = await fetch(paginationLink, {
                method: 'GET',
                //credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const newData = await response.json();
            setPagination([newData.current_page,newData.next_page_url,newData.last_page,newData.last_page_url,newData.first_page_url])
            // newData.data.forEach(book => {
            //     let re = new RegExp(String.raw`(?:${term})`, "gi");
            //     book.name = book.name.replace(re, `<strong style="color:blue">$&</strong>`)
            // });
            setBooks(newData.data)
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchBooksSearch = async (event, term) => {
        event.preventDefault();
        console.log(term);
        if (term == "") {
            fetchBooks();
            return true;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books/search?search=` + term , {
                method: 'GET',
                //credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const newData = await response.json();
            console.log(newData);
            setPagination([newData.current_page,newData.next_page_url,newData.last_page,newData.last_page_url,newData.first_page_url])

            newData.data.forEach(book => {
                let re = new RegExp(String.raw`(?:${term})`, "gi");
                book.name = book.name.replace(re, `<strong style="color:blue">$&</strong>`)
            });
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
            setPagination([newData.current_page,newData.next_page_url,newData.last_page,newData.last_page_url,newData.first_page_url])

            setBooks(newData.data)
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
        <BookInvoiceContext.Provider value={{ setInvoiceBooks, bookTest, invoiceBooks, loading, fetchBooksSearch, fetchBooks, paginationBook, pagination, books }}>
            {children}
        </BookInvoiceContext.Provider>
    );
}

export { BookInvoiceContext, BookInvoiceContextProvider };