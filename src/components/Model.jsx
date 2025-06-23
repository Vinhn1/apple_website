import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";
import { useState, useRef } from "react";
import { yellowImg } from "../utils";
// Thư viện mô hình 3D Three.js
import * as THREE from "three";

const Model = () => {
  // State lưu kích thước mô hình đang chọn (small/large)
  const [size, setSize] = useState('small');

  // State lưu thông tin mô hình hiện tại (tiêu đề, màu sắc, ảnh)
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg, 
  })

  // Ref điều khiển camera cho từng chế độ mô hình
  const cameraControlSmall = useRef(); // Camera cho mô hình nhỏ
  const cameraControlLarge = useRef(); // Camera cho mô hình lớn

  // Ref lưu đối tượng mô hình 3D (Three.js Group)
  const small = useRef(new THREE.Group()); // Nhóm đối tượng cho mô hình nhỏ
  const large = useRef(new THREE.Group()); // Nhóm đối tượng cho mô hình lớn

  // State lưu góc xoay của mô hình nhỏ
  const [smallRoration, setSmallRoration] = useState(0);

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
                {/* View Mô hình 3D: hiển thị mô hình sản phẩm có thể xoay, phóng to, thu nhỏ */}
                <ModelView/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
