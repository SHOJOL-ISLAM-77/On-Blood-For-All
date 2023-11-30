import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import useAdmin from "../Hooks/useAdmin";
import useVolunteer from "../Hooks/UseVolunteer";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const [isAdmin, adminLoading] = useAdmin();
  const [isVolunteer, volunteerLoading] = useVolunteer();

  if (loading || adminLoading || volunteerLoading) {
    return (
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    );
  }

  if ((user && isAdmin) || (user && isVolunteer)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
