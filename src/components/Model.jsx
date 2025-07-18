import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";
import { useState, useRef, useEffect } from "react";
import { yellowImg } from "../utils";
// Thư viện mô hình 3D Three.js
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  // State lưu kích thước mô hình đang chọn (small/large)
  const [size, setSize] = useState("small");

  // State lưu thông tin mô hình hiện tại (tiêu đề, màu sắc, ảnh)
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // Ref điều khiển camera cho từng chế độ mô hình
  const cameraControlSmall = useRef(); // Camera cho mô hình nhỏ
  const cameraControlLarge = useRef(); // Camera cho mô hình lớn

  // Ref lưu đối tượng mô hình 3D (Three.js Group)
  const small = useRef(new THREE.Group()); // Nhóm đối tượng cho mô hình nhỏ
  const large = useRef(new THREE.Group()); // Nhóm đối tượng cho mô hình lớn

  // State lưu góc xoay của mô hình nhỏ/lớn
  // Đổi tên biến cho đúng chính tả: smallRotation, largeRotation
  const [smallRotation, setSmallRotation] = useState(0); // Góc xoay mô hình nhỏ
  const [largeRotation, setLargeRotation] = useState(0); // Góc xoay mô hình lớn

  const tl = gsap.timeline();

  useEffect(() => {
    // Khi đổi kích thước (small/large), chạy animation chuyển đổi giữa 2 model
    // Sửa tên biến cho đúng: smallRotation, largeRotation
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
    // Nếu muốn animation chạy lại khi đổi model, thêm 'model' vào dependency
  }, [size]);

  // Hiệu ứng xuất hiện tiêu đề bằng GSAP
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        {/* Tiêu đề khu vực mô hình 3D */}
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* ModelView: hiển thị mô hình 3D nhỏ với các props điều khiển */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation} // Sửa tên hàm cho đúng
              item={model}
              size={size}
            />

            {/* ModelView: hiển thị mô hình 3D lớn với các props điều khiển riêng biệt */}
            <ModelView
              index={2} // Thứ tự mô hình (2: mô hình lớn)
              groupRef={large} // Ref nhóm đối tượng 3D cho mô hình lớn
              gsapType="view2" // Loại hiệu ứng GSAP áp dụng cho mô hình lớn
              controlRef={cameraControlLarge} // Ref điều khiển camera cho mô hình lớn
              setRotationState={setLargeRotation} // Sửa tên hàm cho đúng
              item={model} // Thông tin mô hình hiện tại (màu, ảnh, tiêu đề)
              size={size} // Kích thước mô hình hiện tại (small/large)
            />

            {/* Canvas 3D: vùng vẽ mô hình 3D sử dụng react-three-fiber */}
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            {/* Hiển thị tiêu đề mô hình hiện tại */}
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              {/* Danh sách chọn màu sắc mô hình */}
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{
                      backgroundColor: item.color[0],
                    }}
                    onClick={() => setModel(item)}
                  ></li>
                ))}
              </ul>

              {/* Nút chọn kích thước mô hình (small/large) */}
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;

// Ghi chú bổ sung:
// - Khi click đổi màu (li), state 'model' sẽ đổi, ModelView sẽ nhận props mới và tự động re-render.
// - Nếu muốn hiệu ứng chuyển đổi model mượt hơn, có thể thêm 'model' vào dependency của useEffect animation.
// - Đảm bảo ModelView sử dụng đúng props 'item' để render model mới.
