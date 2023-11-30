import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { UploadImg } from "../../Utils/UploadImg";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { ToastContainer, toast } from "react-toastify";

const AddBlog = () => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const formRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
  const resetForm = () => {
    setTitle("");
    setThumbnail(null);
    setContent("");
    formRef.current.reset();
  };

    const userImg = await UploadImg(thumbnail);
    const img = userImg.data.display_url;
    const data = { title, img, content, status: "draft" };

    axiosPublic.post("/blog-post", data).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        toast.success("Blog create successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        resetForm();
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create a Blog Post</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block mb-1 font-semibold">
            Thumbnail Image:
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content:
          </label>
          <JoditEditor value={content} onChange={handleContentChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Blog
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddBlog;
