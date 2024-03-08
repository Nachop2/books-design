import Swal from "sweetalert2";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBInput, MDBTypography } from "mdb-react-ui-kit";

const RecoverPassword = () => {

    const recoverPassword = async (e) => {
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
        formData.append("email", document.querySelector("#email").value);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies in the request
                body: formData
            });

            if (response.ok) {
                console.log('Password recover email sent successfully');
                await Swal.fire({
                    icon: "success",
                    text: `Se ha enviado un mensaje a ${document.querySelector("#email").value} 
                    para iniciar el proceso de recuperación de contraseña`,
                    showConfirmButton: true
                });
            }
            else {
                console.error('Failed to send recover password');
                await Swal.fire({
                    icon: "error",
                    text: `No se ha podido enviar un mensaje a ${document.querySelector("#email").value} 
                    para iniciar el proceso de recuperación de contraseña. Revise la información o inténtelo más tarde`,
                    showConfirmButton: true
                });
            }

        }
        catch (error) {
            console.error('Error: ', error);
        }
    }


    return (
        <div className="d-flex justify-content-center mt-5 ">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag="h3" className="my-3">
                        Recuperar contraseña
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form>
                            <MDBInput type='email' id='email' name='email' label='Correo electrónico' />
                            <MDBTypography tag="h6" color="info" className='mt-4'>
                                Recuerde revisar que su correo electrónico está bien escrito
                            </MDBTypography>

                            <MDBBtn className="mt-4" color="primary" block onClick={recoverPassword}>
                                Enviar
                            </MDBBtn>
                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default RecoverPassword;