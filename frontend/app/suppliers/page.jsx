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
      <main className="flex-1 py-6 px-10">
        <nav className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Fornecedores</h1>
            <p className="text-xl">Gerencie seus fornecedores</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
          >
            + Fornecedor
          </button>
        </nav>
        <section>
          <div>
            {/* Quantidade de clientes */}
            <div className="w-full border-b-2 border-[#ddd] py-8 bg-white mb-6">
              <p className="text-gray-500">Total de Fornecedores</p>
              <h2 className="text-3xl font-bold mt-2">1</h2>
            </div>
          </div>
          <div className="w-full border-2 border-[#ddd] rounded-xl p-8 shadow-xl bg-white">
            {/* Lista de Fornecedores */}
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 border-b border-gray-400">
                  <th className="pb-4 font-medium text-left w-1/7">
                    Nome da Empresa
                  </th>
                  <th className="pb-4 font-medium text-left w-1/7">CNPJ</th>
                  <th className="pb-4 font-medium text-left w-1/7">Endereço</th>
                  <th className="pb-4 font-medium text-left w-1/7">Telefone</th>
                  <th className="pb-4 font-medium text-left w-1/7">E-mail</th>
                  <th className="pb-4 font-medium text-left w-1/7">
                    Contato Principal
                  </th>
                  <th className="pb-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group">
                  <td className="py-4 text-gray-700">Async Sincrone</td>
                  <td className="py-4 text-gray-700">45.923.012/0001-84</td>
                  <td className="py-4 text-gray-700">
                    Rua 123, Bairro, Cidade-Estado, CEP 12345-678
                  </td>
                  <td className="py-4 text-gray-700">(92) 999412-5214</td>
                  <td className="py-4 text-gray-700">Email@gmail.com</td>
                  <td className="py-4 text-gray-700">(92) 999412-5214</td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-4">
                      <button className="bg-black text-white px-4 py-1.5 rounded-xl text-sm font-light hover:bg-gray-800 transition-colors">
                        Editar dados
                      </button>
                      <button className="text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
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
