/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Aside from "@/components/Aside";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AssociationsModal from "../components/AssociationsModal";

function ProductItem({ product, refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnlink = async (supplier_id) => {
    if (!window.confirm("Unlink supplier from this product?")) return;

    try {
      const response = await fetch(`/api/products-suppliers/${product.id}/${supplier_id}`, { method: "DELETE" });

      if (response.ok) {
        refresh();
      } else {
        const data = await response.json();
        alert(data.message || "Error unlinking supplier");
      }
    } catch (error) {
      console.error("Error unlinking supplier:", error);
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-none">
      <div className="product-item-row flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="product-item-info flex items-center gap-4 flex-1">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
            {product.image ? (
              <Image src={`/uploads/${product.image}`} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image src={"/placeholder.jpg"} width={100} height={100} alt="Placeholder" />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 font-mono">SKU/Barcode: {product.cod_bar}</p>
          </div>

          <p className="product-item-desc text-sm text-gray-600 truncate max-w-xs ml-8">{product.description}</p>
        </div>

        <div className="product-item-actions flex items-center gap-4">
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-4 py-1.5 rounded-xl text-sm hover:bg-gray-800 transition-colors whitespace-nowrap">
            Edit Suppliers
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full flex-shrink-0">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-gray-50 py-4 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 ml-4">Associated Suppliers</h4>

          {product.suppliers.length > 0 ? (
            <ul className="space-y-2 px-4">
              {product.suppliers.map((sup) => (
                <li key={sup.id} className="supplier-row flex justify-between items-center bg-white py-2 px-4 rounded-lg border border-[#ddd] shadow-md">
                  <span className="flex-1 font-medium text-gray-700 mr-2">{sup.name}</span>
                  <span className="text-sm text-gray-500 font-mono mr-2">{sup.cnpj}</span>
                  <button onClick={() => handleUnlink(sup.id)} className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 text-sm font-bold flex-shrink-0">
                    Unlink
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic ml-4">No suppliers linked.</p>
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
      const response = await fetch("/api/products-with-suppliers");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching associations:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const associatedCount = products.filter((p) => p.suppliers.length > 0).length;
  const notAssociatedCount = products.filter((p) => p.suppliers.length === 0).length;

  return (
    <div className="page-wrapper flex h-screen w-full ">
      <Aside />

      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Product Linking</h1>
          <p className="text-gray-500">Link products to suppliers</p>
        </nav>

        <div className="assoc-stats-grid grid grid-cols-2 gap-6 mb-8">
          <div className="border-b-4 border-black border-emerald-500 py-8 px-6 bg-white shadow-md rounded-t-xl">
            <p className="text-gray-500 text-sm">Linked Products</p>
            <h2 className="text-3xl font-bold mt-2 text-emerald-500">{associatedCount}</h2>
          </div>

          <div className="border-b-4 border-yellow-500 py-8 px-6 bg-white shadow-md rounded-t-xl">
            <p className="text-gray-500 text-sm">Not Linked</p>
            <h2 className="text-3xl mt-2 text-yellow-500 font-bold">{notAssociatedCount}</h2>
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
