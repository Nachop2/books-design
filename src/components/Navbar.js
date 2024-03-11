import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import {
    MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler
} from "mdb-react-ui-kit";
import logo from "../images/logo.png";
import { CategoryContext } from "./CategoryContext";

const Navbar = ({ userIsLoggedIn }) => {
    const { categories, setCategories } = useContext(CategoryContext);
    const navigate = useNavigate();
    const [openBasic, setOpenBasic] = useState(false);

    const onLogout = () => {
        // Borrar almacenamiento local
        localStorage.removeItem("USER");
        localStorage.removeItem("XSRF-TOKEN");


        // Borrar la cookie del inicio de sesión
        // (poner una fecha pasada de caducidad debería hacer que el navegador borre dicha cookie)
        document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirigir a la página de inicio
        window.location.reload();
        navigate("/home");
    }

    return (
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
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/home">Inicio</MDBNavbarLink>
                        </MDBNavbarItem>

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
                                {userIsLoggedIn ? (
                                    <>
                                        <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/dashboard">
                                            <MDBIcon fas icon="table" /> Menú
                                        </MDBBtn>
                                        <MDBBtn color="warning" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/quiz/create">
                                            <MDBIcon fas icon="plus-circle" /> Crear cuestionario
                                        </MDBBtn>
                                        <MDBBtn color="info" onClick={onLogout}>
                                            <MDBIcon fas icon="sign-out-alt" /> Cerrar sesión
                                        </MDBBtn>
                                    </>
                                ) : (
                                    <>
                                        <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/login">
                                            <MDBIcon fas icon="sign-in-alt" /> Iniciar sesión
                                        </MDBBtn>
                                        <MDBBtn color="success" href="/register">
                                            <MDBIcon fas icon="user-plus" /> Registrarse
                                        </MDBBtn>
                                    </>
                                )}
                                <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/book/create">
                                    <MDBIcon fas icon="book" /> Añadir libro
                                </MDBBtn>
                            </div>
                        </MDBNavbarItem>
                    </MDBNavbarNav>



                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;