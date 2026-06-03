/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

export default function AssociationsModal({ show, setShow, product, refresh }) {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    if (show) fetchSuppliers();
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupplier) {
      alert("Select a supplier");
      return;
    }

    try {
      const response = await fetch("/api/products-suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          supplier_id: selectedSupplier,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Supplier linked sucessfully!");
        setShow(false);
        setSelectedSupplier("");
        refresh();
      } else {
        alert(data.error || data.message || "Error to link");
      }
    } catch (error) {
      console.error("Error to link:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="modal-box relative flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-[500px] border-2 border-[#ddd]">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Link supplier</h2>
          <button onClick={() => setShow(false)} className="text-2xl text-gray-500 hover:text-gray-800 transition-colors">
            <MdClose />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Produto */}
          <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="w-16 h-16 relative rounded overflow-hidden ">
              <Image src={product.image ? `/uploads/${product.image}` : "/placeholder.jpg"} fill className="object-cover" alt="Product" />
            </div>
            <div>
              <p className="font-bold text-sm">{product.name}</p>
              <p className="text-xs text-gray-500 font-mono">{product.cod_bar}</p>
            </div>
          </div>

          {/* Select */}
          <label className="text-sm font-medium mt-2">Select the supplier</label>

          <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)} className="border p-2 rounded-md border-[#ccc] bg-white">
            <option value="">Select...</option>

            {suppliers.map((sup) => (
              <option key={sup.id} value={sup.id}>
                {sup.name_enterprise}
              </option>
            ))}
          </select>

          {/* Botões */}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setShow(false)} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Cancel
            </button>

            <button type="submit" className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors">
              Create a Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
