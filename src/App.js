import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import { MDBContainer } from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import CreateQuiz from "./components/CreateQuiz";
import { useEffect, useState } from "react";
import { CreateQuizContextProvider } from "./components/CreateQuizComponents/CreateQuizContext";
import NotFound from "./components/NotFound";
import { CategoryContextProvider } from "./components/CategoryContext";
import EditQuiz from "./components/EditQuiz";
import ChangePassword from "./components/ChangePassword";
import RefreshLocation from "./components/utils/RefreshLocation";
import RecoverPassword from "./components/RecoverPassword";

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
            <CategoryContextProvider>
                <CreateQuizContextProvider>
                    {/* <RefreshLocation/> */}
                    <Navbar userIsLoggedIn={userIsLoggedIn} />
                    <Routes>
                        <Route element={<Layout />} path="/">
                            {/* Redirige a "/home" desde la ruta raíz, "/" */}
                            <Route element={<Navigate to="/home" replace />} path="/" />

                            <Route element={<Home />} path="/home" />
                            <Route element={<Category />} path="/category/:categoryName/:pageNumber" />

                            {/* Rutas protegidas (comprueban si el usuario inició sesión) */}
                            <Route element={<ProtectedRoute />}>
                                <Route element={<Dashboard userIsModOrAdmin={userIsMod} />} path="/dashboard" />
                            </Route>
                            <Route element={<ChangePassword />} path="/password-reset/:token" />
                            <Route element={<GuestRoute />}>
                                <Route element={<Login onLogin={handleLogin} />} path="/login" />
                                <Route element={<Register onLogin={handleLogin} />} path="/register" />
                            </Route>


                            <Route element={<CreateQuiz bookToBeEdited={null} />} path="/book/create" />
                            <Route element={<EditQuiz />} path="/book/edit/:bookId" />


                            <Route element={<Quiz />} path="/quiz/play/:id" />
                            <Route element={<Privacy />} path="/privacy" />
                            <Route element={<Terms />} path="/terms" />

                            <Route element={<RecoverPassword />} path="/recover-password" />
                            <Route element={<NotFound />} path="*" />
                        </Route>
                    </Routes>
                </CreateQuizContextProvider>
            </CategoryContextProvider>
        </MDBContainer>
    );
}

export default App;
