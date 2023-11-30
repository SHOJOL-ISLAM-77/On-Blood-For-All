import { useEffect, useState } from "react";
import HelmetTitle from "../../Components/Shared/HelmetTitle/HelmetTitle";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosPublic.get("/blogs?status=").then((res) => {
      setBlogs(res.data);
    });
  }, [axiosPublic]);
  console.log(blogs);
  return (
    <div className="max-w-[1400px] mx-auto">
      <HelmetTitle title={"Blog Page"} />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
