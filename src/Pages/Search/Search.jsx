import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const SearchPage = () => {
  const [division, setDivision] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const axiosPublic = useAxiosPublic();
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");

  useEffect(() => {
    axiosPublic.get("/division").then((res) => {
      console.log(res.data);
      setDivision(res.data);
    });
  }, [axiosPublic]);

  const handleDistricts = async (event) => {
    const districtsId = event.target.value;
    console.log(event.target.value);
    setDistrictId(districtsId);
    console.log(districtId);
  };

  useEffect(() => {
    const getDistricts = async () => {
      await axiosPublic.get(`/districts/${districtId}`).then((res) => {
        console.log(res.data);
        setDistricts(res.data);
      });

      await axiosPublic.get(`/division/${districtId}`).then((res) => {
        console.log(res.data);
        setDivisionName(res.data.name);
      });

      await axiosPublic.get(`/districtsName/${upazilaId}`).then((res) => {
        setDistrictName(res.data.name);
      });
    };
    getDistricts();
  }, [axiosPublic, upazilaId, districtId]);

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

  const handleSearch = (e) => {
    e.preventDefault();

    const blood = e.target.bloodGroup.value;
    console.log(blood);
    // Perform search logic here using the form data
    // For demonstration, let's assume an empty donor list for now
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Search for Donors</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="Blood-group"
              className="block font-semibold mb-1 text-gray-700"
            >
              Select an blood group
            </label>
            <select
              required
              name="blood"
              className="input input-bordered w-full p-4 border outline-none"
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

          <div className="mb-4">
            <label
              htmlFor="Blood-group"
              className="block font-semibold mb-1 text-gray-700"
            >
              Select your division
            </label>
            <select
              required
              onClick={handleDistricts}
              className="input input-bordered w-full p-4 border outline-none"
            >
              <option>Select your Division</option>
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
            <select
              required
              onClick={handleUpazila}
              className="input input-bordered w-full p-4 border outline-none"
            >
              <option>Select your district</option>
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
            <select
              required
              name="upazila"
              className="input input-bordered w-full p-4 border outline-none"
            >
              <option>Select your Upazila</option>
              {upazila?.map((data) => (
                <option key={data.id} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-gray-700"
            >
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              className="input input-bordered w-full p-4 border outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPage;
