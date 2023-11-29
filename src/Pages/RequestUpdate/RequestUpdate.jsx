import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const RequestUpdate = () => {
  const axiosPublic = useAxiosPublic();
  const [request, setRequest] = useState({});
  const { user } = useContext(AuthContext);
  const [division, setDivision] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    axiosPublic.get(`/donation-request-details/${params.id}`).then((res) => {
      setRequest(res.data);
      console.log(res.data);
    });
  }, [axiosPublic, params]);

  useEffect(() => {
    axiosPublic
      .get("/division")
      .then((res) => {
        setDivision(res.data);
      })
      .catch((error) => console.error("Error fetching division data:", error));
  }, [axiosPublic]);

  const handleDistricts = (event) => {
    setDistrictId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (districtId) {
        try {
          const districtData = await axiosPublic.get(
            `/districts/${districtId}`
          );
          const divisionData = await axiosPublic.get(`/division/${districtId}`);
          const upazilaData = await axiosPublic.get(
            `/districtsName/${upazilaId}`
          );

          setDistricts(districtData.data);
          setDivisionName(divisionData.data.name);
          setDistrictName(upazilaData.data.name);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [axiosPublic, districtId, upazilaId]);

  const handleUpazila = (event) => {
    setUpazilaId(event.target.value);
  };

  useEffect(() => {
    const getUpazila = async () => {
      if (upazilaId) {
        try {
          const upazilaData = await axiosPublic.get(`/upazilas/${upazilaId}`);
          setUpazila(upazilaData.data);
        } catch (error) {
          console.error("Error fetching upazila data:", error);
        }
      }
    };
    getUpazila();
  }, [axiosPublic, upazilaId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = form.requesterName.value;
    const requesterEmail = form.requesterEmail.value;
    const recipientName = form.recipientName.value;
    const recipientUpazila = form.recipientUpazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const blood = form.blood.value;
    const requestMessage = form.requestMessage.value;

    const data = {
      requesterName,
      requesterEmail,
      recipientName,
      blood,
      recipientUpazila,
      districtName,
      divisionName,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      requestMessage,
    };

    axiosPublic.put(`/request-update/${params.id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Good job!",
          text: "Your request updated!",
          icon: "success",
        });
        navigate("/dashboard");
      }
    });
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">
          Blood Donation Request update Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="requesterName" className="text-gray-600 mb-2">
                Requester Name (Read Only)
              </label>
              <input
                type="text"
                name="requesterName"
                value={user.displayName || ""}
                className="border border-gray-300 p-2 rounded-md bg-gray-100"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="requesterEmail" className="text-gray-600 mb-2">
                Requester Email (Read Only)
              </label>
              <input
                required
                type="email"
                name="requesterEmail"
                value={user.email || ""}
                className="border border-gray-300 p-2 rounded-md bg-gray-100"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="recipientName" className="text-gray-600 mb-2">
                Recipient Name
              </label>
              <input
                required
                defaultValue={request.recipientName}
                type="text"
                name="recipientName"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="recipientDivision" className="text-red-400 mb-2">
                Recipient Division*
              </label>
              <select
                required
                onClick={handleDistricts}
                className="border border-gray-300 p-2 rounded-md"
              >
                <option defaultValue={request.divisionName}>
                  {request.divisionName}
                </option>
                ;
                {division?.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="recipientDistrict" className=" mb-2 text-red-400">
                Recipient District*
              </label>
              <select
                required
                onClick={handleUpazila}
                className="border border-gray-300 p-2 rounded-md"
              >
                <option defaultValue={request.districtName}>
                  {request.districtName}
                </option>
                ;
                {districts?.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="recipientUpazila" className="text-gray-600 mb-2">
                Recipient Upazila
              </label>
              <select
                required
                name="recipientUpazila"
                className="border border-gray-300 p-2 rounded-md"
              >
                <option defaultValue={request.recipientUpazila}>
                  {request.recipientUpazila}
                </option>
                ;
                {upazila?.map((data) => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="hospitalName" className="text-gray-600 mb-2">
                Hospital Name
              </label>
              <input
                required
                type="text"
                name="hospitalName"
                defaultValue={request.hospitalName}
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Blood-group" className="text-gray-600 mb-2">
                Select an blood group
              </label>
              <select
                required
                name="blood"
                className="border border-gray-300 p-2 rounded-md"
              >
                <option defaultValue={request.blood}>{request.blood}</option>;
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="fullAddress" className="text-gray-600 mb-2">
                Full Address
              </label>
              <input
                required
                defaultValue={request.fullAddress}
                type="text"
                name="fullAddress"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="donationDate" className="text-gray-600 mb-2">
                Donation Date
              </label>
              <input
                required
                defaultValue={request.donationDate}
                type="date"
                name="donationDate"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="donationTime" className="text-gray-600 mb-2">
                Donation Time
              </label>
              <input
                required
                defaultValue={request.donationTime}
                type="time"
                name="donationTime"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="requestMessage" className="text-gray-600 mb-2">
              Request Message
            </label>
            <textarea
              required
              defaultValue={request.requestMessage}
              name="requestMessage"
              rows="4"
              className="border border-gray-300 p-2 rounded-md resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestUpdate;
