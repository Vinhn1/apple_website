import { PerspectiveCamera, View } from "@react-three/drei";
import { Suspense } from "react";
import Lights from "./Lights";
import IPhone from "./IPhone";
import Loader from "./Loader";

// Component ModelView dùng để hiển thị một view 3D riêng biệt trong Canvas
// Nhận các props để điều khiển vị trí, hiệu ứng, ref, kích thước, dữ liệu mô hình
const ModelView = ({
  index, // Thứ tự view (1: nhỏ, 2: lớn)
  groupRef, // Ref nhóm đối tượng 3D
  gsapType, // Loại hiệu ứng GSAP áp dụng cho view
  controlRef, // Ref điều khiển camera
  setRotationSize, // Hàm cập nhật góc xoay
  size, // Kích thước mô hình (small/large)
  item, // Dữ liệu mô hình (màu, ảnh, tiêu đề)
}) => {
  return (
    // View là vùng 3D riêng biệt trong Canvas, có thể áp dụng hiệu ứng chuyển động, vị trí, v.v.
    <View
      index={index} // Thứ tự view (1: nhỏ, 2: lớn)
      id={gsapType} // Id để áp dụng hiệu ứng GSAP
      className={`w-full h-full ${
        index === 2 ? "right-[-100%]" : ""
      }`}
    >
      {/*
        Sử dụng View của @react-three/drei để render một vùng 3D riêng biệt.
        Nếu index === 2 thì dịch sang phải 100% (ẩn khỏi màn hình), ngược lại giữ nguyên vị trí.
      */}

      {/* Đèn môi trường giúp mô hình sáng đều hơn */}
      <ambientLight intensity={0.3} />

      {/* Camera phối cảnh, đặt vị trí mặc định cho góc nhìn 3D */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Đèn chiếu sáng bổ sung cho mô hình */}
      <Lights />

      {/* Suspense dùng để tải mô hình 3D bất đồng bộ, Loader là fallback khi đang loading */}
      <Suspense fallback={<Loader />}>
        <IPhone /> {/* Hiển thị mô hình iPhone 3D */}
      </Suspense>
      
    </View>
  );
};

export default ModelView;
