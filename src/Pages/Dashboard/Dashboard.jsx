import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex">
      <div className="lg:min-w-[300px] sm:min-w-[200px] min-w-[100px] bg-gray-800">
        <div className="flex h-screen ">
          {/* Sidebar */}
          <aside
            className={`lg:min-w-[300px] sm:min-w-[200px] min-w-[100px] fixed  h-screen  bg-gray-800 text-gray-100 ${
              isOpen ? "block" : "hidden"
            } lg:block lg:w-20 lg:flex-shrink-0`}
          >
            {/* Sidebar content */}
            <div className="flex flex-col mt-16 items-center gap-3 justify-center ">
              <Link to="/">Home</Link>
              <Link to="/">Home</Link>
              <Link to="/">Home</Link>
              <Link to="/">Home</Link>
              <Link to="/">Home</Link>
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
                  <FaAlignJustify className="text-2xl text-white" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
