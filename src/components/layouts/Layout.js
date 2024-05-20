import { Link, Outlet } from "react-router-dom";
import { MDBBtn, MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";

const Layout = ({ userIsLoggedIn }) => {
    return (
        <div>
            <Outlet></Outlet>
            {userIsLoggedIn ? (
                <div className="mt-5">
                    <MDBFooter className='text-center' color='white' bgColor='dark'>
                        <MDBContainer className='p-4'>

                            {/* <section className='mb-4'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                                    voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                                    sequi voluptate quas.
                                </p>
                            </section> */}

                            <section className=''>
                                <MDBRow>
                                        <h5 className='text-uppercase'>Links</h5>

                                            <MDBRow>
                                                <MDBCol>
                                                    <Link to="/privacy" className="text-white">
                                                        Privacy
                                                    </Link>
                                                </MDBCol>
                                                <MDBCol>
                                                    <Link to="/terms" className="text-white">
                                                        Terms & Conditions
                                                    </Link>
                                                </MDBCol>
                                                <MDBCol>
                                                <a href='#' className='text-white'>
                                                    Link 3 cabildo Fuerteventura
                                                </a>
                                                </MDBCol>
                                                <MDBCol>
                                                <a href='#' className='text-white'>
                                                    Link 4
                                                </a>
                                                </MDBCol>

                                            </MDBRow>
                                            

                                </MDBRow>
                            </section>
                        </MDBContainer>



                        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            © 2024 Copyright/Derechos de autor:
                            <a className='text-white' href=''>
                                Cabildo de Fuerteventura
                            </a>
                        </div>
                    </MDBFooter>
                </div>
            ) : (
                <>
                </>
            )}

        </div>
    );
}

export default Layout;