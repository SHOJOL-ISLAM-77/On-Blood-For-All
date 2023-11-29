import { useEffect, useState } from "react";
import { FaCalendarPlus, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeleton] = useState(Array.from({ length: 9 }, (_, index) => index));
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/donation-request").then((res) => {
      setRequests(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="max-w-[1400px] mx-auto">
      {loading ? (
        <>
          <div className="grid grid-cols-3 gap-32 my-20">
            {skeleton.map((ske) => (
              <div key={ske}>
                <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="flex items-center mt-4">
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className=" grid grid-cols-3 gap-32 my-20">
            {requests.map((request) => (
              <div key={request._id} className="text-center border-4">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <FaCalendarPlus className="text-4xl text-gray-200 my-2" />
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-left text-gray-900 dark:text-white">
                    {request.requesterName}
                  </h5>
                  <div className="mb-3 font-normal text-gray-500 dark:text-gray-400 flex justify-evenly">
                    <p>Date: {request.donationDate}</p>
                    <p>Time: {request.donationTime}</p>
                  </div>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    Location: {request.fullAddress}
                  </p>
                  <Link
                    to={`/requestDetails/${request._id}`}
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    See Details
                    <FaExternalLinkAlt />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DonationRequests;
