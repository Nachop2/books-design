import { createContext, useEffect, useState } from "react";

const BookInvoiceContext = createContext();

const BookInvoiceContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // Conseguir los datos de las categorías existentes:
    useEffect(() => {
        const fetchCategories = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, {
                
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCategories(data);
                })
                .catch(error => console.error("error", error));
        };

        fetchCategories();
    }, []);

    return (
        <BookInvoiceContext.Provider value={{ categories, setCategories }}>
            {children}
        </BookInvoiceContext.Provider>
    );
}

export { BookInvoiceContext, BookInvoiceContextProvider};