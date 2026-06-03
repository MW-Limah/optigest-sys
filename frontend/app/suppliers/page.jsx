"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import SuppliersModal from "../components/SuppliersModal";
import { useState, useEffect } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [editingSuppliers, setEditingSuppliers] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers: ", error);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSuppliers(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Supplier removed!");
        setSuppliers((prev) => prev.filter((s) => s.id !== id));
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSuppliers();
  }, []);

  return (
    <div className="page-wrapper flex h-screen w-full">
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="page-nav flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
            <p className="text-gray-500">Manage your suppliers</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors shadow-lg">
            + Supplier
          </button>
        </nav>
        <section>
          <div className="flex gap-6 mb-8 shadow-md  rounded-t-xl">
            <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-md rounded-t-xl">
              <p className="text-gray-500 text-sm font-medium">Total Suppliers</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">{suppliers.length}</h2>
            </div>
          </div>

          <div className="table-wrapper w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            <table className="responsive-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Company Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">CNPJ</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Address</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Phone</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Main Contact</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="group hover:bg-gray-50 transition-colors">
                    <td data-label="Company" className="px-6 py-4 text-gray-900 text-sm font-medium">
                      {supplier.name_enterprise}
                    </td>
                    <td data-label="CNPJ" className="px-6 py-4 text-gray-500 text-sm font-mono">
                      {supplier.cnpj}
                    </td>
                    <td data-label="Address" className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                      {supplier.address}
                    </td>
                    <td data-label="Phone" className="px-6 py-4 text-gray-500 text-sm">
                      {supplier.phone}
                    </td>
                    <td data-label="Email" className="px-6 py-4 text-gray-500 text-sm">
                      {supplier.email}
                    </td>
                    <td data-label="Contact" className="px-6 py-4 text-gray-900 text-sm">
                      {supplier.main_contact}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(supplier)}
                          className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
                        >
                          Edit details
                        </button>
                        <button onClick={() => handleDelete(supplier.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2">
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <SuppliersModal
          show={isModalOpen}
          setShow={setIsModalOpen}
          onSupplierAdded={fetchSuppliers}
          editingSuppliers={editingSuppliers}
          setEditingSuppliers={setEditingSuppliers}
        />
      </main>
    </div>
  );
}
