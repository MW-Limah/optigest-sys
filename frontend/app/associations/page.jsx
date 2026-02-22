/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Aside from "@/components/Aside";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaBoxOpen } from "react-icons/fa";
import AssociationsModal from "../components/AssociationsModal";

function ProductItem({ product, refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnlink = async (supplier_id) => {
    if (!window.confirm("Desassociar fornecedor deste produto?")) return;

    try {
      const response = await fetch(`http://localhost:3001/products-suppliers/${product.id}/${supplier_id}`, { method: "DELETE" });

      if (response.ok) {
        refresh(); // 🔁 recarrega lista do banco
      } else {
        const data = await response.json();
        alert(data.message || "Erro ao desassociar");
      }
    } catch (error) {
      console.error("Erro ao desassociar:", error);
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-none">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
            {product.image ? (
              <Image src={`http://localhost:3001/uploads/${product.image}`} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FaBoxOpen />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 font-mono">EAN: {product.cod_bar}</p>
          </div>

          <p className="text-sm text-gray-600 truncate max-w-xs ml-8">{product.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-4 py-1.5 rounded-xl text-sm hover:bg-gray-800 transition-colors">
            Editar Fornecedores
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-gray-50 py-4 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 ml-4">Fornecedores Associados</h4>

          {product.suppliers.length > 0 ? (
            <ul className="space-y-2">
              {product.suppliers.map((sup) => (
                <li key={sup.id} className="flex justify-between items-center bg-white py-2 px-4 rounded-lg ml-4 border border-[#ddd] shadow-md">
                  <span className="flex-1 font-medium text-gray-700">{sup.name}</span>

                  <span className="text-sm text-gray-500 font-mono">{sup.cnpj}</span>

                  <button onClick={() => handleUnlink(sup.id)} className="bg-red-500 ml-6 text-white px-4 py-2 rounded-xl hover:bg-red-600 text-sm font-bold">
                    Desassociar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic ml-4">Nenhum fornecedor vinculado.</p>
          )}
        </div>
      )}

      <AssociationsModal show={isModalOpen} setShow={setIsModalOpen} product={product} refresh={refresh} />
    </div>
  );
}

export default function Page() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products-with-suppliers");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar associações:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const associatedCount = products.filter((p) => p.suppliers.length > 0).length;

  const notAssociatedCount = products.filter((p) => p.suppliers.length === 0).length;

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />

      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Associações</h1>
          <p className="text-gray-500">Associe produtos aos fornecedores</p>
        </nav>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border-b-4 border-emerald-500 py-8 px-6 bg-white shadow-sm">
            <p className="text-gray-500 text-sm">Produtos Associados</p>
            <h2 className="text-3xl text-emerald-500 font-bold">{associatedCount}</h2>
          </div>

          <div className="border-b-4 border-yellow-500 py-8 px-6 bg-white shadow-sm">
            <p className="text-gray-500 text-sm">Sem Associação</p>
            <h2 className="text-3xl text-yellow-500 font-bold">{notAssociatedCount}</h2>
          </div>
        </div>

        <div className="w-full border border-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} refresh={fetchProducts} />
          ))}
        </div>
      </main>
    </div>
  );
}
