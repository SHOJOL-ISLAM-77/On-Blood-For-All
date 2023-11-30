import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import useVolunteer from "../../Hooks/UseVolunteer";
const ContentManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedStatus, setSelectedStatus] = useState(" ");
  const [isVolunteer] = useVolunteer();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs", selectedStatus],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs?status=${selectedStatus}`);
      return res.data;
    },
  });

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);

    refetch();
  };

  const handleStatus = (status, id) => {
    console.log(status, id);
    const data = { status };

    axiosPublic.put(`/update-blog-status/${id}`, data).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Good job!",
          text: "Status updated!",
          icon: "success",
        });
        refetch();
      }
    });
  };

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
        axiosPublic.delete(`/delete-blog/${id}`).then((res) => {
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
  return (
    <div>
      <div className="flex justify-evenly flex-col sm:flex-row my-8">
        <h3 className="text-xl lg:text-4xl font-bold ">Manage your contents</h3>{" "}
        <Link
          to="/dashboard/content-management/add-blog"
          className="text-white rounded-lg text-lg bg-red-500 py-3 px-5"
        >
          Add Blogs
        </Link>
      </div>
      <div className="mb-4 md:max-w-lg mx-4">
        <label htmlFor="status" className="block mb-1 font-semibold">
          Filter by Status:
        </label>
        <select
          id="status"
          onChange={handleStatusChange}
          value={selectedStatus}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value={" "}>All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid  xl:grid-cols-2 gap-20 my-20">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-72 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
              src={blog.img}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog?.title}
              </h5>
              <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <p dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              <div className="flex items-center justify-between">
                {!isVolunteer && (
                  <>
                    {blog.status === "published" ? (
                      <>
                        <button
                          onClick={() => handleStatus("draft", blog._id)}
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Unpublished
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStatus("published", blog._id)}
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Publish
                          </span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(blog._id)}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
