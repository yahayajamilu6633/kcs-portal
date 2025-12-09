"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import autoplay module
import { Autoplay } from "swiper/modules";

export default function SchoolTour() {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="page-container">
      <h1>School Tour</h1>
      <p>
        Welcome to our virtual school tour! Explore our environment, classrooms,
        laboratories, playground, and all the facilities that make our school a
        great place for learning and personal growth.
      </p>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.9)",
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <img src={previewImage} className="img-fluid rounded" alt="Preview" />
          </div>
        </div>
      )}

      <section className="section container my-5">
        <h2 className="mb-4 text-dark text-uppercase fw-bold">Learning Facilities</h2>

        {/* ---------- FACILITY 1 ---------- */}
        <h4 className="mb-2">Science & ICT Laboratories</h4>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.3}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {[
            "/images/PATO.jpg",
            "/images/lab.jpg",
            "/images/lab2.jpg",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setPreviewImage(img)}
                alt="Science & ICT"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2">
          Fully equipped science and ICT labs to enhance hands-on learning and digital skills.
        </p>

        {/* ---------- FACILITY 2 ---------- */}
        <h4 className="mt-5 mb-2">Modern Library</h4>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.3}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {[
            "/images/lib.jpg",
            "/images/lib2.jpg",
            "/images/lib3.jpg",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setPreviewImage(img)}
                alt="Library"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2">
          A serene and resource-rich library designed to support academic excellence.
        </p>

        {/* ---------- FACILITY 3 ---------- */}
        <h4 className="mt-5 mb-2">Art & Music Studios</h4>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.3}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {[
            "/images/art1.jpg",
            "/images/art2.jpg",
            "/images/music1.jpg",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setPreviewImage(img)}
                alt="Art studio"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2">
          Creative spaces for art, painting, musical instruments, and performance learning.
        </p>

        {/* ---------- FACILITY 4 ---------- */}
        <h4 className="mt-5 mb-2">Sports Center</h4>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.3}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {[
            "/images/sports1.jpg",
            "/images/sports2.jpg",
            "/images/sports3.jpg",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setPreviewImage(img)}
                alt="Sports area"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2">
          A well-structured sports arena for indoor and outdoor games to build teamwork and fitness.
        </p>
      </section>
    </div>
  );
}
