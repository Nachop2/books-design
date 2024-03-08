import {
    MDBBadge, MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const PlayedQuizzes = () => {
    const navigate = useNavigate();
    // NOTA: Sustituir "playedQuizzes" después con datos de los tests jugados por un usuario desde la BD
    // const playedQuizzes = [
    //     { category: 'Category #1', name: 'Quiz #1', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/fluid/city/113.webp' },
    //     { category: 'Category #2', name: 'Quiz #2', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/fluid/city/114.webp' },
    //     { category: 'Category #3', name: 'Quiz #3', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/fluid/city/115.webp' }
    // ];

    const [playedQuizzes, setPlayedQuizzes] = useState(
        []
    )

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/test-history`, {
                    
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user tests');
                }

                const testHistory = await response.json();
                console.log(testHistory);
                let userTestData = testHistory.map(test => ({
                    name: test.name,
                    author: test.author,
                    id: test.id,
                    category_names: test.category_names,
                    grade: test.score,
                    image_src: 'https://mdbootstrap.com/img/new/fluid/city/116.webp', // NOTA: Sustituir después por imagen relacionada desde la BD
                }));

                setPlayedQuizzes(userTestData);
            }
            catch (error) {
                console.error('Error fetching user tests:', error);
            }
        }

        fetchHistory();
    }, []);

    const onPlay = async (id) => {
        // console.log("aa"+id);
        // navigate("/create-quiz?id="+id)
        navigate(`/quiz/play/${id}`);
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="play" /> Cuestionarios jugados
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {playedQuizzes.map((quiz, index) => (
                            <MDBListGroupItem key={index}>
                                {quiz.category_names.map(name => (
                                    <MDBBadge pill light color='primary' className="mb-3 me-1">
                                        {name}
                                    </MDBBadge>
                                ))}

                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={quiz.image_src}
                                            alt='Quiz image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{quiz.name}</p>
                                            <p className='text-muted mb-0'>Creado por <a href="#">{quiz.author}</a></p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ms-5">
                                        <MDBBtn size='sm' rounded color='link' onClick={() => onPlay(quiz.id)}>
                                            Volver a jugar
                                        </MDBBtn>
                                    </div>
                                </div>

                                <div>
                                    <MDBTypography color="info" tag="h6">Nota obtenida: {quiz.grade ?? 0}</MDBTypography>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default PlayedQuizzes;