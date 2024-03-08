import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const QuizManagement = () => {
    const navigate = useNavigate();
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    /*
    const quizzes = [
        { category: 'Category #1', name: 'Quiz #1', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/fluid/city/113.webp'},
        { category: 'Category #2', name: 'Quiz #2', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/fluid/city/114.webp'},
        { category: 'Category #3', name: 'Quiz #3', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/fluid/city/115.webp'}
    ];
     */

    useEffect(() => {
        const fetchPendingQuizzes = async (e) => {
            try {
                // TODO - Crear una ruta para poder conseguir los cuestionarios pendientes de aprobar ('pending')
                const response = await fetch('https://localhost:8000/api/pending-tests', {
                    
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const pendingQuizData = await response.json();
                setPendingQuizzes(pendingQuizData);
            }
            catch (error) {
                console.error('Error fetching pending quizzes:', error);
            }
        }

        fetchPendingQuizzes();
    }, []);


    const onView = (id) => {
        navigate(`/quiz/play/${id}`);
    }

    const onApproval = async (id) => {
        Swal.fire({
            icon: "warning",
            text: "¿Está seguro de aprobar este cuestionario? Una vez lo haga, podrá ser público",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if(result.isConfirmed){
                const csrfToken = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                const formData = new FormData();
                formData.append('_method', 'PUT'); // Use method spoofing for Laravel: PUT doesn't work properly
                formData.append('status', 'approved'); // NOTA: "status" representaría el estado del cuestionario ('pending', 'approved', 'rejected')

                const approveQuiz = async (e) => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/test/${id}`, {
                            
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                            },
                            credentials: 'include', // Include cookies for the domain
                            body: formData
                        });

                        if (!response.ok) {
                            throw new Error("Failed to approve quiz");
                        }

                        console.log("Quiz approved successfully");
                        await Swal.fire({
                            icon: "success",
                            text: "Cuestionario aprobado con éxito",
                            timer: 3000
                        }).then(result => {
                            window.location.reload();
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                approveQuiz();
            }
        });
    }

    const onRejection = async (id) => {
        Swal.fire({
            icon: "warning",
            text: "¿Está seguro de rechazar este cuestionario?",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if(result.isConfirmed){
                const csrfToken = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                const formData = new FormData();
                formData.append('_method', 'PUT'); // Use method spoofing for Laravel: PUT doesn't work properly
                formData.append('status', 'rejected'); // NOTA: "status" representaría el estado del cuestionario ('pending', 'approved', 'rejected')

                const rejectQuiz = async (e) => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/test/${id}`, {
                            
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                            },
                            credentials: 'include', // Include cookies for the domain
                            body: formData
                        });

                        if (!response.ok) {
                            throw new Error("Failed to reject quiz");
                        }

                        console.log("Quiz rejected successfully");
                        await Swal.fire({
                            icon: "success",
                            text: "Cuestionario rechazado con éxito",
                            timer: 3000
                        }).then(result => {
                            window.location.reload();
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                rejectQuiz();
            }
        });
    }


    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="list-ul" /> Manejo de cuestionarios
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {/* NOTA: "status" representaría el estado del cuestionario ('pending', 'approved', 'rejected') */}
                        {pendingQuizzes ? (
                            pendingQuizzes.map((quiz, index) => (
                                <MDBListGroupItem key={index}>
                                    <MDBBadge pill light color='primary' className="mb-3">
                                        {quiz.category}
                                    </MDBBadge>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={quiz.image_src}
                                                alt='User image'
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{quiz.name}</p>
                                                <p className='text-muted'>{quiz.creator}</p>
                                            </div>
                                        </div>
                                        <div className="ms-5">
                                            <MDBBtn size='sm' rounded color='link'
                                                    onClick={() => onView(quiz.test_id)}>
                                                <MDBIcon fas icon="eye" />
                                            </MDBBtn>
                                            <MDBBtn size='sm' rounded color='success' className="ms-2"
                                                    onClick={() => onApproval(quiz.test_id)}>
                                                <MDBIcon fas icon="check" />
                                            </MDBBtn>
                                            <MDBBtn size='sm' rounded color='danger' className="ms-2"
                                                    onClick={() => onRejection(quiz.test_id)}>
                                                <MDBIcon fas icon="times" />
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </MDBListGroupItem>
                            ))
                        ) : (
                            <MDBTypography tag="h6">No hay cuestionarios pendientes de revisar</MDBTypography>
                        )}
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default QuizManagement;