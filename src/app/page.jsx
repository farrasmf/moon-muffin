"use client";

import Polaroid from "@/components/Polaroid";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const dummyCarouselData = [
    {
      id: 1,
      name: "Dina",
      image: "/assets/images/dummy-person-1.png",
    },
    {
      id: 2,
      name: "Farras",
      image: "/assets/images/dummy-person-1.png",
    },
    {
      id: 3,
      name: "Reni",
      image: "/assets/images/dummy-person-1.png",
    },
    {
      id: 4,
      name: "Wisnu",
      image: "/assets/images/dummy-person-1.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="w-full relative flex-col flex justify-center items-center py-12 gap-6">
        <h1 className="font-normal text-[#046511] text-9xl text-center">
          NOTHING FANCY, <br /> JUST SINCERE.
        </h1>

        <button
          className="bg-[#92ED00] px-4 py-2 rounded-3xl font-semibold text-[#046511]"
          onClick={() => {
            console.log("pesan sekarang");
          }}
        >
          Pesan Sekarang!
        </button>

        <div className="absolute bottom-20 right-80">
          <img src="/assets/icons/and-muffin-word.svg" alt="icon" />
        </div>
      </div>

      <div className="flex justify-center">
        <Image src={"/assets/images/muffin-placeholder.png"} priority width={1200} height={1000} alt="image" />
      </div>

      {/* Carousel Section Start */}
      <div className="flex-col flex justify-center items-center py-64 gap-10">
        {/* Carousel Description Start */}
        <div className="w-full relative">
          <p className="text-2xl text-center">
            Mereka udah coba, mereka udah kirim, dan mereka udah dapet senyum balasan.
            <br />
            Lihat gimana Moon Muffin bikin momen maaf jadi lebih hangat!
          </p>

          <div className="bg-[#EDF0E7] absolute top-[8%] left-[35%] px-1 py-1">
            <img src="/assets/icons/coba-word.svg" className="" alt="icon" />
          </div>

          <div className="bg-[#EDF0E7] absolute top-[2%] left-[46%] px-1 py-1">
            <img src="/assets/icons/kirim-word.svg" className="" alt="icon" />
          </div>

          <img src="/assets/icons/highlight-marker-1.svg" className="absolute top-[1%] right-[27.5%] w-[13%]" alt="icon" />

          <div className="bg-[#EDF0E7] absolute bottom-[-4%] left-[40%] px-1">
            <img src="/assets/icons/moon-muffin-word.svg" className=" " alt="icon" />
          </div>
        </div>
        {/* Carousel Description End */}
        <div className="w-full h-auto flex justify-center items-center px-36">
          <Swiper
            slidesPerView={3}
            spaceBetween={36}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-fit"
            modules={[Autoplay]}
          >
            {dummyCarouselData.map((item) => (
              <div className="w-fit">
                <SwiperSlide key={item.id}>
                  <Polaroid imageURL={item.image} name={item.name} />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>

        <div className="flex gap-4">
          <button className="bg-transparent border-2 border-[#828A77] px-4 py-2 rounded-3xl font-semibold text-[#046511]">AR Experience</button>

          <button className="bg-[#92ED00] px-4 py-2 rounded-3xl font-semibold text-[#046511]">Pesan Sekarang!</button>
        </div>
      </div>
      {/* Carousel Section End */}

      {/* Descreption Section Start */}
      <div className="flex-col flex justify-center item-center gap-8 mb-32">
        {/* Paragraph 1 Start */}
        <div className="w-full relative">
          <p className="text-5xl text-center leading-tight">
            Moon Muffin bukan hampers fancy atau artsy—ini <br />
            cara sederhana dan tulus buat bilang maaf. Seperti kiriman
            <br /> dari teman, yang mungkin nggak sempurna, tapi
            <br /> niatnya serius.
          </p>

          <div className="bg-[#EDF0E7] absolute top-[-4%] left-[22%] pl-4">
            <img src="/assets/icons/moon-muffin-word.svg" className=" w-64" alt="icon" />
          </div>

          <img src="/assets/icons/highlight-marker-1.svg" className="absolute top-[1%] right-[29%] w-[34%]" alt="icon" />

          <img src="/assets/icons/highlight-marker-2.svg" className="absolute top-[1%] right-[26%] w-[34%]" alt="icon" />

          <div className="bg-[#EDF0E7] absolute top-[29%] right-[34%] pl-1 pr-3 py-1">
            <img src="/assets/icons/maaf-word.svg" className="w-28" alt="icon" />
          </div>

          <img src="/assets/icons/circle-word.svg" className="absolute bottom-[-3%] right-[42%] " alt="icon" />
        </div>
        {/* Paragraph 1 End */}

        {/* Paragraph 2 Start */}
        <div className="w-full relative">
          <p className="text-5xl text-center leading-tight">
            Nggak perlu kata-kata ribet atau gesture besar, cukup <br /> sesuatu yang manis buat nyampein maksud baik.
            <br /> Entah buat teman, keluarga, atau siapa pun yang mau
            <br /> kamu samperin dengan maaf, Moon Muffin ada buat itu
            <br />
            —dengan pilihan rasa vanilla, keju, dan coklat yang
            <br /> siap nemenin permintaan maafmu.
          </p>

          <div className="bg-[#EDF0E7] absolute top-[19%] left-[38%] px-1">
            <img src="/assets/icons/manis-word.svg" className="" alt="icon" />
          </div>

          <img src="/assets/icons/purple-stroke.svg" className="absolute top-[30%] right-[23%]" alt="icon" />

          <div className="bg-[#EDF0E7] absolute bottom-[29%] right-[33%] pl-4">
            <img src="/assets/icons/moon-muffin-word.svg" className=" w-64" alt="icon" />
          </div>

          <img src="/assets/icons/orange-stroke.svg" className="absolute bottom-[13%] right-[27.5%] w-[26%]" alt="icon" />
        </div>
        {/* Paragraph 2 End */}

        {/* Paragraph 3 Start */}
        <div className="w-full relative">
          <p className="text-5xl text-center leading-tight">
            Maafnya serius, muffinnya bercanda—tapi yang
            <br /> penting, pesannya sampai.
          </p>

          <img src="/assets/icons/left-quote-icon.svg" className="absolute top-[-8%] left-[40%] w-[2%] rotate-45" alt="icon" />

          <img src="/assets/icons/right-quote-icon.svg" className="absolute top-[34%] right-[45%] w-[2%] rotate-45" alt="icon" />

          <img src="/assets/icons/orange-maaf-symbol.svg" className="absolute bottom-[0%] right-[29%]" alt="icon" />
        </div>
        {/* Paragraph 3 End */}
      </div>

      <div className="min-w-screen pb-36">
        <img src="/assets/images/muffin-packaging.png" className="w-full h-auto" alt="image" />
      </div>
      {/* Descreption Section End */}

      {/* Order Section */}
      <div className="relative flex-col flex justify-center items-center gap-10">
        <p className="text-8xl text-center">
          Terkadang, kebaikan datang <br /> dalam bentuk uang
        </p>

        <p className="text-5xl text-center">Jadi, siapa yang mau kamu kirimin muffin hari ini?</p>

        <div className="w-full relative flex justify-center items-center">
          <button className="bg-[#92ED00] px-8 py-6 rounded-full text-5xl font-medium text-[#046511]">Pesan Sekarang!</button>

          <img src="/assets/icons/left-quote-icon.svg" className="absolute top-[20%] left-[32%]" alt="icon" />

          <img src="/assets/icons/right-quote-icon.svg" className="absolute top-[20%] right-[32%]" alt="icon" />
        </div>

        <img src="/assets/images/footer-image.png" className="w-full h-auto" alt="image" />
        {/* Absolute Icon Start */}
        <img src="/assets/icons/blue-stroke.svg" className="absolute top-36 right-[27%] w-64" alt="icon" />

        <img src="/assets/icons/muffin-word.svg" className="absolute top-28 right-[18%] w-44" alt="icon" />

        <img src="/assets/icons/bedug-icon.svg" className="absolute bottom-5 left-0" alt="icon" />

        <img src="/assets/icons/ketupat-icon.svg" className="absolute bottom-38 right-0" alt="icon" />
        {/* Absolute Icon End */}
      </div>
      {/* Order Section End */}

      {/* Footer Start */}
      <div className="min-w-full flex justify-between px-8 py-4 bg-[#383C33]">
        <div>
          <img src="/assets/icons/footer-logo.svg" alt="icon" />
        </div>

        <div className="flex gap-4 w-auto items-center">
          <p className="text-white inline-block">Made with love by</p>

          <img src="/assets/icons/c-plus-logo.svg" className="w-38" alt="icon" />
        </div>
      </div>
      {/* Footer End */}
    </div>
  );
}
