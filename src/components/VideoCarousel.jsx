import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  // Tạo ref để truy cập trực tiếp các thẻ video, span, div trong DOM
  const videoRef = useRef([]); // Lưu ref của từng video
  const videoSpanRef = useRef([]); // Lưu ref của từng span (progress indicator)
  const videoDivRef = useRef([]); // Lưu ref của từng div (vòng tròn chuyển trang)

  // State quản lý trạng thái của carousel
  const [video, setVideo] = useState({
    isEnd: false, // Đã phát hết video chưa
    startPlay: false, // Đã bắt đầu phát video chưa
    videoId: 0, // Id video hiện tại
    isLastVideo: false, // Có phải video cuối cùng không
    isPlaying: false, // Video hiện tại có đang phát không
  });

  const [loadedData, setLoadedData] = useState([]); // Lưu trạng thái đã load dữ liệu video

  // Destructure state để dùng cho tiện
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  // Sử dụng GSAP để tạo hiệu ứng khi video xuất hiện trên màn hình
  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video", // Kích hoạt hiệu ứng khi phần tử #video xuất hiện trong viewport
        toggleActions: "restart none none none", // Khi scroll tới sẽ restart animation
      },
      onComplete: () => {
        // Khi hiệu ứng hoàn thành thì cập nhật state để bắt đầu phát video
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Theo dõi khi trạng thái video hoặc dữ liệu thay đổi để play/pause video tương ứng
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause(); // Nếu không phát thì dừng video
      } else {
        startPlay && videoRef.current[videoId].play(); // Nếu phát thì play video
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Khi video load xong metadata thì lưu lại vào loadedData
  const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e]);

  // Tạo hiệu ứng chuyển động cho progress indicator khi chuyển video
  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate tiến trình của video (có thể mở rộng thêm hiệu ứng ở đây)
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {}, // Có thể thêm hiệu ứng cập nhật tiến trình ở đây
        onComplete: () => {}, // Callback khi hiệu ứng hoàn thành
      });
    }
  }, [videoId, startPlay]);

  // Hàm xử lý các sự kiện điều khiển video (kết thúc, phát lại, chuyển video, play/pause)
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 })); // Khi video kết thúc thì chuyển sang video tiếp theo
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true })); // Đánh dấu là video cuối cùng
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 })); // Reset về video đầu tiên
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying })); // Chuyển đổi trạng thái play/pause
        break;
      default:
        return video;
    }
  };

  return (
    <>
      {/* Vùng chứa các video và text */}
      <div className="flex items-center">
        {/* Duyệt qua từng slide video */}
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              {/* Video */}
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => {
                    videoRef.current[i] = el; // Gán ref cho từng video
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true, // Đánh dấu video đang phát
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)} // Khi video load xong metadata thì lưu lại
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              {/* End Video */}

              {/* Text mô tả cho từng video */}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
              {/* End Text */}
            </div>
          </div>
        ))}
      </div>

      {/* UI chuyển trang giữa các video */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {/* Tạo các chấm tròn chuyển trang, mỗi chấm ứng với 1 video */}
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)} // Gán ref cho từng chấm tròn
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)} // Gán ref cho progress indicator
              ></span>
            </span>
          ))}
        </div>

        {/* Nút điều khiển play/pause/replay */}
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={!isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset") // Nếu là video cuối thì replay
                : !isPlaying
                ? () => handleProcess("play") // Nếu đang pause thì play
                : () => handleProcess("pause") // Nếu đang play thì pause
            }
          />
        </button>
      </div>
      {/* End UI chuyển trang*/}
    </>
  );
};

export default VideoCarousel;
