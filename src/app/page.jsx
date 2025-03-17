"use client";

import Polaroid from "@/components/polaroid";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

export default function Home() {
  const dummyCarouselData = [
    {
      id: 1,
      name: "Cintya",
      image: "/assets/images/dummy-person-1.png",
    },
    {
      id: 2,
      name: "Anjani",
      image: "/assets/images/dummy-person-2.png",
    },
    {
      id: 3,
      name: "Jordan",
      image: "/assets/images/dummy-person-3.png",
    },
    {
      id: 4,
      name: "Wisnu",
      image: "/assets/images/dummy-person-4.png",
    },
    {
      id: 5,
      name: "Donny",
      image: "/assets/images/dummy-person-5.png",
    },
  ];

  return (
    <div className="min-h-screen min-w-[100vw] bg-[#EDF0E7] pt-[15svh]">
      <div className="w-full relative flex-col flex justify-center items-center py-12 gap-6">
        <h1 className="font-normal text-[#046511] md:text-[11svh] text-[9svw] text-center leading-none">
          NOTHING FANCY, <br /> JUST{" "}
          <span className="relative">
            SINCERE
            <div className="absolute -right-[25%] -bottom-[6svw] md:-bottom-10">
              <img
                src="/assets/icons/and-muffin-word.svg"
                alt="icon"
                className="h-[10svw] md:h-[11svh]"
              />
            </div>
          </span>
          .
        </h1>

        {/* <button
          className="bg-[#92ED00] px-4 py-2 rounded-3xl font-semibold text-[#046511]"
          onClick={() => {
            console.log("pesan sekarang");
          }}
        >
          Pesan Sekarang!
        </button> */}
      </div>

      <div className="flex justify-center">
        <Image
          src={"/assets/images/muffin-placeholder.png"}
          priority
          width={1200}
          height={1000}
          alt="image"
        />
      </div>

      {/* Carousel Section Start */}
      <div className="flex-col flex justify-center items-center md:mt-[14svh] mt-[7svh] gap-10">
        {/* Carousel Description Start */}
        <div className="w-full relative flex flex-col justify-center items-center ">
          <p className="md:text-[3svh] text-[2.4svh]  w-[80%] max-w-[900px] text-center flex justify-center items-center flex-wrap">
            <span>Mereka</span> <span>udah</span>{" "}
            <span className="bg-[#EDF0E7]  pl-[1.1svh]">
              <img
                src="/assets/icons/coba-word.svg"
                className="md:h-[3svh] h-[2.2svh]"
                alt="icon"
              />
            </span>
            , <span>mereka</span> <span>udah</span>{" "}
            <span className="bg-[#EDF0E7] px-[1.1svh]">
              <img
                src="/assets/icons/kirim-word.svg"
                className="md:h-[3svh] h-[2.2svh]"
                alt="icon"
              />
            </span>
            <span>dan</span> <span>mereka</span> <span>udah</span>{" "}
            <span>dapet</span>{" "}
            <span className="relative ml-[1.1svh]">
              {" "}
              <img
                src="/assets/icons/highlight-marker-1.svg"
                className="absolute top-[33%] left-0 w-full"
                alt="icon"
              />
              <span>senyum</span> <span>balasan</span>.
            </span>
            <span>Lihat</span> <span>gimana</span>{" "}
            <span className="bg-[#EDF0E7] px-[1.1svh]">
              <img
                src="/assets/icons/moon-muffin-word.svg"
                className="md:h-[6svh] h-[4svh]"
                alt="icon"
              />
            </span>{" "}
            <span>bikin</span> <span>momen</span> <span>maaf</span>{" "}
            <span>jadi</span> <span>lebih</span> <span>hangat!</span>
          </p>
        </div>
        {/* Carousel Description End */}
        <div className="hidden md:flex w-screen h-auto justify-center items-center ">
          <Swiper
            slidesPerView={5}
            spaceBetween={36}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // className="w-fit p-0 "
            modules={[Autoplay]}
          >
            {dummyCarouselData.map((item) => (
              <SwiperSlide key={item.id} className="w-screen cursor-pointer">
                <div
                  className=" p-[3svh]"
                  style={{
                    transform: `rotate(${
                      Math.floor(Math.random() * 11) - 5
                    }deg)`,
                  }}
                >
                  <Polaroid imageURL={item.image} name={item.name} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex md:hidden w-screen h-auto justify-center items-center ">
          <Swiper
            slidesPerView={2}
            spaceBetween={0}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // className="w-fit p-0 "
            modules={[Autoplay]}
          >
            {dummyCarouselData.map((item) => (
              <SwiperSlide key={item.id} className="w-screen cursor-pointer">
                <div
                  className=" p-[3svh]"
                  style={{
                    transform: `rotate(${
                      Math.floor(Math.random() * 11) - 5
                    }deg)`,
                  }}
                >
                  <Polaroid imageURL={item.image} name={item.name} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <Link href="https://link.byc.plus/moonmuffin-ar">
            <button className="text-[2svh] md:text-[2.2svh] flex items-center gap-2  bg-[#EDF0E7] border-2 border-[#828A77] px-4 py-2 rounded-full font-medium text-[#046511]">
              Lihat Video Lainnya{" "}
            </button>
          </Link>

          <Link href={"/create-order"}>
            {" "}
            <button className="text-[2svh] md:text-[2.2svh] bg-[#92ED00] flex items-center gap-1 px-4 py-2 rounded-full font-medium text-[#046511]">
              Pesan Sekarang!
              <svg
                className="h-[3svh]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                  fill="#046511"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      {/* Carousel Section End */}

      {/* Descreption Section Start */}
      <div className="flex-col flex justify-center item-center gap-8 md:my-[18svh] my-[10svh]">
        {/* Paragraph 1 Start */}
        <div className="w-full relative flex flex-row justify-center items-center">
          <p className="md:text-[4svh] text-[2.8svh] w-[80%] max-w-[900px] text-center flex justify-center items-center flex-wrap">
            <span className="bg-[#EDF0E7] ">
              <img
                src="/assets/icons/moon-muffin-word.svg"
                className="md:h-[7svh] h-[5svh]"
                alt="icon"
              />
            </span>{" "}
            <span className="relative ml-[1.1svh]">
              {" "}
              <img
                src="/assets/icons/highlight-marker-1.svg"
                className="absolute left-0 w-full md:h-[7svh] h-[5svh]"
                alt="icon"
              />
              <span>bukan</span> <span>hampers</span> <span>fancy</span>{" "}
              <span>atau</span> <span>artsy</span>—<span>ini</span>{" "}
              <span>cara</span>
              <span>sederhana</span>
            </span>{" "}
            <span>dan</span> <span>tulus</span> <span>buat</span>{" "}
            <span>bilang</span>
            <span className="bg-[#EDF0E7] mx-[1.1svh]">
              <img
                src="/assets/icons/maaf-word.svg"
                className="md:h-[3.3svh] h-[2.4svh]"
                alt="icon"
              />
            </span>{" "}
            <span>Seperti</span> <span>kiriman</span> <span>dari</span>{" "}
            <span>teman,</span> <span>yang</span> <span>mungkin</span>{" "}
            <span>nggak</span> <span>sempurna,</span> <span>tapi</span>
            <span className="relative ml-[1.2svh]">
              {" "}
              <img
                src="/assets/icons/circle-word.svg"
                className="absolute top-0 scale-110 "
                alt="icon"
              />{" "}
              <span>niatnya</span> <span>serius.</span>
            </span>
          </p>
        </div>
        {/* Paragraph 1 End */}
        {/* Paragraph 2 Start */}
        <div className="w-full relative flex flex-row justify-center items-center">
          <p className="md:text-[4svh] text-[2.8svh] w-[80%] max-w-[900px] text-center flex justify-center items-center flex-wrap">
            <span>Nggak</span> <span>perlu</span> <span>kata-kata</span>{" "}
            <span>ribet</span> <span>atau</span> <span>gesture</span>{" "}
            <span>besar,</span> <span>cukup</span> <span>sesuatu</span>{" "}
            <span>yang</span>
            <span className="bg-[#EDF0E7]  px-1">
              <img
                src="/assets/icons/manis-word.svg"
                className="md:h-[3.3svh] h-[2.4svh]"
                alt="icon"
              />
            </span>
            <span>buat</span> <span>nyampein</span>{" "}
            <span className="relative">
              <span>maksud</span> <span>baik.</span>
              <img
                src="/assets/icons/purple-stroke.svg"
                className="absolute bottom-0 left-0 w-full"
                alt="icon"
              />
            </span>
            <span>Entah</span> <span>buat</span> <span>teman,</span>{" "}
            <span>keluarga,</span> <span>atau</span> <span>siapa</span>{" "}
            <span>pun</span> <span>yang</span> <span>mau</span>{" "}
            <span>kamu</span> <span>samperin</span>
            <span>dengan</span> <span>maaf,</span>{" "}
            <span className="bg-[#EDF0E7] ">
              <img
                src="/assets/icons/moon-muffin-word.svg"
                className="md:h-[7svh] h-[5svh]"
                alt="icon"
              />
            </span>{" "}
            <span>ada</span> <span>buat</span> <span>itu</span> <span>—</span>{" "}
            <span>dengan</span> <span>pilihan</span>{" "}
            <span className="relative">
              <span>rasa</span> <span>istimewa</span>
              <img
                src="/assets/icons/orange-stroke.svg"
                className="absolute -bottom-1 left-0 w-full"
                alt="icon"
              />
            </span>{" "}
            <span>yang</span> <span>siap</span> <span>nemenin</span>{" "}
            <span>permintaan</span> <span>maafmu.</span>
          </p>
        </div>
        {/* Paragraph 2 End */}
        {/* Paragraph 3 Start */}{" "}
        <div className="w-full relative flex flex-row justify-center items-center">
          <p className="md:text-[4svh] text-[2.8svh] w-[80%] max-w-[900px] text-center flex justify-center items-center flex-wrap">
            <span>Maafnya</span> <span>tulus,</span>{" "}
            <span className="relative ml-[1.1svh] mr-[2svh]">
              <img
                src="/assets/icons/left-quote-icon.svg"
                className="absolute top-0 -left-[2svh] h-[2svh] rotate-45"
                alt="icon"
              />
              <span>muffinnya</span>
              <img
                src="/assets/icons/right-quote-icon.svg"
                className="absolute -bottom-[.2svh] -right-[2svh] h-[2svh] rotate-45"
                alt="icon"
              />
            </span>{" "}
            <span>juga</span> <span>serius</span> <span>—</span>{" "}
            <span>semoga</span> <span>hangatnya</span> <span>sampai</span>{" "}
            <span>di</span> <span>hati.</span>
            <span>
              <img
                src="/assets/icons/orange-maaf-symbol.svg"
                className="h-[5svh]"
                alt="icon"
              />
            </span>
          </p>
        </div>
        {/* Paragraph 3 End */}
      </div>

      <div className="min-w-screen px-[10svw]">
        <div className="w-full relative flex justify-center items-center overflow-hidden rounded-3xl">
          <img
            src="/assets/images/ar-illustration.png"
            className="w-full h-auto"
            alt="image"
          />
        </div>
      </div>
      {/* Descreption Section End */}
      <div className="flex flex-col justify-center items-center gap-4 md:px-[8svh] px-[8svw] md:pt-[20svh] pt-[10svh]">
        <div className="md:text-[5svh] text-[3svh]">
          Begini cara cobain AR-nya!
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div
            className="md:w-[25svw] w-[60svw] max-w-[40svh] max-h-[40svh] md:h-[25svw] h-[60svw]"
            style={{
              transform: `rotate(${Math.floor(Math.random() * 11) - 5}deg)`,
            }}
          >
            {" "}
            <img src="/assets/images/ar-step-1.png" className="w-full h-full" />
          </div>
          <div
            className="md:w-[25svw] w-[60svw] max-w-[40svh] max-h-[40svh] md:h-[25svw] h-[60svw]"
            style={{
              transform: `rotate(${Math.floor(Math.random() * 11) - 5}deg)`,
            }}
          >
            <img src="/assets/images/ar-step-2.png" className="w-full h-full" />
          </div>
          <div
            className="md:w-[25svw] w-[60svw] max-w-[40svh] max-h-[40svh] md:h-[25svw] h-[60svw]"
            style={{
              transform: `rotate(${Math.floor(Math.random() * 11) - 5}deg)`,
            }}
          >
            <img src="/assets/images/ar-step-3.png" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="relative flex-col flex justify-center items-center md:px-[8svh] px-[5svw] md:pt-[24svh] pt-[10svh] ">
        <p className="md:text-[8svh] text-[3.3svh] text-center w-[90%] max-w-[800px]">
          <span>Terkadang,</span> <span>kebaikan</span> <span>datang</span>{" "}
          <span>dalam</span> <span>bentuk</span>{" "}
          <span className="relative w-fit hidden md:inline-block mr-[7svh]">
            {" "}
            <img
              src="/assets/icons/blue-stroke.svg"
              className="absolute top-[10%] left-0 md:h-[10svh] h-auto w-full"
              alt="icon"
            />{" "}
            uang
            <img
              src="/assets/icons/muffin-word.svg"
              className="absolute -top-[2svh] md:-top-[3svh] -right-[8svh] md:-right-[18svh] md:h-[10svh] h-[5svh]"
              alt="icon"
            />
          </span>
          <div className="relative mr-[7svh] md:hidden">
            <span className="relative">
              {" "}
              <img
                src="/assets/icons/blue-stroke.svg"
                className="absolute top-[33%] left-0 md:h-[10svh] h-auto w-full"
                alt="icon"
              />{" "}
              uang
              <img
                src="/assets/icons/muffin-word.svg"
                className="absolute -top-[2svh] md:-top-[3svh] -right-[8svh] md:-right-[18svh] md:h-[10svh] h-[5svh]"
                alt="icon"
              />
            </span>{" "}
          </div>
        </p>
        <p className="md:text-[4svh] text-[2.4svh] text-center">
          Jadi, siapa yang mau kamu kirimin muffin hari ini?
        </p>
        <div className="w-full relative flex justify-center items-center mt-[5svh]">
          <img
            src="/assets/icons/left-quote-icon.svg"
            alt="icon"
            className="md:h-[6svh] h-[4svh] mr-[1svh]"
          />
          <Link href={"/create-order"}>
            <button className="bg-[#92ED00] md:px-[4svh] px-[6svw] py-[1.5svh] rounded-full md:text-[4svh] text-[2.4svh] font-medium text-[#046511]">
              Pesan Sekarang!
            </button>
          </Link>

          <img
            src="/assets/icons/right-quote-icon.svg"
            alt="icon"
            className="md:h-[6svh] h-[4svh] ml-[1svh]"
          />
        </div>
        <div className="md:mt-[10svh] mt-[20svh] w-screen md:h-auto h-[40svw]">
          <img
            src="/assets/images/footer-image.png"
            className="w-full h-full object-cover"
            alt="image"
          />
        </div>
        {/* Absolute Icon Start */}
        <img
          src="/assets/icons/bedug-icon.svg"
          className="absolute md:bottom-[8svh] bottom-[2svh] h-[40svh] md:h-[65svh] left-0"
          alt="icon"
        />
        <img
          src="/assets/icons/ketupat-icon.svg"
          className="absolute md:bottom-[17svh] bottom-[8svh] h-[30svh] md:h-[50svh] right-0 "
          alt="icon"
        />{" "}
        {/* Absolute Icon End */}
      </div>
      {/* Order Section End */}

      {/* Footer Start */}
      <div className="min-w-full flex flex-col md:flex-row py-[3svh] md:pb-[3svh] items-center md:justify-between px-[5svw]  bg-[#383C33]">
        <div>
          <img
            src="/assets/icons/footer-logo.svg"
            alt="icon"
            className="h-[7svh]"
          />
        </div>

        <div className="flex gap-4 w-auto items-center flex-col md:flex-row mt-[4svh] md:mt-0">
          <p className="text-white inline-block text-[2svh] md:text-[2.2svh]">
            Made with love by
          </p>

          <img
            src="/assets/icons/c-plus-logo.svg"
            className="w-38"
            alt="icon"
          />
        </div>
      </div>
      {/* Footer End */}
    </div>
  );
}
