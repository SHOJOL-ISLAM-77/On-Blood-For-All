import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://one-blood-for-all-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;