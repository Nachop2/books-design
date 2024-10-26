import {Navigate, Outlet} from 'react-router-dom';

const AdminRoute = ({ userIsModOrAdmin=false }) => { // Temporarily hard-code for debugging
  const role = JSON.parse(localStorage.getItem("USER")).role
  if (role == "mod" || role == "admin") {
    userIsModOrAdmin = true;
  }
  return userIsModOrAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AdminRoute;