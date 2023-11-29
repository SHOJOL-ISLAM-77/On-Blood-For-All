import { useContext, useEffect, useState } from "react";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const DashboardDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [division, setDivision] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const axiosPublic = useAxiosPublic();
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get(`/verifyAdmin/?email=${user.email}`).then((res) => {
      setLoading(false);
      setUserStatus(res.data.status);
    });
  }, [axiosPublic, user]);

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
    console.log({
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
      status: "pending",
    });
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
      status: "pending",
    };

    axiosPublic.post("/create-request", data).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <div
              role="status"
              className="max-w-lg lg:w-[500px] h-[700px] p-4 flex flex-col justify-between border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <HelmetTitle title={"Donation Request"} />
          <div className="">
            {userStatus === "active" ? (
              <>
                <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                  <h2 className="text-2xl font-semibold mb-6">
                    Blood Donation Request Form
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="requesterName"
                          className="text-gray-600 mb-2"
                        >
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
                        <label
                          htmlFor="requesterEmail"
                          className="text-gray-600 mb-2"
                        >
                          Requester Email (Read Only)
                        </label>
                        <input
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
                        <label
                          htmlFor="recipientName"
                          className="text-gray-600 mb-2"
                        >
                          Recipient Name
                        </label>
                        <input
                          type="text"
                          name="recipientName"
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="recipientDivision"
                          className="text-gray-600 mb-2"
                        >
                          Recipient Division
                        </label>
                        <select
                          onClick={handleDistricts}
                          className="border border-gray-300 p-2 rounded-md"
                        >
                          <option>Select your Division</option>;
                          {division?.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="recipientDistrict"
                          className="text-gray-600 mb-2"
                        >
                          Recipient District
                        </label>
                        <select
                          onClick={handleUpazila}
                          className="border border-gray-300 p-2 rounded-md"
                        >
                          <option>Select your district</option>;
                          {districts?.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="recipientUpazila"
                          className="text-gray-600 mb-2"
                        >
                          Recipient Upazila
                        </label>
                        <select
                          name="recipientUpazila"
                          className="border border-gray-300 p-2 rounded-md"
                        >
                          <option>Select your Upazila</option>;
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
                        <label
                          htmlFor="hospitalName"
                          className="text-gray-600 mb-2"
                        >
                          Hospital Name
                        </label>
                        <input
                          type="text"
                          name="hospitalName"
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="Blood-group"
                          className="text-gray-600 mb-2"
                        >
                          Select an blood group
                        </label>
                        <select
                          required
                          name="blood"
                          className="border border-gray-300 p-2 rounded-md"
                        >
                          <option>select your blood group</option>
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
                        <label
                          htmlFor="fullAddress"
                          className="text-gray-600 mb-2"
                        >
                          Full Address
                        </label>
                        <input
                          type="text"
                          name="fullAddress"
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="donationDate"
                          className="text-gray-600 mb-2"
                        >
                          Donation Date
                        </label>
                        <input
                          type="date"
                          name="donationDate"
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="donationTime"
                          className="text-gray-600 mb-2"
                        >
                          Donation Time
                        </label>
                        <input
                          type="time"
                          name="donationTime"
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        htmlFor="requestMessage"
                        className="text-gray-600 mb-2"
                      >
                        Request Message
                      </label>
                      <textarea
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
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-screen">
                  <h2 className="text-2xl font-semibold mb-6">
                    Sorry.... You Blocked By Admin
                  </h2>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardDonationRequest;
