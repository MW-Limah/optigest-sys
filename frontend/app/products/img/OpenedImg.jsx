import Image from "next/image";

export default function OpenedImage({ srcImage, onClose }) {
  if (!srcImage) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm " onClick={onClose}>
      <div className="relative w-[90%] h-[80%] max-w-4xl">
        <Image src={srcImage} alt="Imagem aberta" fill className="object-contain" />
        <button className="absolute -top-10 right-0 text-white text-xl font-bold cursor-pointer" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
