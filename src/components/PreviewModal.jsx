import Message from "@/components/Message";

export default function PreviewModal({ isOpen, onClose, imageURL, name, message, signature }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-4">
        <button onClick={onClose} className="absolute -right-4 -top-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative flex flex-col sm:flex-row justify-center">
          <div className="relative z-10 transform -rotate-6">
            <div className="bg-white w-full sm:w-[360px] h-[300px] sm:h-[434px] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3">
              <div className="w-full h-full overflow-hidden">
                <img src={imageURL} alt="polaroid" className="object-cover w-full h-full" />
              </div>
              <div className="flex justify-between items-center w-full h-auto">
                <p className="text-base sm:text-xl font-otherHand text-green-700">{name}</p>
                <img src="/assets/icons/green-maaf-sign.svg" alt="icon" className="w-5 h-5 sm:w-auto sm:h-auto" />
              </div>
            </div>
          </div>
          <div className="relative z-10 transform rotate-6 -mt-8 sm:-mt-12">
            <Message message={message} signature={signature} />
          </div>
        </div>
      </div>
    </div>
  );
}
