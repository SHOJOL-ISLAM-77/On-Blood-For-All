import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { UploadImg } from "../../Utils/UploadImg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const SignUp = () => {
  const [division, setDivision] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const axiosPublic = useAxiosPublic();
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [singUpError, setSingUpError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { googleSignIn, updateUserProfile, createUser } =
    useContext(AuthContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSingUpError("");

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const avatar = form.avatar.files[0];
    const blood = form.blood.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const ConfirmPassword = form.ConfirmPassword.value;

    if (password === ConfirmPassword) {
      const userImg = await UploadImg(avatar);
      const img = userImg.data.display_url;
      console.log({
        img,
        blood,
        email,
        name,
        password,
        divisionName,
        districtName,
        upazila,
        role: "donar",
        status: "active",
      });

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
      createUser(email, password)
        .then((result) => {
          console.log(result);

          updateUserProfile(name, img)
            .then((result) => {
              console.log(result.user);
            })
            .catch((error) => {
              setSingUpError(error.message);
            });
          Swal.fire("Good job!", "Thanks for Sing Up!", "success");
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          setSingUpError(error.message);
        });
    } else {
      setSingUpError("Provide same password");
    }
  };

  const handleGoogleSingUp = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
      })
      .catch((error) => {
        setSingUpError(error.message);
      });
  };

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-gray-100 shadow-md rounded-lg my-7">
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
            <option value="A+" selected>
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
            required
            onFocus={handleDistricts}
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
            onFocus={handleUpazila}
            className="input input-bordered w-full p-4 border outline-none"
          >
            <option >Select your district</option>
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
             <option >Select your Upazila</option>
            {upazila?.map((data) => (
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
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleGoogleSingUp}
          >
            handleGoogleSingUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
