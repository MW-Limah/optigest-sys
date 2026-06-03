/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Aside from "@/components/Aside";
import { FaCartShopping, FaPeopleCarryBox } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { FaBoxes } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import BarChart from "./components/charts/Bar";

export default function Home() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
    fetchClients();
  }, []);

  return (
    <div className="page-wrapper flex w-full h-full min-h-screen ">
      <Aside />

      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <h1 className="text-2xl mb-1 font-bold">Dashboard</h1>
        <p className="text-gray-600 mb-6">Aqui está a visão geral do seu negócio</p>

        {/* Grid ajustado para 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card: Total de Clientes (Exemplo, já que não estava no seu state) */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">Total de Clientes</p>
              <span className="text-xl">
                <IoPeopleSharp />
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">{clients.length}</h2>
          </div>

          {/* Card: Receita Total */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">Receita Total Atual</p>
              <span className="text-xl">
                <MdAttachMoney />
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">R$ 2.400,00</h2>
            <p className="text-[10px] text-gray-400 mt-2 text-right">Atualizado em 25/03/2026</p>
          </div>

          {/* Card: Produtos */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">Produtos</p>
              <span className="text-xl">
                <FaBoxes />
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">{products.length}</h2>
            <p className="text-xs text-gray-400 mt-1">Itens cadastrados</p>
          </div>

          {/* Card: Total de Vendas */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">Total de Vendas</p>
              <span className="text-xl">
                <FaCartShopping />
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">250</h2>
          </div>

          {/* Card: Fornecedores */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">Fornecedores</p>
              <span className="text-xl">
                <FaPeopleCarryBox />
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">{suppliers.length}</h2>
          </div>

          {/* Card: Estoque Baixo */}
          <div className="py-4 px-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex flex-row items-start justify-between">
              <div>
                <p className="text-gray-600 font-medium">Estoque Baixo</p>
                <h2 className="text-2xl font-bold mt-2 text-gray-900">2</h2>
              </div>
              <div>
                <span className="text-xl">
                  <FiAlertTriangle />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 gap-2">
              <p className="text-[10px] text-gray-400">Você tem produtos com estoque baixo!</p>
              <button className="bg-black text-white text-xs py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors">Ver produtos</button>
            </div>
          </div>
        </div>
        <section className="mt-4">
          <BarChart />
        </section>
      </main>
    </div>
  );
}
