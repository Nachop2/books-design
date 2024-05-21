import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBTypography,
    MDBCardHeader, MDBCardBody, MDBCardText
} from 'mdb-react-ui-kit';

const Register = ({ onLogin }) => {
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const register = async (e) => {
        e.preventDefault();

        const cookie = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include'
        });
        const token = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        console.log(token);
        // Build formData object.

        let formData = new FormData();
        formData.append('name', document.querySelector("#username").value);
        formData.append('email', document.querySelector("#email").value);
        formData.append('password', document.querySelector("#password").value);
        formData.append('password_confirmation', document.querySelector("#password_confirmation").value);


        await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(token), // Include the CSRF token in the headers
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
                        localStorage.setItem("XSRF-TOKEN", token);
                        localStorage.setItem("USER", JSON.stringify(data));

                        onLogin(); // Maneja la lógica en el inicio de sesión exitoso
                    })
                    .catch(error => console.error("Fucky wacky", error));
            }
        })

        console.log(register);
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
                    <MDBTypography tag='h3' className="my-3">Register</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form id="formElement">
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h6>Has cometido los siguientes errores al registrarte:</h6>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='text' id='username' label='Nombre' />
                            <MDBInput className='mb-4' type='email' id='email' label='Correo electrónico' />
                            <MDBInput className='mb-4' type='password' id='password' label='Contraseña' />
                            <MDBInput className='mb-4' type='password' id='password_confirmation' label='Confirmar contraseña' />
                            {/* <MDBInput className='mb-4' type='tel' id='phoneNumber' label='Phone number' /> */}

                            <MDBBtn type='submit' className='mb-4' block onClick={register}>
                                Crear Usuario
                            </MDBBtn>
                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Register;