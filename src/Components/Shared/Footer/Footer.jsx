import { FaFacebookF, FaInstagramSquare, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
      <div className="w-full max-h-[500px] text-white ">
        <div className="grid grid-cols-2 h-[300px]">
          <div className="flex justify-center items-center col-span-1 bg-[#1F2937]">
            <div>
              <h3 className="text-center text-3xl font-medium py-5">
                CONTACT US
              </h3>
              <p className="text-center">123 ABS Street, Uni 21, Bangladesh</p>
              <p className="text-center"> +88 01532316559</p>
              <p className="text-center">Mon - Fri: 08:00 - 22:00</p>
              <p className="text-center">Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
          <div className="bg-[#111827] flex justify-center items-center">
            <div>
              <h3 className="text-center text-3xl font-medium py-5">
                Follow US
              </h3>
              <p className="text-center">Join us on social media</p>
              <div className="flex justify-center items-center gap-8 my-8 text-3xl">
                <FaFacebookF />
                <FaInstagramSquare />
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black w-full h-24 flex justify-center items-center">
          Copyright © On blood for all. All rights reserved.
        </div>
      </div>
  );
};

export default Footer;
