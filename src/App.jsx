import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";

import * as Sentry from "@sentry/react";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main className="bg-black text-white">
      {/* Navbar: thanh menu điều hướng */}
      <Navbar />
      {/* Hero: khu vực video hero và tiêu đề */}
      <Hero />
      {/* Highlights: các điểm nổi bật của sản phẩm */}
      <Highlights />

      {/* Model: hiển thị mô hình tiêu đề và khung 3D sản phẩm */}
      <Model />

      <Features />

      <HowItWorks />

      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
