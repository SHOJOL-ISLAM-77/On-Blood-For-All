import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoginError("");

    signIn(email, password)
      .then((result) => {
        Swal.fire("Good job!", "Login!", "success");
        navigate(location?.state ? location.state : "/");
        console.log(result);

        return;
      })
      .catch(setLoginError("Do not match email or password"));
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <HelmetTitle title={"Login"} />
      <section className="h-screen">
        <div className="container px-6 lg:py-24">
          <div className=" flex h-full flex-wrap-reverse my-8 gap-5 items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 ">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-5 top-[40px] cursor-pointer"
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {loginError && (
                  <p className="text-red-700 pt-4">{loginError}</p>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-300 ease-in-out transform hover:scale-105"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <div className="text-center mt-4">
                <Link className="text-blue-500 hover:underline" to="/singUp">
                  do not have an account? Sing Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
