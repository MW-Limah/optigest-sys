"use client";

import { useState, useEffect } from "react";
import Aside from "@/components/Aside";
import DoughnutChart from "./components/charts/Doughnut";

export default function Home() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:3001/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores: ", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSuppliers();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full h-full">
      <Aside />

      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <h1 className="text-3xl font-bold">Bem-vindo ao Optigest</h1>
        <p className="text-xl">Sistema de Gestão de Estoque</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="py-8 px-6 bg-white shadow-lg rounded-xl hover:scale-101 transition-transform duration-300 ease-in-out border-2 border-gray-200">
              <p className="text-gray-600 text-md font-medium">Total de produtos</p>
              <h2 className="text-3xl font-bold mt-4 text-gray-900">{products.length}</h2>
            </div>

            <div className="py-8 px-6 bg-white shadow-lg rounded-xl hover:scale-101 transition-transform transition-all duration-200 ease-in-out border-2 border-gray-200">
              <p className="text-gray-600 text-md font-medium">Total de fornecedores</p>
              <h2 className="text-3xl font-bold mt-4 text-gray-900">{suppliers.length}</h2>
            </div>
          </div>

          <div className="col-span-1">
            <div className="py-8 px-6 bg-white shadow-lg rounded-xl hover:scale-101 transition-transform transition-all duration-200 ease-in-out border-2 border-gray-200 h-full">
              <p className="text-gray-600 text-md font-medium">Produtos Associados / Não Associados</p>

              <div className="mt-6">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
