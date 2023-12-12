import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s4sxxex",
        "template_ugtwf58",
        form.current,
        "okMXDPXJsfk3t1XOb"
      )
      .then(
        (result) => {
          if (result) {
            toast.success("Success", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <section className="bg-gray-100 py-12">
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <div className="max-w-3xl mx-auto">
          <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="message" className="block mb-2 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
