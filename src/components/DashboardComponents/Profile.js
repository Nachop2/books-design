import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText, MDBIcon,
    MDBInput, MDBTypography
} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";

const Profile = () => {
    // Obtenemos los datos del usuario que inició sesión
    const retrievedUserData = localStorage.getItem("USER") ?? "";
    const formattedUserData = JSON.parse(retrievedUserData);

    const navigate = useNavigate();
    const [userData, setUserData] = useState(formattedUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...formattedUserData });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChangePasswordClick = async (e) => {
        try {
            // NOTA: "${process.env.REACT_APP_BACKEND_URL}/forgot-password" es la ruta del back usada por Sanctum para INICIAR
            // el proceso de cambio de contraseña, no para realizar el proceso en si. Esto manda un mensaje por email
            // con un link que lleva a la página para introducir una nueva contraseña ("ChangePassword")

            const csrfToken = document.cookie
                .split('; ')
                .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const formData = new FormData();
            formData.append('email', userData.email);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
                
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    //'Content-Type': 'application/json',
                    //'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies in the request
                body: formData
            });

            if (response.ok) {
                console.log('Password change email sent successfully');
                await Swal.fire({
                    title: `Se ha enviado un mensaje a ${userData.email} para iniciar el proceso de cambio de contraseña`,
                    icon: "success",
                    showConfirmButton: true
                });
            }
            else {
                console.error('Failed to send password change email');
                await Swal.fire({
                    title: `No se ha podido enviar un mensaje a ${userData.email} para iniciar el proceso de cambio de contraseña. 
                    Inténtelo más tarde`,
                    icon: "error",
                    showConfirmButton: true
                });
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUserData({ ...userData });
    };

    const handleSaveClick = () => {
        // Check if any input field is empty or contains only spaces
        const isAnyFieldEmpty = Object.values(editedUserData).some(value => {
            return !value.trim(); // Check if any value is empty after trimming whitespace
        });

        if (isAnyFieldEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        // Actualizar datos a nivel de almacenamiento local
        const newUserData = JSON.stringify(editedUserData);
        localStorage.setItem("USER", newUserData);

        // Actualizar datos del usuario a nivel de componente
        setUserData({ ...editedUserData });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="user-cog" /> Perfil
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBInput
                            label="Nombre"
                            type="text"
                            name="name"
                            value={userData.name}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />

                        <MDBInput
                            label="Correo electrónico"
                            type="email"
                            name="email"
                            value={userData.email}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Profile;