import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function ProductsModal({ show, setShow }) {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const [name, setName] = useState("");
  const [ean, setEan] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  if (!show) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("cod_ean", ean); // ✅ alinhado com Entity
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append(
        "category",
        category === "others" && customCategory.trim() !== ""
          ? customCategory
          : category,
      );

      formData.append("expiration_date", expiry);
      if (image) formData.append("image", image);

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar");
      }

      setMessage("✅ Produto cadastrado com sucesso!");

      // limpar campos
      setName("");
      setEan("");
      setDescription("");
      setStock("");
      setCategory("");
      setCustomCategory("");
      setExpiry("");
      setImage(null);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">Cadastro de Produto</h2>
          <button
            onClick={() => setShow(false)}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            <MdClose />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border p-2 rounded-md"
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded-md"
            type="text"
            placeholder="Código de Barras (EAN)"
            value={ean}
            onChange={(e) => setEan(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded-md"
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded-md"
            type="number"
            placeholder="Quantidade em Estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-md bg-white"
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="eletronics">Eletrônicos</option>
            <option value="food">Alimentos</option>
            <option value="clothing">Vestuário</option>
            <option value="cosmetics">Cosméticos</option>
            <option value="others">Outros</option>
          </select>

          {category === "others" && (
            <input
              className="border p-2 rounded-md border-emerald-400 bg-emerald-50"
              type="text"
              placeholder="Informe a categoria"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
              autoFocus
            />
          )}

          <input
            className="border p-2 rounded-md"
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 transition-colors"
          >
            Cadastrar Produto
          </button>
        </form>

        {message && <p className="text-center font-medium">{message}</p>}
      </div>
    </div>
  );
}
