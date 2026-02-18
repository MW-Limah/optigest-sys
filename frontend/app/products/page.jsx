"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import ProductsModal from "../components/ProductsModal";
import { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Fundo levemente cinza para destacar os cards brancos */}
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <p className="text-gray-500">Gerencie seus produtos</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors shadow-lg"
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
              <h2 className="text-3xl font-bold mt-2 text-gray-900">1</h2>
            </div>
          </div>

          {/* Container da Tabela com a nova estilização */}
          <div className="w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                {/* Cabeçalho estilizado como o "falso cabeçalho" */}
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
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Laço de Cetim
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                    7891234567890
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                    Laço de cetim bege, com presilha de metal e brilho.
                  </td>
                  <td className="px-6 py-4 text-gray-700">50</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      Vestuário
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">-</td>
                  <td className="px-6 py-4">
                    <div className="relative w-18 h-18 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src="/bege.jpg"
                        fill
                        className="object-cover"
                        alt="Produto"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm">
                        Editar dados
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-2">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ProductsModal show={isModalOpen} setShow={setIsModalOpen} />
      </main>
    </div>
  );
}
