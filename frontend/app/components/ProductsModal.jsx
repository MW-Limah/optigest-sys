"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function ProductsModal({ show, setShow, onProductAdded, editingProduct, setEditingProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    cod_bar: "",
    description: "",
    quantity: "",
    category: "",
    other_category: "",
    expiration_date: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Carregar dados ao editar
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        cod_bar: editingProduct.cod_bar || "",
        description: editingProduct.description || "",
        quantity: editingProduct.quantity || "",
        category: editingProduct.category || "",
        other_category: editingProduct.other_category || "",
        expiration_date: editingProduct.expiration_date || "",
        image: editingProduct.image || "",
      });
    } else {
      setFormData({
        name: "",
        cod_bar: "",
        description: "",
        quantity: "",
        category: "",
        other_category: "",
        expiration_date: "",
        image: "",
      });
    }
  }, [editingProduct, show]);

  if (!show) return null;

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const isEditing = !!editingProduct;

    // ✅ Payload corrigido
    const payload = {
      ...formData,
      category: formData.category === "others" ? formData.other_category : formData.category,
    };

    const url = isEditing ? `http://localhost:3001/products/${editingProduct.id}` : `http://localhost:3001/products`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ agora usa payload
      });

      if (response.ok) {
        setMessage(isEditing ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!");

        onProductAdded();
        handleClose();
      } else {
        const data = await response.json();
        setMessage(`Erro: ${data.message || data.error}`);
      }
    } catch (error) {
      console.error("Erro na operação:", error);
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fechar modal
  const handleClose = () => {
    setEditingProduct(null);
    setShow(false);
  };

  // ✅ HandleChange com limpeza inteligente
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 👇 Se mudar categoria e NÃO for others → limpa other_category
    if (name === "category" && value !== "others") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        other_category: "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="fixed flex flex-col gap-4 top-1/2 left-1/2 
                      -translate-x-1/2 -translate-y-1/2 bg-white 
                      p-8 rounded-xl shadow-lg w-[600px] border-2 border-[#ddd]"
      >
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">{editingProduct ? "Editar Produto" : "Cadastrar novo Produto"}</h2>

          <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800 transition-colors">
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="text" placeholder="Insira o Nome do Produto" required />

          <input name="cod_bar" value={formData.cod_bar} onChange={handleChange} type="number" placeholder="Insira o Código de Barras" className="border p-2 rounded-md border-[#ccc]" required />

          <input name="description" value={formData.description} onChange={handleChange} maxLength={100} className="border p-2 rounded-md border-[#ccc]" type="text" placeholder="Descreva brevemente o produto" />

          <input name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="number" placeholder="Quantidade em Estoque" required />

          <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded-md border-[#ccc] bg-white" required>
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Vestuário">Vestuário</option>
            <option value="others">Outros</option>
          </select>

          {/* ✅ Campo condicional */}
          {formData.category === "others" && <input name="other_category" value={formData.other_category} onChange={handleChange} type="text" placeholder="Qual a outra categoria?" className="border p-2 rounded-md border-[#ccc]" required autoFocus />}

          <input name="expiration_date" value={formData.expiration_date} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="date" />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] 
                       self-center text-white hover:bg-emerald-400 
                       disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Enviando..." : editingProduct ? "Atualizar Produto" : "Cadastrar Produto"}
          </button>
        </form>

        {/* ✅ Mensagem dinâmica */}
        {message && <p className={`text-center mt-2 ${message.includes("Erro") ? "text-red-500" : "text-emerald-600"}`}>{message}</p>}
      </div>
    </div>
  );
}
