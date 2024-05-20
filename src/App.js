import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import { MDBContainer } from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import CreateQuiz from "./components/CreateQuiz";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import EditQuiz from "./components/EditQuiz";
import ChangePassword from "./components/ChangePassword";
import RefreshLocation from "./components/utils/RefreshLocation";
import RecoverPassword from "./components/RecoverPassword";
import InvoicePDF from "./components/PDFInvoiceGen/InvoicePDF";
import PdfRender from "./components/PDFInvoiceGen/PdfRender";
import { BookInvoiceContextProvider } from "./components/BookContext";
function App() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [userIsMod, setUserIsMod] = useState(false);

    const handleLogin = async () => {
        if (localStorage.getItem("XSRF-TOKEN")) {
            await setUserIsLoggedIn(true);
            console.log(userIsLoggedIn);
            navigate("/home");
        }
    };
    // This useEffect is required, since after you log in and get redirected handleLogin, it works 
    // but the moment you change tabs, pages, handleLogin is not called (Not being redirected from register or login) , so the default state prevails (false)
    // Meaning that after being logged in and changing pages (Ie, the dashboard), the register/login tabs reappear, and the protected routes dissapear
    useEffect(() => {
        // Check for token existence on component mount
        const token = localStorage.getItem("XSRF-TOKEN");
        if (token) {
            setUserIsLoggedIn(true);
            const role = JSON.parse(localStorage.getItem("USER")).role
            if (role == "mod" || role == "admin") {
                setUserIsMod(true)
            }
            console.log();
        }
    }, []);

    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <BookInvoiceContextProvider>
                {/* <RefreshLocation/> */}
                <Navbar userIsLoggedIn={userIsLoggedIn} />
                <Routes>
                    <Route element={<Layout userIsLoggedIn={userIsLoggedIn}/>} path="/">
                        {/* Redirige a "/home" desde la ruta raíz, "/" */}


                        {/* Rutas protegidas (comprueban si el usuario inició sesión) */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<Navigate to="/home" replace />} path="/" />

                            <Route element={<CardList />} path="/home" />
                            <Route element={<CreateQuiz bookToBeEdited={null} />} path="/book/create" />
                            <Route element={<EditQuiz />} path="/book/edit/:bookId" />


                            <Route element={<Privacy />} path="/privacy" />
                            <Route element={<Terms />} path="/terms" />

                            <Route element={<RecoverPassword />} path="/recover-password" />
                            <Route element={<NotFound />} path="*" />
                            <Route element={<InvoicePDF />} path="/pdf" />
                            <Route element={<InvoicePDF view={true} />} path="/pdf/:invoiceID" />
                            <Route element={<PdfRender />} path="/view" />
                            {/* <Route element={<Dashboard userIsModOrAdmin={userIsMod} />} path="/dashboard" /> */}
                        </Route>
                        <Route element={<ChangePassword />} path="/password-reset/:token" />
                        <Route element={<GuestRoute />}>
                            <Route element={<Login onLogin={handleLogin} />} path="/login" />
                            <Route element={<Register onLogin={handleLogin} />} path="/register" />
                        </Route>



                    </Route>
                </Routes>
            </BookInvoiceContextProvider>
        </MDBContainer >
    );
}

export default App;
