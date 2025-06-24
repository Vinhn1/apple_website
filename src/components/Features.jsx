import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { animateWithGsap } from "../utils/animations";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { explore1Img, explore2Img, exploreVideo } from "../utils";

// Features component trình bày các hiệu ứng động và video cho phần giới thiệu iPhone
const Features = () => {
  // useRef để tham chiếu tới thẻ video, phục vụ cho việc điều khiển phát video bằng JS
  const videoRef = useRef();

  // Kích hoạt hiệu ứng scroll cho video bằng GSAP và ScrollTrigger
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom"
      },
      onComplete: () => {
        // Khi hiệu ứng hoàn thành, tự động phát video
        videoRef.current.play();
      },
    });
  });

  // Kích hoạt các hiệu ứng GSAP cho tiêu đề, hình ảnh và text khi component mount
  useGSAP(() => {
    animateWithGsap("#features_title", { y: 0, opacity: 1 });
    animateWithGsap(
      ".g_grow",
      {
        scale: 1,
        opacity: 1,
        ease: "power1",
      },
      {
        scrub: 5.5,
      }
    );

    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          {/* Tiêu đề chính với hiệu ứng GSAP */}
          <h1 id="features_title" className="section-heading">
            Explore the full
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            {/* Tiêu đề phụ */}
            <h2 className="text-5xl lg:text-7xl font-semibold">IPhone</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium
            </h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              {/* Video giới thiệu, tự động phát khi scroll tới */}
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                {/* Hình ảnh hiệu ứng động với GSAP */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>

                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              <div className="feature-text-container">
                {/* Đoạn mô tả về titanium và iPhone 15 Pro */}
                <div className="flex-1 flex-center">
                  {/* Mô tả về vật liệu titanium và ứng dụng trong iPhone 15 Pro */}
                  <p className="feature-text g_text">
                    iphone 15 Pro is {""}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecraft use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  {/* Mô tả về ưu điểm của titanium: nhẹ và bền, giúp iPhone 15 Pro nhẹ nhất từ trước đến nay */}
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our {""}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up
                  </p>
                </div>
              </div>
              {/* End  */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
