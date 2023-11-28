import Banner from "../../Components/Banner/Banner";
import ContactUs from "../../Components/ContactUs/ContactUs";
import Feature from "../../Components/Feature/Feature";

const Home = () => {
  return (
    <div>
      <Banner />
      <Feature />
      <ContactUs />
      <div className="max-w-[1400px] mx-auto text-center text-white bg-black box-border py-24 mb-14">
        <a href="tel:+88 0192345678910" className="text-6xl font-semibold ">
          Call Us: +88 01532316559
        </a>
      </div>
     
    </div>
  );
};

export default Home;
