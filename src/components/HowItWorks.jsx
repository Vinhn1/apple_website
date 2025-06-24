import React, { useRef } from "react";
import { gsap } from "gsap";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

// HowItWorks component trình bày hiệu ứng động và video về chip A17 Pro
const HowltWorks = () => {
  // useRef để tham chiếu tới thẻ video, phục vụ cho việc điều khiển phát video nếu cần
  const videoRef = useRef();

  // Kích hoạt hiệu ứng GSAP cho hình ảnh chip khi scroll tới
  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    // Hiệu ứng fadeIn cho các đoạn text khi component mount
    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screent-max-width">
        {/* Hình ảnh chip với hiệu ứng động khi scroll */}
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          {/* Tiêu đề và mô tả ngắn */}
          <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monter win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            {/* Hình ảnh khung và video minh hoạ chip */}
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Tên game minh hoạ */}
          <p className="text-gray font-semibol text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>

        <div className="hiw-text-container">
          {/* Đoạn mô tả về chip A17 Pro và hiệu năng đồ hoạ */}
          <div className="flex flex-1 justify-items-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entierly new class of iPhone chip that delivers our {' '}
              <span className="text-white">
                best graphic performance by far
              </span>.
            </p>


            <p className="hiw-text g_fadeIn">
              Mobile {"b"}
              <span className="text-white">
                games will look and feel so immersive
              </span>,
              with incredibly detailed environment and characters.
            </p>
          </div>
          {/* Đoạn mô tả về GPU mới */}
          <div className="flex-1 flex justify-center flex-col g-fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtex">Pro class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowltWorks;
