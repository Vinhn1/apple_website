import { Html } from "@react-three/drei";
import React from "react";

// Component Loader dùng để hiển thị trạng thái loading khi mô hình 3D đang được tải
const Loader = () => {
  return (
    // Sử dụng Html để render nội dung HTML lên canvas 3D
    <Html>
      {/*
        Lớp phủ toàn bộ canvas, căn giữa nội dung loading
        Có thể thay đổi style hoặc thêm hiệu ứng loading khác nếu muốn
      */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        {/* Vòng tròn loading, có thể thay bằng spinner động */}
        <div className="w-[10vw] h-[10vw] rounded-full">Loading...</div>
      </div>
    </Html>
  );
};

export default Loader;
