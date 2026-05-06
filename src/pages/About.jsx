import { useState, useEffect } from "react";

const About = () => {
  const images = [
    "/game.png",
    "/calithensis.png",
    "/coding.png",
    "/sketch.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/ADITYA-YADAV-1.pdf";
    link.download = "Aditya_Yadav_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        id="about"
        className="max-w-8xl px-4 py-5 
                    flex flex-col md:flex-row items-center gap-5"
      >
        <div className="hidden md:block md:w-1/2 h-[92vh] relative overflow-hidden">
          <img
            src={images[currentIndex]}
            alt="gallery"
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Content Section */}
        <section
          className="w-full md:w-1/2 text-gray-200/70 
                          text-center md:text-left"
        >
          {/* About Me Heading */}
          <h2
            className="
            text-[32px] text-white font-light
            lg:text-[28px]
            md:text-[26px]
            sm:text-[24px]
            xl:text-[50px]
          "
          >
            About Me
          </h2>

          {/* Title with colored accent */}
          <h3
            className="
            text-[19px] font-normal mb-4 text-gray-200/80
            lg:text-[18px] lg:mb-2
            md:text-[17px]
            sm:text-[16px]
            xl:text-[25px]
          "
          >
            <span className="text-lime-400/75 font-medium">Data Scientist</span>
          </h3>

          {/* Main Description - Paragraph 1 */}
          <p
            className="
            text-[16.5px] leading-[1.65] mb-6 text-gray-200/75
            lg:text-[16px] lg:leading-[1.7] lg:mb-5
            md:text-[15px] md:mb-4
            sm:text-[14px]
          "
          >
            I am a Software Engineer with a strong foundation in web development
            and data-driven problem solving. I build scalable, user-focused
            applications using modern technologies like React, Node.js, and
            databases, while also leveraging machine learning concepts where
            needed. I focus on writing clean, maintainable code and delivering
            solutions that are efficient, reliable, and aligned with real-world
            use cases.
          </p>

          <hr className="mb-4" />

          {/* Description - Paragraph 2 */}
          <p
            className="
            text-[16.5px] leading-[1.65] mb-6 text-gray-200/75
            lg:text-[16px] lg:leading-[1.7] lg:mb-5
            md:text-[15px] md:mb-4
            sm:text-[14px]
          "
          >
            Outside of work, I enjoy exploring new technologies and building
            side projects that challenge my creativity and technical skills. I
            regularly practice data structures and algorithms to sharpen my
            problem-solving abilities. I also like exploring UI/UX designs,
            watching tech-related content, and occasionally gaming or listening
            to music to relax and stay inspired.
          </p>

          <hr className="mb-4" />

          {/* Description - Paragraph 3 */}
          <p
            className="
            text-[16.5px] leading-[1.65] mb-6 text-gray-200/75
            lg:text-[16px] lg:leading-[1.7] lg:mb-5
            md:text-[15px] md:mb-4
            sm:text-[14px]
          "
          >
            I am curious, disciplined, and growth-oriented. I enjoy breaking
            down complex problems into simple, logical steps and continuously
            improving my approach. I adapt quickly, communicate clearly, and
            work well both independently and in collaborative environments. I
            believe in consistency, attention to detail, and learning something
            new from every experience.
          </p>

          {/* CTA Button */}
          <button
            onClick={downloadCV}
            className="
              px-9 py-3.5 
              text-[16px] font-medium
              text-lime-400/75 bg-black
              border border-lime-400/75
              hover:bg-lime-400/75 hover:text-black
              cursor-pointer
              transition-all duration-300 ease-out  
              active:scale-95
              lg:text-[15px] lg:px-8 lg:py-3 lg:mb-10
              md:text-[14px] md:px-7 md:py-2.5 md:mb-10
              sm:text-[14px] sm:px-6 sm:py-2.5 sm:mb-10
            "
          >
            Get CV
          </button>
        </section>
      </div>
    </>
  );
};

export default About;
