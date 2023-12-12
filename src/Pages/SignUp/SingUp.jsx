import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { UploadImg } from "../../Utils/UploadImg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";

const SignUp = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [singUpError, setSingUpError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUserProfile, createUser } = useContext(AuthContext);

  useEffect(() => {
    axiosPublic.get("/division").then((res) => {
      setDivisions(res.data);
    });
  }, [axiosPublic]);

  const handleDivision = async (event) => {
    const division = event.target.value;
    setDivision(division);
    if (division.length > 0) {
      const getDistricts = async () => {
        await axiosPublic.get(`/districts/${division[0]}`).then((res) => {
          setDistricts(res.data);
        });
      };
      getDistricts();
    }
  };

  const handleDistrict = (event) => {
    const district = event.target.value;
    setDistrict(district);
    if (district.length > 0) {
      const getUpazilas = async () => {
        await axiosPublic
          .get(`/upazilas/${district.split(",")[0]}`)
          .then((res) => {
            setUpazilas(res.data);
          });
      };
      getUpazilas();
    }
  };

  const handleUpazila = (event) => {
    const upazila = event.target.value;
    setUpazila(upazila);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSingUpError("");

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const avatar = form.avatar.files[0];
    const blood = form.blood.value;
    const password = form.password.value;
    const ConfirmPassword = form.ConfirmPassword.value;

    if (password === ConfirmPassword) {
      const passwordTest = /^(?=.*[A-Z])(?=.*[\W_]).*[A-Za-z0-9].*$/;
      if (password.length < 6) {
        setSingUpError(" Password should be at least 6 characters");
        return;
      } else if (!passwordTest.test(password)) {
        setSingUpError(
          "Your password should have at least one upper case characters, a special character ."
        );
        return;
      }
      try {
        createUser(email, password)
          .then(async (result) => {
            console.log(result);
            const userImg = await UploadImg(avatar);
            const img = userImg.data.display_url;

            updateUserProfile(name, img)
              .then((result) => {
                console.log(result.user);
              })
              .catch((error) => {
                setSingUpError(error.message);
              });

            const user = {
              img,
              blood,
              email,
              name,
              password,
              divisionName: district.split(",")[1],
              districtName: division.split(",")[1],
              upazila,
              role: "donar",
              status: "active",
            };
            const { data } = await axiosPublic.put(`/users/${email}`, user);
            Swal.fire("Good job!", "Thanks for Sing Up!", "success");
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            setSingUpError(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setSingUpError("Provide same password");
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-gray-100 shadow-md rounded-lg my-7">
      <HelmetTitle title={"Sing Up"} />
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
            required
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
            required
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
            required
            name="avatar"
            accept="image/*"
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
            onChange={handleDivision}
            className="input input-bordered w-full p-4 border outline-none"
          >
            <option>Select your Division</option>
            {divisions?.map((data) => (
              <option key={data.id} value={[data.id, data.name]}>
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
            onChange={handleDistrict}
            className="input input-bordered w-full p-4 border outline-none"
          >
            <option>Select your district</option>
            {districts?.map((data) => (
              <option key={data.id} value={[data.id, data.name]}>
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
            onChange={handleUpazila}
            className="input input-bordered w-full p-4 border outline-none"
          >
            <option disabled selected>Select your Upazila</option>
            {upazilas?.map((data) => (
              <option key={data.id} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 text-gray-700"
          >
            Password:
          </label>
          <input
            type={show ? "text" : "password"}
            required
            name="password"
            className="input input-bordered w-full p-4 border outline-none"
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-6 top-1/2 cursor-pointer"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            type={confirmShow ? "text" : "password"}
            required
            name="ConfirmPassword"
            className="input input-bordered w-full p-4 border outline-none "
            placeholder="Enter your password"
          />
          <span
            onClick={() => setConfirmShow(!confirmShow)}
            className="absolute right-6 top-1/2 cursor-pointer"
          >
            {confirmShow ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="my-4">
          {singUpError && <p className="text-red-700 pt-4">{singUpError}</p>}
        </div>
        <div className="flex justify-evenly items-center flex-wrap">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
