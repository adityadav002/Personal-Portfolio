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
            I am a Data Scientist passionate about transforming data into
            meaningful insights and intelligent solutions. I enjoy working with
            machine learning, data analysis, and modern software development to
            solve real-world problems. With a strong foundation in programming,
            databases, and full-stack development, I build efficient
            applications while applying data-driven approaches wherever
            possible. I focus on writing clean, scalable code and creating
            solutions that combine technology, logic, and practical impact.
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
            Outside of work, I enjoy exploring hobbies that keep me creative,
            focused, and constantly improving. Gaming allows me to experience
            new worlds and stories, while sketching helps me express creativity
            and improve my attention to detail. I also practice calisthenics to
            build discipline, strength, and consistency. Whether it is fitness,
            art, or technology, I enjoy challenging myself and learning
            something new through every experience.
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
            I am a curious, disciplined, and detail-oriented person who enjoys
            breaking complex problems into simple, logical solutions. I believe
            continuous improvement, consistency, and adaptability are important
            for long-term growth. I value clear communication, collaboration,
            and taking ownership of my work. Every project and experience is an
            opportunity for me to learn, improve, and create something
            meaningful.
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
