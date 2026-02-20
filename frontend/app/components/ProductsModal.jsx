"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

/* Passe parametros props como objeto */
export default function ProductsModal({
  show,
  setShow,
  onProductAdded,
  editingProduct,
  setEditingProduct,
}) {
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

  // 2. Efeito para carregar os dados no formulário quando for edição
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        cod_bar: editingProduct.cod_bar || "",
        description: editingProduct.description || "",
        quantity: editingProduct.quantity || "",
        category: editingProduct.category || "",
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
        expiration_date: "",
        image: "",
      });
    }
  }, [editingProduct, show]);
  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 3. Agora 'editingProduct' existe aqui via props!
    const isEditing = !!editingProduct;
    const url = isEditing
      ? `http://localhost:3001/products/${editingProduct.id}`
      : `http://localhost:3001/products`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isEditing ? "Atualizado!" : "Criado!");
        onProductAdded();
        handleClose(); // Função para fechar e limpar
      }
    } catch (error) {
      console.error("Erro na operação:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para fechar e resetar o estado de edição
  const handleClose = () => {
    setEditingProduct(null);
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] h-auto border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">
            {/* Titulo dinamico */}
            {editingProduct ? "Editar Produto" : "Cadastrar novo Produto"}
          </h2>
          <button
            onClick={handleClose}
            className="self-end text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Submit */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o Nome do Produto"
            required
          />
          <input
            name="cod_bar"
            value={formData.cod_bar}
            onChange={handleChange}
            type="number"
            placeholder="Insira o Código de Barras"
            className="border p-2 rounded-md border-[#ccc]"
            required
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={100}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Descreva brevemente o produto"
          />
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="number"
            placeholder="Quantidade em Estoque"
            required
          />

          <select
            name="category"
            value={formData.quantity}
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
            value={formData.expiration_date}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="date"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 disabled:bg-gray-400 transition-colors"
          >
            {loading
              ? "Enviando..."
              : editingProduct
                ? "Atualizar Produto"
                : "Cadastrar Produto"}
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
