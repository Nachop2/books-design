import {
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardHeader, MDBCardText,
    MDBCheckbox,
    MDBCol, MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ onLogin }) => {
    const [errors, setErrors] = useState(null);

    const login = async (e) => {
        e.preventDefault();

        const cookie = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
            
            method: 'GET',
            credentials: 'include'
        });

        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        // Build formData object.

        let formData = new FormData();
        formData.append('email', document.querySelector("#email").value);
        formData.append('password', document.querySelector("#password").value);

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            
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
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                    
                    method: 'GET',
                    credentials: 'include', // Important: Include credentials for authentication
                }).then(response => response.json())
                .then(data => {
                    console.log(data);

                    // Si el inicio de sesión fue un éxito, guardamos el token
                    // y la información no sensible del usuario en el almacenamiento local
                    localStorage.setItem("XSRF-TOKEN", csrfToken);
                    localStorage.setItem("USER", JSON.stringify(data));

                    onLogin(); // Maneja la lógica en el inicio de sesión exitoso
                })
                .catch(error => console.error("Fucky wacky", error));
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
                    <MDBTypography tag='h3' className="my-3">Iniciar sesión</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form>
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h4>Has cometido los siguientes errores al iniciar sesión:</h4>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='email' id='email' label='Email address' />
                            <MDBInput className='mb-4' type='password' id='password' label='Password' />

                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                    <MDBCheckbox id='rememberMe' label='Recuerdame' defaultChecked />
                                </MDBCol>
                                <MDBCol>
                                    <Link to="/recover-password">¿Se olvidó de la contraseña?</Link>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type='submit' className='mb-4' block onClick={login}>
                                Iniciar sesión
                            </MDBBtn>

                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Login;