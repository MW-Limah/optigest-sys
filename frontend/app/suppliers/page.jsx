"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import SuppliersModal from "../components/SuppliersModal";
import { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
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
          {/* Quantidade de clientes */}
          <div className="flex gap-6 mb-8 shadow-md">
            <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-md rounded-t-xl">
              <p className="text-gray-500 text-sm font-medium">
                Total de produtos
              </p>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">1</h2>
            </div>
          </div>

          <div className="w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            {/* Tabela de Fornecedores */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Nome da Empresa
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    CNPJ
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Endereço
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Telefone
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    E-mail
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">
                    Contato Principal
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Async Sincrone
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                    45.923.012/0001-84
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                    Rua 123, Bairro, Cidade-Estado, CEP 12345-678
                  </td>
                  <td className="px-6 py-4 text-gray-700">(92) 999412-5214</td>
                  <td className="px-6 py-4 text-gray-700">Email@gmail.com</td>
                  <td className="px-6 py-4 text-gray-700">
                    João Carlos de Nobrega
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm">
                        Editar dados
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-2">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <SuppliersModal show={isModalOpen} setShow={setIsModalOpen} />
      </main>
    </div>
  );
}
