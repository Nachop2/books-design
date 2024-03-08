import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

const ContactManagement = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    /*
    const contacts = [
        { category: 'Feedback', type: 'Feature idea', title: 'Private messages', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/avatars/1.jpg'},
        { category: 'Feedback', type: 'Feature improvement', title: 'Quiz types', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/avatars/2.jpg'},
        { category: 'Report', type: 'Spam', title: 'Nonsense quizzes', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/avatars/3.jpg'}
    ];
    */

    useEffect(() => {
        const fetchContacts = async (e) => {
            // TODO - Crear una ruta para conseguir todos los contactos
            try {
                const response = await fetch('https://localhost:8000/api/contacts', {
                    
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contactData = await response.json();
                setContacts(contactData);
            }
            catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }

        fetchContacts();
    }, []);


    const onView = (id) => {
        // TODO - Crear una ruta para la vista de contactos (y una ruta en el back para los datos)
        navigate(`/contact/${id}`);
    }

    const onRead = (id) => {
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append('_method', 'PUT'); // Use method spoofing for Laravel: PUT doesn't work properly
        formData.append('read', true); // NOTA: "read" representaría si un contacto tipo "feedback" fue leído

        const markAsRead = async (e) => {
            try {
                // TODO - Crear una ruta para un contacto en concreto
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${id}`, {
                    
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                    },
                    credentials: 'include', // Include cookies for the domain
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Failed to update feedback contact");
                }

                console.log("Contact marked as read successfully");
                window.location.reload();
            }
            catch (error) {
                console.error(error);
            }
        }

        markAsRead();
    }

    const onStatusChoice = (id, choice) => {
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append('_method', 'PUT'); // Use method spoofing for Laravel: PUT doesn't work properly
        formData.append('status', choice); // NOTA: "status" representaría si un contacto tipo "report" tiene algún valor o "pending", o "dismissed", o "resolved"

        const setStatus = async (e) => {
            try {
                // TODO - Crear una ruta para un contacto en concreto
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${id}`, {
                    
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                    },
                    credentials: 'include', // Include cookies for the domain
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Failed to update report contact");
                }

                console.log("Report contact successfully");
                window.location.reload();
            }
            catch (error) {
                console.error(error);
            }
        }

        setStatus();
    }


    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="phone-square" /> Contact Management
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {contacts.map((contact, index) => (
                            <MDBListGroupItem key={index}>
                                <div className="d-flex justify-content-start align-items-center mb-3">
                                    <MDBBadge pill light color={contact.category === 'Feedback' ? 'warning' : 'danger'}>
                                        {contact.category}
                                    </MDBBadge>
                                    <MDBBadge pill light color='primary' className="ms-2">
                                        {contact.type}
                                    </MDBBadge>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={contact.image_src}
                                            alt='User image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{contact.title}</p>
                                            <p className='text-muted'>{contact.creator}</p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link' onClick={() => onView(contact.id)}>
                                            <MDBIcon fas icon="eye" />
                                        </MDBBtn>
                                        {/* NOTA: Estaría bien tener algo que marque que el feedback ha sido leido */}
                                        {/* NOTA: Estaría bien tener algo que marque que el estado de algo reportado ('pending', 'resolved', 'dismissed') */}
                                        {contact.category === 'Feedback' ? (
                                            !contact.read && (
                                                <MDBBtn size='sm' rounded color='success' className="ms-2"
                                                        onClick={() => onRead(contact.id)}>
                                                    <MDBIcon fas icon="check-double" />
                                                </MDBBtn>
                                            )
                                        ) : (
                                            contact.status === 'pending' && (
                                                <>
                                                    <MDBBtn size='sm' rounded color='success' className="ms-2"
                                                            onClick={() => onStatusChoice(contact.id, 'resolved')}>
                                                        <MDBIcon fas icon="check-double" />
                                                    </MDBBtn>
                                                    <MDBBtn size='sm' rounded color='danger' className="ms-2"
                                                            onClick={() => onStatusChoice(contact.id, 'dismissed')}>
                                                        <MDBIcon fas icon="times" />
                                                    </MDBBtn>
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default ContactManagement;