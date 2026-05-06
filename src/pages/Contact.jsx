import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_q8u1zik",
        "template_2qzi8ti",
        form.current,
        "XVyjK3xHoFj5Ex5nB"
      )
      .then(
        () => {
          toast.success("Thanks for reaching out! I'll respond shortly.");
          e.target.reset();
        },
        () => {
          toast.error("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      {/* <hr className="border-gray-800 my-10" /> */}
      <div className="flex justify-center items-center px-4 py-5 xl:mt-16 xl:mb-24">
        <div className="max-w-3xl w-full text-center">

          {/* Heading */}
          <h1 className="text-white text-5xl md:text-7xl font-medium scale-y-110">
            Contact Me
          </h1>

          <h3 className="text-lime-400/70 text-2xl md:text-3xl mt-3">
            aditya.yadav992636@gmail.com
          </h3>

          <p className="text-white/60 text-sm md:text-base mt-4">
            Let’s build something great together! I’m always open to
            collaborations, feedback, opportunities, and interesting
            discussions—feel free to reach out anytime.
          </p>

          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="mt-10">

            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="bg-transparent w-full border-b-2 border-lime-400/70 text-white text-lg px-2 py-3 transition hover:-translate-y-1 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="bg-transparent w-full border-b-2 border-lime-400/70 text-white text-lg px-2 py-3 transition hover:-translate-y-1 focus:outline-none"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              required
              className="bg-transparent w-full border-b-2 border-lime-400/70 text-white text-base px-2 py-3 mt-10 h-40 transition hover:-translate-y-1 focus:outline-none"
            />

            {/* Submit Button */}
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="border-2 border-lime-400/70 text-lime-400/70 px-10 py-3 transition hover:bg-lime-400/70 hover:text-black"
              >
                Submit
              </button>
            </div>

          </form>

          {/* Social Icons */}
          <div className="flex justify-center gap-8 text-white text-xl mt-12">
            <a href="https://www.instagram.com/_aditya_yadav__ay/" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400/70 transition">
              <FaInstagram />
            </a>
            <a href="https://github.com/adityadav002" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400/70 transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aditya-yadav003/" target="_blank" rel="noopener noreferrer"  className="hover:text-lime-400/70 transition">
              <FaLinkedinIn />
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
