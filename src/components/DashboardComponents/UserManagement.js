import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBTypography
} from "mdb-react-ui-kit";
import Register from "../Register";

const UserManagement = () => {
    // Necesitamos saber el rol del usuario actual:
    const currentUserData = localStorage.getItem('USER');
    const formattedCurrentUserData = JSON.parse(currentUserData);
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    // const users = [
    //     { username: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/avatars/1.jpg' },
    //     { username: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/avatars/2.jpg' },
    //     { username: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/avatars/3.jpg' }
    // ];
    const fetchUsers = async (e) => {
        // TODO - Crear una ruta para conseguir todos los usuarios (excepto el propio usuario con el se tiene la sesión actual)
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies for the domain
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            setUsers(userData);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    useEffect(() => {
        

        fetchUsers();
    }, [basicModal]);

    const onAdminPromotion = async (id) => {
        Swal.fire({
            icon: "warning",
            text: "AVISO: Está apunto de PROMOCIONAR a un usuario a administrador. ¿Está seguro de darle estos permisos?",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if (result.isConfirmed) {
                const csrfToken = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                const formData = new FormData();
                formData.append('_method', 'PUT'); // Use method spoofing for Laravel: PUT doesn't work properly
                formData.append('role', 'admin');

                const promoteToAdmin = async (e) => {
                    try {
                        // TODO - Crear ruta para poder actualizar a un usuario (excepto el mismo con el que se está en sesión)
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/user/${id}`, {

                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                            },
                            credentials: 'include', // Include cookies for the domain
                            body: formData
                        });

                        if (!response.ok) {
                            throw new Error("Failed to promote user to admin");
                        }

                        await Swal.fire({
                            icon: "success",
                            text: "Usuario promocionado a administrador con éxito",
                            timer: 3000
                        }).then(result => {
                            window.location.reload();
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                promoteToAdmin();
            }
        });
    }


    const onDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            text: "AVISO: Está apunto de BORRAR un usuario. ¿Está seguro de eliminarlo de la base de datos?",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if (result.isConfirmed) {
                const csrfToken = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                const deleteUser = async (e) => {
                    try {
                        // TODO - Crear ruta para poder eliminar a un usuario (excepto el mismo con el que se está en sesión)
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${id}`, {

                            method: 'DELETE',
                            headers: {
                                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                            },
                            credentials: 'include' // Include cookies for the domain
                        });

                        if (!response.ok) {
                            throw new Error("Failed to delete user");
                        }

                        await Swal.fire({
                            icon: "success",
                            text: "Usuario borrado con éxito",
                            timer: 2000
                        }).then(result => {
                            fetchUsers();
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                deleteUser();
            }
        });
    }


    return (
        <div className="d-flex justify-content-center">
            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <Register setBasicModal={setBasicModal}></Register>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="users-cog" /> Manejo de usuarios
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {users.map((user, index) => (
                            <MDBListGroupItem key={index}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src="https://mdbootstrap.com/img/new/avatars/1.jpg"
                                            alt='User image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{user.name}</p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        {!user.role == "admin" ? (
                                            <MDBBtn size='sm' rounded color='primary' className="ms-2"
                                                onClick={() => onAdminPromotion(user.id)}>
                                                <MDBIcon fas icon="arrow-alt-circle-up" /> Administrador
                                            </MDBBtn>
                                        ) : (
                                            null
                                        )}

                                        {user.id == formattedCurrentUserData.id ? (
                                            null
                                        ) : (
                                            <MDBBtn size='sm' rounded color='danger' className="ms-2"
                                                onClick={() => onDelete(user.id)}>
                                                <MDBIcon fas icon="trash" />
                                            </MDBBtn>
                                        )}


                                    </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                    <MDBBtn className="w-100 bg-success" onClick={toggleOpen}>Crear Usuario</MDBBtn>

                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default UserManagement;