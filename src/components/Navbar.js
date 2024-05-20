import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import {
    MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler
} from "mdb-react-ui-kit";
import logo from "../images/logo.png";
// import { CategoryContext } from "./CategoryContext";


const Navbar = ({ userIsLoggedIn }) => {
    // const { categories, setCategories } = useContext(CategoryContext);
    const navigate = useNavigate();
    const [openBasic, setOpenBasic] = useState(false);

    const onLogout = async () => {
        // Borrar almacenamiento local

        const csrfToken = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies in the request
        });

        localStorage.removeItem("USER");
        localStorage.removeItem("XSRF-TOKEN");


        // Borrar la cookie del inicio de sesión
        // (poner una fecha pasada de caducidad debería hacer que el navegador borre dicha cookie)
        document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'laravel_session; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirigir a la página de inicio
        window.location.reload();
        navigate("/home");
    }

    return (
        <>
            {userIsLoggedIn ? (
                <MDBNavbar expand="lg" dark bgColor="dark">
                    <MDBContainer fluid >
                        {/* <Link to="/home" className="nav-link">
                    <MDBNavbarBrand style={{ maxWidth: 200 }}>
                        <img src={logo} className="img-fluid" alt="Logo" />
                    </MDBNavbarBrand>
                </Link> */}

                        <MDBNavbarToggler
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setOpenBasic(!openBasic)}
                        >
                            <MDBIcon icon="bars" fas />
                        </MDBNavbarToggler>

                        <MDBCollapse navbar open={openBasic} style={{ height: "fit-content;" }}>
                            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">


                                {/* <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                    Categorías
                                </MDBDropdownToggle>
                                <MDBDropdownMenu dark>
                                    {categories.map(category => (
                                        <MDBDropdownItem link href={`/category/${category.name}/1`}>{category.name}</MDBDropdownItem>
                                    ))}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem> */}
                                <MDBNavbarItem>
                                    <div className="d-grid gap-2 p-1 d-lg-flex">
                                        <MDBBtn color="info" onClick={onLogout}>
                                            <MDBIcon fas icon="sign-out-alt" /> Cerrar sesión
                                        </MDBBtn>
                                        <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/home">
                                            <MDBIcon fas icon="book" /> Lista de libros
                                        </MDBBtn>
                                        <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/book/create">
                                            <MDBIcon fas icon="book" /> Añadir libro
                                        </MDBBtn>
                                        <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/pdf">
                                            <MDBIcon fas icon="receipt" /> Crear factura
                                        </MDBBtn>
                                    </div>
                                </MDBNavbarItem>
                            </MDBNavbarNav>



                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            ) : (
                <>
                </>
            )}
        </>


    );
};

export default Navbar;