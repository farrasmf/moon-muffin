export default function Polaroid({ imageURL, name }) {
  return (
    <div className="bg-white w-full sm:w-[360px] h-[434px] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3">
      <div className="w-full h-full overflow-hidden">
        <img src={imageURL} alt="polaroid" className="object-cover w-full h-full" />
      </div>
      <div className="flex justify-between items-center w-full h-auto">
        <p className="text-lg sm:text-xl font-otherHand text-green-700">{name}</p>

        <img src="/assets/icons/green-maaf-sign.svg" alt="icon" className="w-6 h-6 sm:w-auto sm:h-auto" />
      </div>
    </div>
  );
}
