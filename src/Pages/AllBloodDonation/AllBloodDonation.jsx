import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaPhabricator, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useVolunteer from "../../Hooks/UseVolunteer";

const MyDonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [isVolunteer] = useVolunteer();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests-for-admin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/total-requests`);
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

  const handleStatusFilter = (e) => {
    setFilteredStatus(e.target.value);
  };

  const filteredRequests =
    filteredStatus === "all"
      ? requests
      : requests.filter((data) => data.status === filteredStatus);

  return (
    <div>
      <HelmetTitle title={"All Donation Requests"} />
      <h4 className="text-center text-2xl my-3 uppercase">
        all donation requests
      </h4>
      <div className="my-4 flex items-center justify-center">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={filteredStatus}
          onChange={handleStatusFilter}
          className="input input-bordered rounded-lg p-2 border outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="my-28 mx-6 overflow-x-scroll">
        {filteredRequests.length > 0 && (
          <>
            <div className="w-full">
              <div>
                <div className="shadow-md sm:rounded-lg ">
                  <div className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2 px-4 grid grid-cols-9 min-w-max lg:min-w-full">
                    <div className="sm:py-3 sm:px-3 font-black">Name</div>
                    <div className="sm:py-3 sm:px-3 font-black">Location</div>
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
                    {filteredRequests?.map((data, index) => (
                      <div key={index} className="flex flex-row  items-center">
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
                              onChange={(e) => handleUpdateStatus(e, data._id)}
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
                          {!isVolunteer ? (
                            data?.status === "pending" ? (
                              <Link to={`/request-update/${data._id}`}>
                                <FaEdit className="text-xl cursor-pointer" />
                              </Link>
                            ) : (
                              <FaEdit className="text-xl text-gray-400" />
                            )
                          ) : (
                            <FaEdit className="text-xl text-gray-400" />
                          )}
                        </div>
                        <div className="sm:w-1/3 py-2 px-4 sm:py-3 sm:px-6">
                            {!isVolunteer ? (<FaRegTrashAlt
                            onClick={() => handleDelete(data?._id)}
                            className="text-xl text-red-500 cursor-pointer"
                          />):(<FaRegTrashAlt
                            className="text-xl text-gray-500 cursor-default"
                          />)}
                          
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
    </div>
  );
};

export default MyDonationRequests;
