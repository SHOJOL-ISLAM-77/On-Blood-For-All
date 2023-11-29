import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/get-request-for-dashboard-home-page?email=${user.email}`)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
      });
  }, [axiosPublic, user]);
  return (
    <div className="w-full">
      <div className="bg-blue-200 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {user.displayName}!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for being a part of our blood donation community.
        </p>
      </div>
      <div>
        {requests.length > 0 && (
          <>
            <div className="grid grid-cols-9">
              <div className="col-span-1">recipient name</div>
              <div className="col-span-1">recipient location</div>
              <div className="col-span-1">donation date</div>
              <div className="col-span-1">donation time</div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
