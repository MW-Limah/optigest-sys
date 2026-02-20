import { useState } from "react";
import { MdClose } from "react-icons/md";

/* Passe parametros props como objeto */
export default function ProductsModal({ show, setShow }) {
  const [category, setCategory] = useState("");

  // 1. Implementando método POST pelo Frontend, Estados para campo
  const [formData, setFormData] = useState({
    name: "",
    cod_bar: "",
    description: "",
    quantity: "",
    category: "",
    expiration_date: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!show) return null;

  // 2. Função para enviar dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Produto cadastrado com sucesso!");
        setTimeout(() => setShow(false), 2000); // fecha modal após sucesso
      } else {
        setMessage(`Erro: ${data.error}`);
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Helper para atualizar o objeto de estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] h-auto border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">Cadastro de Produto</h2>
          <button
            onClick={() => {
              setShow(false);
            }}
            className="self-end text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Submit */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o Nome do Produto"
            required
          />
          <input
            name="cod_bar"
            onChange={handleChange}
            type="number"
            placeholder="Insira o Código de Barras"
            className="border p-2 rounded-md border-[#ccc]"
            required
          />
          <input
            name="description"
            onChange={handleChange}
            maxLength={100}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Descreva brevemente o produto"
          />
          <input
            name="quantity"
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="number"
            placeholder="Quantidade em Estoque"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-md border-[#ccc] bg-white"
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="eletronics">Eletrônicos</option>
            <option value="food">Alimentos</option>
            <option value="others">Outros</option>
          </select>

          <input
            name="expiration_date"
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="date"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Enviando..." : "Cadastrar Produto"}
          </button>
        </form>

        {/* Renderizar mensagem de erro/sucesso dinamicamente */}
        {message && (
          <p
            className={`text-center mt-2 ${message.includes("Erro") ? "text-red-500" : "text-emerald-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
