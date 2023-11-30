import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const useVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        if (user) {
          const res = await axiosPublic.get(
            `/verifyVolunteer/?email=${user.email}`
          );
          if (res.data.role === "volunteer") {
            setIsVolunteer(true);
          }
        }
        setVolunteerLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setVolunteerLoading(false);
      }
    };
    fetchVolunteerData();
  }, [axiosPublic, user]);

  return [isVolunteer, volunteerLoading];
};

export default useVolunteer;
