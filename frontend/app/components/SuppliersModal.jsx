import { MdClose } from "react-icons/md";

export default function SuppliersModal({ show, setShow }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] h-[600px] border-2 border-[#ddd]">
        <button
          onClick={() => {
            setShow(false);
          }}
          className="self-end text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <MdClose />
        </button>
        <form className="flex flex-col gap-4">
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o nome da empresa"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="00.000.000/0000-00"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o endereço completo da empresa"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="tel"
            placeholder="(00) 00000-0000"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="email"
            placeholder="exemplo@fornecedor.com"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Contato Principal"
          />
        </form>
        <button
          className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 transition-colors cursor-pointer"
          type="submit"
        >
          Cadastrar Fornecedor
        </button>
        {/* Renderizar mensagem de erro/sucesso dinamicamente */}
        <p>Erro: teste</p>
      </div>
    </div>
  );
}
