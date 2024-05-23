import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = ({ userIsLoggedIn }) => { // Temporarily hard-code for debugging
    const token = localStorage.getItem("XSRF-TOKEN");
    if (token) {
        userIsLoggedIn = true;
    }
    return userIsLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;