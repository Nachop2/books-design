import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
    MDBBtn, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText, MDBCheckbox, MDBFile, MDBIcon,
    MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea,
    MDBTypography,
    MDBValidation,
    MDBValidationItem
} from "mdb-react-ui-kit";



const CreateBook = ({ bookToBeEdited }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const csrfToken = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    const [formData, setFormData] = useState({
        name: '',
        isbn: '',
        author: '',
        imprenta: '',
        stock: '',
        price: '',
        sellingAt: ''
    });

    const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Si la edición está activada, esto se encarga de recoger los datos del test y actualizar
        if (bookToBeEdited) {
            console.log(formData);
            setFormData(bookToBeEdited);
        }

    }, []);

    const saveToAccount = async () => {


        const formData = new FormData();
        formData.append('name', document.querySelector("#name").value);
        formData.append('isbn', document.querySelector("#isbn").value);
        formData.append('author', document.querySelector("#author").value);
        formData.append('imprenta', document.querySelector("#imprenta").value);
        formData.append('stock', document.querySelector("#stock").value);
        formData.append('price', document.querySelector("#price").value);
        formData.append('sellingAt', document.querySelector("#sellingAt").value);

        //formData.append('description', document.querySelector("#description").value);


        console.log(formData);
        if (bookToBeEdited) {

            // Use method spoofing for Laravel, since using PUT doesn't work properly
            formData.append('_method', 'PUT');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book/` + bookToBeEdited.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies for the domain
                body: formData,
            })
                .then(async response => {
                    let jsonResponse = await response.json()
                    if (response.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "El libro fue actualizado con éxito",
                            showConfirmButton: true,
                        })
                    }  else if(jsonResponse == "No hubo ningun cambio") {
                        let errors = [];
                        Swal.fire({
                            icon: "error",
                            title: "No se hizo ningun cambio",
                            showConfirmButton: true,
                        })
                    } else {
                        
                        let errors = [];
                        Swal.fire({
                            icon: "error",
                            title: "Hubo errores en la actualización del libro ",
                            showConfirmButton: true,
                        })
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                },
                credentials: 'include', // Include cookies for the domain
                body: formData,
            })
                .then(async response => {
                    let jsonResponse = await response.json()
                    if (response.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "El libro se subido a la plataforma con éxito",
                            showConfirmButton: true,
                        }).then(result => {
                            if (result.isConfirmed) {
                                console.log(jsonResponse);
                                navigate("/book/edit/" + jsonResponse)
                            }
                        })
                    } else {

                        let errors = [];
                        Swal.fire({
                            icon: "error",
                            title: "Hubo errores en la creacion del libro ",
                            showConfirmButton: true,
                        })
                    }
                })
                .catch(error => console.error('Error:', error));
        }

    }

    // <div className="alert alert-danger" role="alert">
    //     <h6>Has cometido los siguientes errores al registrarte:</h6>
    //     {Object.keys(errors).map((key) => (
    //         <p key={key}>{key}: {errors[key]}</p>
    //     ))}
    // </div>

    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard className="w-25">
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">{bookToBeEdited ? 'Editar' : 'Crear'} libro</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>

                    {/* Título */}
                    <MDBValidation className="row g-3">
                        <MDBValidationItem feedback='Introduce un titulo' invalid >
                            <MDBInput
                                type="text"
                                id="name"
                                label="Título"
                                required
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                            />
                        </MDBValidationItem>


                        {/* <MDBInput type='text' id='name' label='Título' required /> */}
                        <MDBValidationItem feedback='Introduce un ISBN valido' invalid >
                            <MDBInput
                                type="text"
                                id="isbn"
                                label="ISBN"
                                required
                                name="isbn"
                                value={formData.isbn}
                                onChange={onChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Introduce un autor' invalid >
                            <MDBInput
                                type="text"
                                id="author"
                                label="Autor"
                                required
                                name="author"
                                value={formData.author}
                                onChange={onChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Introduce una imprenta' invalid >
                            <MDBInput
                                type="text"
                                id="imprenta"
                                label="Imprenta"
                                required
                                name="imprenta"
                                value={formData.imprenta}
                                onChange={onChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Introduce una cantidad valida' invalid >
                            <MDBInput
                                type="number"
                                id="stock"
                                label="Cantidad"
                                required
                                name="stock"
                                value={formData.stock}
                                onChange={onChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Introduce un precio de compra valido' invalid >
                            <MDBInput
                                type="number"
                                id="price"
                                label="Precio de compra"
                                required
                                name="price"
                                value={formData.price}
                                onChange={onChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Introduce un precio de venta valido' invalid >
                            <MDBInput
                                type="number"
                                id="sellingAt"
                                label="Precio de venta"
                                required
                                name="sellingAt"
                                value={formData.sellingAt}
                                onChange={onChange}
                            />
                        </MDBValidationItem>

                        {/* <MDBInput className="mt-4" type='text' id='imprenta' label='Imprenta' />
                        <MDBInput className="mt-4" type='number' id='stock' label='Cantidad' />
                        <MDBInput className="mt-4" type='number' id='price' label='Precio de compra' />
                        <MDBInput className="mt-4" type='number' id='sellingAt' label='Precio de venta' /> */}

                        {/* Descripción */}
                        {/* <MDBTextArea className="mt-4" type='text' id='description' label='Descripción' rows={4} /> */}

                        {/* Comprobar que solo se puede exportar o terminar cuestionarios si hay al menos una pregunta */}
                        <MDBBtn type='submit' className='mt-4' block onClick={saveToAccount}>
                            <MDBIcon fas icon="check-double" /> {bookToBeEdited ? 'Guardar cambios' : 'Crear libro'}
                        </MDBBtn>
                    </MDBValidation>



                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateBook;