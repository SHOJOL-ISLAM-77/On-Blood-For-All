import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaAlignJustify,
  FaBlogger,
  FaCashRegister,
  FaEnvira,
  FaFlask,
  FaFunnelDollar,
  FaHandsHelping,
  FaHome,
  FaSearch,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import logo from "../../../public/logo.png";
import useAdmin from "../../Hooks/useAdmin";
import useVolunteer from "../../Hooks/UseVolunteer";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full h-full ">
      <div className="lg:min-w-[300px] h-full min-h-max bg-gray-300">
        <div className="flex h-screen min-h-max bg-gray-300">
          <aside
            className={`lg:min-w-[300px] sm:min-w-[200px] min-w-[100px] h-screen fixed min-h-max  bg-gray-300 ${
              isOpen ? "block" : "hidden"
            } lg:block lg:w-20 lg:flex-shrink-0`}
          >
            <div className="flex flex-col mt-16 items-center gap-4">
              <div className="border-b-2 w-full py-3 border-black">
                <Link to="/">
                  <img className="max-h-24 py-2" src={logo} alt="" />
                </Link>
              </div>

              <div className="text-left w-full px-5 flex gap-3 text-lg items-center">
                <FaHome />
                <Link to="/dashboard">Dashboard Home</Link>
              </div>
              <div className="text-left w-full px-5 flex gap-3 text-lg items-center">
                <FaUserTie />
                <Link to="/dashboard/profile">Your Profile</Link>
              </div>
              {isAdmin && (
                <div className="text-left px-5 w-full flex gap-3 text-lg items-center">
                  <FaUsers />
                  <Link to="/dashboard/all-users">All Users</Link>
                </div>
              )}
              {isAdmin || isVolunteer ? (
                <>
                  <div className="text-left px-5 w-full flex gap-3 text-lg items-center">
                    <FaEnvira />
                    <Link to="/dashboard/all-blood-donation">
                      All Blood Donation Request
                    </Link>
                  </div>
                  <div className="text-left px-5 w-full flex gap-3 text-lg items-center">
                    <FaFlask />
                    <Link to="/dashboard/content-management">
                      Content Management
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-left px-5 w-full flex gap-3 text-lg items-center">
                    <FaEnvira />
                    <Link to="/dashboard/my-donation-requests">
                      My Donation Requests
                    </Link>
                  </div>
                </>
              )}

              <div className="text-left w-full px-5 flex gap-3 text-lg items-center">
                <FaCashRegister />
                <Link to="/dashboard/create-donation-request">
                  Create Donation Request
                </Link>
              </div>
            </div>
            <div className="flex flex-col mt-16 items-center gap-4 border-t-2  border-black">
              <div className="  px-5 w-full py-3 flex gap-3 text-lg items-center">
                <FaHome />
                <Link to="/">Home</Link>
              </div>
              <div className="text-left px-5 w-full flex gap-3 text-lg items-center pb-3">
                <FaSearch />
                <Link to="/search">Search</Link>
              </div>
              <div className="text-left px-5 w-full flex gap-3 text-lg items-center pb-3">
                <FaHandsHelping />
                <Link to="/donation-requests">Donation Requests</Link>
              </div>
              <div className="text-left px-5 w-full flex gap-3 text-lg items-center pb-3">
                <FaBlogger />
                <Link to="/blogs">Blogs</Link>
              </div>
              <div className="text-left px-5 w-full flex gap-3 text-lg items-center pb-3">
                <FaFunnelDollar />
                <Link to="/funding"> Funding</Link>
              </div>
            </div>
          </aside>

          {/* Toggle button (for tablet and mobile) */}
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button onClick={toggleSidebar} className=" focus:outline-none ">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <FaAlignJustify className="text-2xl text-black" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <HelmetTitle title={"Dashboard"} />
      <div className="flex-grow overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
