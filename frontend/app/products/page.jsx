"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import ProductsModal from "../components/ProductsModal";
import { useState, useEffect } from "react"; // 1. Importe useEffect

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // 2. Estado para armazenar os produtos

  // 3. Função para buscar os dados do backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // 4. Executa a busca ao montar o componente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  // Delete

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Produto removido!");
        // DICA: Aqui você deve atualizar seu estado local para
        // remover o item da tela sem precisar dar F5
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <p className="text-gray-500">Gerencie seus produtos</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-lg"
          >
            + Produto
          </button>
        </nav>

        <section>
          <div className="flex gap-6 mb-8 shadow-md">
            <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-sm rounded-t-xl">
              <p className="text-gray-500 text-sm font-medium">
                Total de produtos
              </p>
              {/* 5. Contador dinâmico */}
              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {products.length}
              </h2>
            </div>
          </div>

          <div className="w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Código
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Descrição
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Estoque
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Validade
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Foto
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* 6. Mapeamento dos produtos vindos do banco */}
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                      {product.cod_bar}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.expiration_date || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={
                            product.image
                              ? `data:image/jpeg;base64,${product.image}`
                              : "/bege.jpg"
                          }
                          fill
                          className="object-cover"
                          alt={product.name}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm">
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-2"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ProductsModal
          show={isModalOpen}
          setShow={setIsModalOpen}
          onProductAdded={fetchProducts}
        />
      </main>
    </div>
  );
}
