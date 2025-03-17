export default function Message({ message, signature }) {
  return (
    <div className="w-full sm:w-[360px] h-[434px] flex flex-col relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img src="/assets/images/background-message.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="flex-1 overflow-hidden rounded-lg p-6">
          <p className="text-lg sm:text-xl font-otherHand text-green-700 leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center w-full h-auto mt-3">
          {signature ? (
            <div className="w-48 h-16 flex items-center">
              <img src={signature} alt="Tanda Tangan" className="w-full h-full object-contain" />
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-otherHand text-green-700">Tanda Tangan</p>
          )}
        </div>
      </div>
    </div>
  );
}
