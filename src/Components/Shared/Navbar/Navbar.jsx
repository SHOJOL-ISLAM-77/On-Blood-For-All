import { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../../public/logo.png";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const drawerRef = useRef(null);

  const [dropOpen, setDropOpen] = useState(false);

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const { user, logOut } = useContext(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "underline"
              : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "underline"
              : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
          }
        >
          Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-requests"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "underline"
              : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "underline"
              : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
          }
        >
          Blogs
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "underline"
                  : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/funding"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "underline"
                  : "block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
              }
            >
              Funding
            </NavLink>
          </li>
          <li className="lg:hidden">
            <div
              className=" py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={logOut}
            >
              Sign out
            </div>
          </li>
          <li>
            <div className="relative z-40">
              <img
                onClick={toggleDropdown}
                tabIndex={0}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt="User dropdown"
              />
              {dropOpen && (
                <div className="absolute right-0 mt-2 z-50 w-48 rounded-md bg-white shadow-lg py-1 p-1">
                  <div
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={logOut}
                  >
                    Sign out
                  </div>
                  <p>{user.displayName}</p>
                </div>
              )}
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className="block text-gray-800 hover:bg-gray-200 lg:hover:bg-inherit lg:text-gray-800 py-2"
            >
              Sign In
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gray-300 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img className="max-h-24 py-2" src={logo} alt="" />
          </Link>
        </div>
        {/* Desktop menu */}
        {isLargeScreen && (
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <ul className="lg:flex lg:justify-end space-x-8">{navLinks}</ul>
          </div>
        )}
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
        {/* Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="flex justify-end h-full">
              <div ref={drawerRef} className="bg-white w-64 h-full shadow-lg">
                {/* Drawer content */}
                <div className="flex justify-end items-center bg-gray-200 p-4">
                  <button
                    onClick={closeMenu}
                    className="text-gray-800 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ul className="p-4" onClick={toggleMenu}>
                  {navLinks}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
