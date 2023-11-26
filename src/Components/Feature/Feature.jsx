import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
import { FreeMode, Pagination } from "swiper/modules";
import { Dna } from "react-loader-spinner";

const Feature = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/feature").then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, [axiosPublic]);

  useEffect(() => {
    function handleResize() {
      setSlidesPerView(getSlidesPerView());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getSlidesPerView() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  return (
    <div className="my-32 max-w-[1400px] lg:mx-auto mx-3">
      <h2 className="text-4xl font-semibold text-center mb-16">
        Benefits of donating blood
      </h2>
      {loading ? (
        <>
         <div className="flex justify-center items-center h-[500px]">
         <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
         </div>
        </>
      ) : (
        <div>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper "
          >
            {data.map((slide) => (
              <SwiperSlide
                className="max-w-sm rounded-2xl shadow-lg "
                key={slide._id}
              >
                <div className="">
                  <div className="p-2">
                    <h3 className="text-2xl font-bold my-4 text-left">
                      {slide.title}
                    </h3>
                    <p className="text-justify text-gray-600 max-h-28 overflow-hidden">
                      {slide.description}
                    </p>
                  </div>
                  <div className="w-full h-[250px]">
                    <img
                      className="rounded-b-2xl border-4"
                      src={slide.img}
                      alt="Slide"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Feature;
