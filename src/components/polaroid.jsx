export default function Polaroid({ imageURL, name }) {
    return (
        <div className="bg-white w-[360px] h-[434px] flex flex-col p-4 gap-3">
            <div className="w-full h-full overflow-hidden">
                <img
                    src={imageURL}
                    alt="polaroid"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex justify-between items-center w-full h-auto">
                <p className="text-xl">
                    {name}
                </p>

                <img
                    src="/assets/icons/green-maaf-sign.svg"
                    alt="icon"
                />
            </div>
        </div>
    )
}