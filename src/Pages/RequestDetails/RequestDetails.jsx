import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";

const RequestDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const name = user?.displayName;
  const email = user?.email;
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axiosPublic.get(`/donation-request-details/${params.id}`).then((res) => {
      console.log(res.data);
      setRequest(res.data);
      setLoading(false);
    });
  }, [params, axiosPublic]);

  const handleConfirm = () => {
    console.log("Name:", name);
    console.log("Password:", email);

    axiosPublic
      .put(`/request/${params.id}`, { status: "inprogress", name, email })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Your file has been Updated.",
            icon: "success",
          });
          navigate("/");
        }
      });
  };

  return (
    <div>
      <HelmetTitle title={"Request Details"} />
      {loading ? (
        <>
          <div className="flex h-screen w-full justify-center items-center my-10">
            <div
              role="status"
              className="space-y-2.5 animate-pulse h-screen flex-grow bg-gray-300 rounded-lg max-w-5xl mx-auto "
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto my-10">
            <div className="flex flex-col sm:flex-row justify-evenly">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Requester Information:
                </h2>
                <p>
                  <strong>Requester Name:</strong> {request?.requesterName}
                </p>
                <p>
                  <strong>Requester Email:</strong> {request?.requesterEmail}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Recipient Information:
                </h2>
                <p>
                  <strong>Recipient Name:</strong> {request?.recipientName}
                </p>
                <p>
                  <strong>Recipient District:</strong> {request?.districtName}
                </p>
                <p>
                  <strong>Recipient Upazila:</strong>{" "}
                  {request?.recipientUpazila}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-evenly">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Hospital Information:
                </h2>
                <p>
                  <strong>Hospital Name:</strong> {request?.hospitalName}
                </p>
                <p>
                  <strong>Hospital Address:</strong> {request?.fullAddress}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Donation Details:
                </h2>
                <p>
                  <strong>Donation Date:</strong> {request?.donationDate}
                </p>
                <p>
                  <strong>Donation Time:</strong> {request?.donationTime}
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-2">Request Message:</h2>
              <p>{request?.requestMessage}</p>
            </div>
            {request?.requesterEmail === user.email ? (
              <></>
            ) : (
              <div className="flex justify-center items-center my-5">
                <button
                  onClick={() => {
                    document.getElementById("modal").classList.remove("hidden");
                  }}
                  className="py-4 px-10 bg-blue-600 text-white text-lg rounded-xl"
                >
                  Donate Please
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center ">
            <div
              id="modal"
              className="hidden fixed inset-0 overflow-y-auto z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            >
              <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-lg font-semibold mb-4">Enter Details</h2>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded-md py-2 px-3 mb-3 focus:outline-none"
                  value={user?.displayName}
                  readOnly
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md py-2 px-3 mb-3 focus:outline-none"
                  value={user?.email}
                  readOnly
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      document.getElementById("modal").classList.add("hidden");
                    }}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestDetails;
