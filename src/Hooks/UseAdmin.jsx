import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (user) {
          const res = await axiosPublic.get(`/verifyAdmin/?email=${user.email}`);
          if (res.data.role === "Admin") {
            setIsAdmin(true); 
          }
        }
        setAdminLoading(false); 
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setAdminLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosPublic, user]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
