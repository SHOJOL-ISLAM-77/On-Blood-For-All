import { ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  console.log(users);

  const handleStatus = (status, id) => {
    console.log(status, id);
    axiosPublic
      .put(`/update-user-status/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Updated user role", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRole = (role, id) => {
    console.log(role, id);
    axiosPublic
      .put(`/update-user-role/${id}`, { role })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Updated user role", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3 className="text-center py-4 text-3xl">All User</h3>
      <HelmetTitle title={"All Users"} />
      <div className="py-28 overflow-x-auto mx-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Update Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Volunteer
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Admin
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user?._id}
                  className="bg-white border-b hover:bg-gray-50 "
                >
                  <td className="w-32 min-w-[120px] min-h-[120px] h-28 p-4">
                    <img
                      className="w-full h-full object-cover"
                      src={user?.img}
                      alt="User"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user?.status}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    <button
                      onClick={() =>
                        handleStatus(
                          user?.status === "active" ? "block" : "active",
                          user._id
                        )
                      }
                      className="px-2 py-2 bg-red-400 rounded-lg"
                    >
                      {user.status === "active" ? <>Block</> : <>Active</>}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "volunteer" ? (
                      <>
                        <button
                          disabled
                          className="px-2 py-2 bg-gray-400 rounded-lg text-black"
                        >
                          make Volunteer
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRole("volunteer", user?._id)}
                          className="px-2 py-2 bg-red-400 rounded-lg text-black"
                        >
                          make Volunteer
                        </button>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "Admin" ? (
                      <>
                        <button
                          disabled
                          className="px-2 py-2 bg-gray-400 rounded-lg text-black"
                        >
                          make admin
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRole("Admin", user?._id)}
                          className="px-2 py-2 bg-red-400 rounded-lg text-black"
                        >
                          make admin
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllUsers;
