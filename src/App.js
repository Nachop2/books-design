import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import Login from "./components/Login";
import Register from "./components/Register";
import { MDBContainer } from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";
// import Privacy from "./components/Privacy";
// import Terms from "./components/Terms";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import ChangePassword from "./components/ChangePassword";
import InvoicePDF from "./components/PDFInvoiceGen/InvoicePDF";
import { BookInvoiceContextProvider } from "./components/BookContext";
import AdminRoute from "./components/AdminRoute";
import InvoiceCardList from "./components/InvoiceCardList";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
function App() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [userIsMod, setUserIsMod] = useState(false);

    const handleLogin = async () => {
        if (localStorage.getItem("XSRF-TOKEN")) {
            checkPerms();
            navigate("/home");
        }
    };
    const checkPerms = async () => {
        if (localStorage.getItem("XSRF-TOKEN")) {
            await setUserIsLoggedIn(true);
            const role = JSON.parse(localStorage.getItem("USER")).role
            if (role == "mod" || role == "admin") {
                await setUserIsMod(true)
            }
        }
    }
    // This useEffect is required, since after you log in and get redirected handleLogin, it works 
    // but the moment you change tabs, pages, handleLogin is not called (Not being redirected from register or login) , so the default state prevails (false)
    // Meaning that after being logged in and changing pages (Ie, the dashboard), the register/login tabs reappear, and the protected routes dissapear
    useEffect(() => {
        // Check for token existence on component mount
        checkPerms();
    }, []);



    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <BookInvoiceContextProvider>
                {/* <RefreshLocation/> */}
                <Navbar userIsLoggedIn={userIsLoggedIn} userIsModOrAdmin={userIsMod} />
                <Routes>
                    <Route element={<Layout userIsLoggedIn={userIsLoggedIn} />} path="/">
                        {/* Redirige a "/home" desde la ruta raíz, "/" */}


                        {/* Rutas protegidas (comprueban si el usuario inició sesión) */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<Navigate to="/home" replace />} path="/" />
                            <Route element={<CardList />} path="/home" />
                            <Route element={<InvoiceCardList/>} path="/invoices"/>
                            <Route element={<CreateBook bookToBeEdited={null} />} path="/book/create" />
                            <Route element={<EditBook />} path="/book/edit/:bookId" />


                            {/* <Route element={<Privacy />} path="/privacy" /> */}
                            {/* <Route element={<Terms />} path="/terms" /> */}

                            <Route element={<NotFound />} path="*" />
                            <Route element={<InvoicePDF />} path="/pdf" />
                            <Route element={<InvoicePDF view={true} />} path="/pdf/:invoiceID" />

                            <Route element={<AdminRoute userIsModOrAdmin={userIsMod} />}>
                                <Route element={<Dashboard />} path="/dashboard" />

                            </Route>
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
