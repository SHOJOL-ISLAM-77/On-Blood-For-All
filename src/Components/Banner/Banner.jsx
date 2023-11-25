import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div
      className="bg-fixed bg-center bg-cover bg-no-repeat "
      style={{
        backgroundImage: "url('https://i.ibb.co/VmLMm8V/banner-Img.jpg')",
      }}
    >
      <div className="md:pb-40 lg:pb-72 py-5 md:pt-30 lg:pt-48 backdrop-blur-sm bg-white/20 ">
        <div>
          <h1  className="lg:text-4xl text-2xl text-center my-5 font-bold tracking-tight">
            <span style={{ color: "black", fontWeight: "bold" }}>
              <Typewriter
                words={[
                  "Give the Gift of Life:",
                  "Every Drop Counts:",
                  "Join Hands, Save Lives:",
                  "Be a Lifesaver:",
                  "Blood Donors Needed:",
                ]}
                loop={100}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={80}
                delaySpeed={1100}
              />
            </span>
          </h1>
          <h1 className="md:text-4xl text-2xl text-center my-5 font-bold tracking-tight">
            <span style={{ color: "black", fontWeight: "bold" }}>
              <Typewriter
                words={[
                  " Donate Blood Today.",
                  " Be a Hero, Donate Blood.",
                  "Donate Blood, Save Futures.",
                  "Donate Blood, Make a Difference.",
                  "Your Contribution Matters",
                ]}
                loop={100}
                cursor
                cursorStyle="/"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center my-7 gap-5 md:gap-20">
          <Link to="/login" className="text-white bg-gray-900 md:py-3 py-2 px-5 md:px-10 text-xl rounded-lg hover:scale-x-110 duration-200">Join Us</Link>
          <Link className="text-white bg-gray-900 md:py-3 py-2 px-5 md:px-10 text-xl rounded-lg hover:scale-x-110 duration-200">Search Donors</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
