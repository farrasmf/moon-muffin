export default function Polaroid({ imageURL, name }) {
  return (
    <div className="bg-white md:w-[18vw] w-[44vw] md:h-[27vw] h-[70vw] flex flex-col p-[3svw] md:p-[2svh] gap-3">
      <div className="w-full h-full overflow-hidden">
        <img
          src={imageURL}
          alt="polaroid"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-between items-center w-full h-auto ">
        <p className="md:text-[3svh] text-[2svh] ">{name}</p>

        <img
          src="/assets/icons/green-maaf-sign.svg"
          alt="icon"
          className="h-[3svh] md:h-[4svh]"
        />
      </div>
    </div>
  );
}
