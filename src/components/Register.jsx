import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBInput, MDBTypography} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";

const Register = ({ setBasicModal }) => {
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


        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, {

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
                await Swal.fire({
                    icon: "error",
                    title: "Hubo errores en la creacion del usuario ",
                    showConfirmButton: true,
                })
            }
            else {
                Swal.fire({
                    icon: "success",
                    title: "El usuario se creo con éxito",
                    showConfirmButton: true,
                }).then(result => {
                    if (result.isConfirmed) {
                        setBasicModal(false)
                    }
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
        // <div className="d-flex justify-content-center align-content-center mt-5">
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
        // </div>
    );
}

export default Register;