import { json, useParams } from "react-router-dom";
import CardPaginationComponent from "./utils/CardPaginationComponent";
import { useEffect, useState } from "react";

const Category = () => {
    const { categoryName, pageNumber } = useParams(); // Parámetros de cada categoría
    const [categoryPaginationData, setCategoryPaginationData] = useState([]);
    // const [categoryCards, setCategoryCards] = useState([]);

    useEffect(() => {
        const fetchCategoryPaginationData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/public-tests?page=${pageNumber}`, {
                    
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const paginationData = await response.json();
                // Modificar los datos de paginación para que se adapten a la vista:
                const correspondingCategoryCards = paginationData.data
                    .filter(categoryCard => categoryCard.category_names.includes(categoryName))
                    .map(quiz => ({
                        id: quiz.id,
                        title: quiz.name,
                        text: quiz.description || "Sin descripción",
                        category_names: quiz.category_names,
                        image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
                    }));

                const formattedPaginationData = {...paginationData, data: correspondingCategoryCards};
                setCategoryPaginationData(formattedPaginationData);
            }
            catch (error) {
                console.error('Error fetching category cards: ', error);
            }
        };

        fetchCategoryPaginationData();
    }, [pageNumber]);

    return (
        <div className="mt-5">
            <CardPaginationComponent
                pageName="category"
                pageNumber={Number(pageNumber)}
                pageTotal={categoryPaginationData.last_page || 1}
                title={categoryName}
                titleIcon="question-circle"
                cards={categoryPaginationData.data || null}
                cardsPerPage={categoryPaginationData.per_page || 0}
                cardsPerRow={3}
            />
        </div>
    );
}

export default Category;