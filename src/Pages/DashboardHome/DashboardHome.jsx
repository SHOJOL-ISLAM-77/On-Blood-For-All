import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import {
  FaCoins,
  FaEdit,
  FaEnvelopeOpenText,
  FaPhabricator,
  FaRegTrashAlt,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";
import useVolunteer from "../../Hooks/UseVolunteer";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [totalRequests, setTotalRequests] = useState([]);

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests-for-home"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/get-request-for-dashboard-home-page?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/delete-request/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleUpdateStatus = (event, id) => {
    const selectValue = event.target.value;
    console.log(selectValue, id);

    const data = { selectValue };

    axiosPublic.put(`/update-status/${id}`, data).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Good job!",
          text: "Status updated!",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosPublic]);

  useEffect(() => {
    axiosPublic.get("/total-requests").then((res) => {
      setTotalRequests(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="w-full">
      <div className="bg-blue-200 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {user.displayName}!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for being a part of our blood donation community.
        </p>
      </div>

      {isAdmin || isVolunteer ?  (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 my-24">
            <div>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <FaUserFriends className="text-4xl text-gray-600 my-2" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-left text-gray-900 dark:text-white">
                  Total user:
                </h5>
                <div className="mb-3 font-normal text-gray-500 dark:text-gray-400 flex justify-evenly text-xl">
                  {users.length} people
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <FaCoins className="text-4xl text-gray-600 my-2" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-left text-gray-900 dark:text-white">
                  Total funding:
                </h5>
                <div className="mb-3 font-normal text-gray-500 dark:text-gray-400 flex justify-evenly text-xl">
                  {users.length} Taka
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <FaEnvelopeOpenText className="text-4xl text-gray-600 my-2" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-left text-gray-900 dark:text-white">
                  Total requests:
                </h5>
                <div className="mb-3 font-normal text-gray-500 dark:text-gray-400 flex justify-evenly text-xl">
                  {totalRequests.length} people
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-28 mx-6 overflow-x-scroll">
            {requests.length > 0 && (
              <>
                <div className="w-full">
                  <div>
                    <div className="shadow-md sm:rounded-lg ">
                      <div className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2 px-4 grid grid-cols-9 min-w-max lg:min-w-full">
                        <div className="sm:py-3 sm:px-3 font-black">Name</div>
                        <div className="sm:py-3 sm:px-3 font-black">
                          Location
                        </div>
                        <div className="sm:py-3 sm:px-3 font-black">Date</div>
                        <div className="sm:py-3 sm:px-3 font-black">Time</div>
                        <div className="sm:py-3 sm:px-3 font-black">Status</div>
                        <div className="sm:py-3 sm:px-3 font-black">
                          Information
                        </div>
                        <div className="sm:py-3 sm:px-3 font-black">Edit</div>
                        <div className="sm:py-3 sm:px-3 font-black">Delete</div>
                        <div className="sm:py-3 sm:px-3 font-black">View</div>
                      </div>
                      <div className="divide-y divide-gray-200 min-w-max">
                        {requests?.map((data, index) => (
                          <div
                            key={index}
                            className="flex flex-row  items-center"
                          >
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              {data?.recipientName}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6 ">
                              {data?.fullAddress}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              {data?.donationDate}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              {data?.donationTime}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              {data?.status === "inprogress" ? (
                                <select
                                  onChange={(e) =>
                                    handleUpdateStatus(e, data._id)
                                  }
                                  name="status"
                                  className="input input-bordered rounded-lg w-full p-2 border outline-none mx-auto"
                                >
                                  <option value="done">Done</option>
                                  <option value="canceled">Canceled</option>
                                </select>
                              ) : (
                                <>{data.status}</>
                              )}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6 overflow-x-auto w-[250px]">
                              {data.status === "inprogress" ? (
                                <>
                                  <p>{data.accepterName}</p>
                                  <p>{data.accepterEmail}</p>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              {data?.status === "pending" ? (
                                <Link to={`/request-update/${data._id}`}>
                                  <FaEdit className="text-xl cursor-pointer" />
                                </Link>
                              ) : (
                                <FaEdit className="text-xl text-gray-400" />
                              )}
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              <FaRegTrashAlt
                                onClick={() => handleDelete(data?._id)}
                                className="text-xl text-red-500 cursor-pointer"
                              />
                            </div>
                            <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                              <Link to={`/requestDetails/${data._id}`}>
                                <FaPhabricator className="text-xl cursor-pointer" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-white flex justify-center items-center ">
            <Link
              to="/dashboard/my-donation-requests"
              className="text-base lg:text-lg bg-blue-500 px-3 py-2 rounded-lg"
            >
              View my all request
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
