import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { UploadImg } from "../../Utils/UploadImg";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [data, setData] = useState({});
  const axiosPublic = useAxiosPublic();
  const [isTrue, setIsTrue] = useState(true);
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState("")
  useEffect(() => {
    axiosPublic.get(`/verifyAdmin?email=${user?.email}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [axiosPublic, user]);

  const handleName= (event) =>{
    const name = event.target.value;
    setName(name)
  }
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    setProfile(file);
  };
  const uploadProfile = async() => {
    // const userImg = await UploadImg(profile);
    // const img = userImg.data.display_url;
    // const info = {img, name}
    // axiosPublic.put(`update-user?email=${user.email}`, info)
    // .then(res=>{
    //     console.log(res)
    // })
    // // const data = { title, img, content, status: "draft" };
    // // updateUserProfile(name, img).then((result) => {
    // //   console.log(result.user);
    // // });
    // console.log(img)
    // setIsTrue(!isTrue);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl border-4 border-blue-500 flex-grow">
        <div
          
          className="float-right  m-3 cursor-pointer text-lg text-amber-700"
        >
          {isTrue ? (
            <>
              <FaEdit onClick={() => setIsTrue(!isTrue)} className="inline" /> Edit
            </>
          ) : (
            <>
              <FaRegSave onClick={uploadProfile} className="inline" /> Save
            </>
          )}
        </div>
        <div className="p-5 flex flex-col md:flex-row gap-44">
          <div>
            <img
              className="rounded-full object-cover w-40 h-40"
              src={data?.img}
              alt=""
            />
            {!isTrue && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="px-4 py-2 bg-orange-500 text-white my-2 rounded-lg"
                />
              </>
            )}
          </div>
          <div>
            <div>
              <p className="font-bold">Full Name:</p>

              {!isTrue ? (
                <>
                  <input type="text" onChange={handleName} className="px-4 py-2 my-2 rounded-lg" />
                </>
              ) : (
                <h2 className="font-bold text-lg">{data?.name}</h2>
              )}
            </div>
            <br />
            <br />
            <div className="text-left">
              <p className="font-bold">Email Address:</p>
              <h2 className="font-bold text-lg">{user?.email}</h2>
            </div>
            <br />
            <br />
            <div className="text-left">
              <p className="font-bold">Blood Group:</p>
              <h2 className="font-bold text-lg">{data?.blood}</h2>
            </div>
          </div>
        </div>
        <div className="text-left p-5 ">
          <p className="font-bold">Address:</p>

          <h2 className="font-bold text-lg">
            {data?.upazila}, {data?.districtName}, {data?.divisionName}.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
