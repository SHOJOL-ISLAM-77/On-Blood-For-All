import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const SignUp = () => {
  const [division, setDivision] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/division").then((res) => {
      console.log(res.data);
      setDivision(res.data);
    });
  }, [axiosPublic]);

  const handleDistricts = (event) => {
    const districtsId = event.target.value;
    setDistrictId(districtsId);
  };

  useEffect(() => {
    const getDistricts = async () => {
      await axiosPublic.get(`/districts/${districtId}`).then((res) => {
        console.log(res.data);
        setDistricts(res.data);
      });
    };
    getDistricts();
  }, [axiosPublic, districtId]);

  const handleUpazila = (event) => {
    const upazilaId = event.target.value;
    setUpazilaId(upazilaId);
  };

  useEffect(() => {
    const getUpazila = async () => {
      await axiosPublic.get(`/upazilas/${upazilaId}`).then((res) => {
        console.log(res.data);
        setUpazila(res.data);
      });
    };
    getUpazila();
  }, [axiosPublic, upazilaId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // For demo purposes, log the form data
  };

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-semibold mb-1 text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full p-4 border outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full p-4 border outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block font-semibold mb-1 text-gray-700"
          >
            Avatar:
          </label>
          <input
            type="file"
            name="avatar"
            className="input input-bordered w-full p-4 border outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Blood-group"
            className="block font-semibold mb-1 text-gray-700"
          >
            Select an blood group
          </label>
          <select className="input input-bordered w-full p-4 border outline-none">
            <option defaultValue="A+" selected>
              A+
            </option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="Blood-group"
            className="block font-semibold mb-1 text-gray-700"
          >
            Select your division
          </label>
          <select
            onChange={handleDistricts}
            className="input input-bordered w-full p-4 border outline-none"
          >
            {division?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="Blood-group"
            className="block font-semibold mb-1 text-gray-700"
          >
            Select your district
          </label>
          <select  onChange={handleUpazila} className="input input-bordered w-full p-4 border outline-none">
          {districts?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="Blood-group"
            className="block font-semibold mb-1 text-gray-700"
          >
            Select your upazila
          </label>
          <select className="input input-bordered w-full p-4 border outline-none">
          {upazila?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full p-4 border outline-none"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            className="input input-bordered w-full p-4 border outline-none"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
