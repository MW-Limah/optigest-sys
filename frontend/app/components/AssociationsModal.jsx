import { MdClose } from "react-icons/md";
import Image from "next/image";

export default function AssociationsModal({ show, setShow, product }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-[500px] border-2 border-[#ddd]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Associar Fornecedor</h2>
          <button
            onClick={() => setShow(false)}
            className="text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        <form className="flex flex-col gap-3">
          <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="w-16 h-16 relative rounded overflow-hidden border">
              <Image
                src={product.image || "/bege.jpg"}
                fill
                className="object-cover"
                alt="Produto"
              />
            </div>
            <div>
              <p className="font-bold text-sm">{product.name}</p>
              <p className="text-xs text-gray-500">{product.barcode}</p>
            </div>
          </div>

          <label className="text-sm font-medium mt-2">
            Selecione o Fornecedor
          </label>
          <select className="border p-2 rounded-md border-[#ccc] bg-white">
            <option value="1">Tech Master</option>
            <option value="2">Tech Distribuidora</option>
            <option value="3">Import Express</option>
            <option value="4">CoffeQL</option>
          </select>

          <button
            type="submit"
            className="bg-emerald-500 text-white font-bold py-3 rounded-xl mt-4 hover:bg-emerald-600 transition-colors"
          >
            Adicionar Associação
          </button>
        </form>
      </div>
    </div>
  );
}
