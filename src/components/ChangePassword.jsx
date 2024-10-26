import {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBInput, MDBTypography} from "mdb-react-ui-kit";
import Swal from "sweetalert2";


const ChangePassword = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Token de la URL del mensaje por email para cambiar la contraseña
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email"); // Email de la URL del mensaje por email para cambiar la contraseña

    // Obtenemos los datos del usuario que inició sesión o está recuperando su contraseña
    const retrievedUserData = localStorage.getItem("USER") ?? `{"email": "${email}"}`;
    const formattedUserData = JSON.parse(retrievedUserData);

    const [userData, setUserData] = useState(formattedUserData);
    const [errors, setErrors] = useState(null);

    const changePassword = async (e) => {
        e.preventDefault();

        const cookie = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include'
        });
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        let formData = new FormData();
        formData.append('email', userData.email);
        formData.append('password', document.querySelector("#new_password").value);
        formData.append('password_confirmation', document.querySelector("#new_password_confirmation").value);
        formData.append('token', token);

        // NOTA: "${process.env.REACT_APP_BACKEND_URL}/reset-password" es la ruta del back usada por Sanctum para COMPLETAR
        // el proceso de cambiar una contraseña
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
            
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies in the request
            body: formData
        }).then(async (res) => {
            if (!res.ok) {
                handleErrors(res.errors);
                return res.json();
            }
            else {
                Swal.fire({
                    title: "La contraseña ha sido cambiada con éxito",
                    icon: "success",
                    timer: 2000
                }).then(result => {
                    if(localStorage.getItem("USER")){
                        navigate("/dashboard");
                    }
                    else {
                        navigate("/login");
                    }
                });
            }
        })
    }

    const handleErrors = (errors) => {
        if (errors) {
            setErrors(errors);
        }
    }

    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">Cambiar contraseña</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form>
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h4>Has cometido los siguientes errores al intentar cambiar la contraseña:</h4>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='password' id='new_password' label='Contraseña nueva' />
                            <MDBInput className='mb-4' type='password' id='new_password_confirmation' label='Confirmar contraseña nueva' />
                            <MDBBtn type='submit' className='mb-4' block onClick={changePassword}>
                                Enviar
                            </MDBBtn>
                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
export default ChangePassword;