import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const RequestDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axiosPublic.get(`/donation-request-details/${params.id}`).then((res) => {
      console.log(res.data);
      setRequest(res.data);
      setLoading(false);
    });
  }, [params, axiosPublic]);

  const handleModal = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to give blood?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/request/${params.id}`, { status: "inprogress" })
          .then((res) => {
            console.log(res.data);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };
  return (
    <div>
      {loading ? (
        <></>
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

            <div className="flex justify-center items-center my-5">
              <button
                onClick={handleModal}
                className="py-4 px-10 bg-blue-600 text-white text-lg rounded-xl"
              >
                Donate Please
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestDetails;
