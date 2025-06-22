import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  // State lưu đường dẫn video phù hợp với kích thước màn hình
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo // Nếu màn hình nhỏ hơn 760px thì dùng video nhỏ, ngược lại dùng video lớn
  );

  // Hàm cập nhật videoSrc khi thay đổi kích thước cửa sổ
  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo); // Nếu nhỏ hơn 760px thì dùng video nhỏ
    } else {
      setVideoSrc(heroVideo); // Ngược lại dùng video lớn
    }
  };

  // Lắng nghe sự kiện resize để cập nhật videoSrc khi thay đổi kích thước cửa sổ
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  // Chạy hiệu ứng xuất hiện mượt mà cho tiêu đề bằng GSAP khi component mount
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 }); // Làm mờ dần tiêu đề sau 1.5s

    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    // Section hero với nền đen, căn giữa nội dung
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        {/* Tiêu đề iPhone 15 Pro với hiệu ứng */}
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>

        {/* Video hero, tự động phát, tắt tiếng, không cho thao tác chuột */}
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
