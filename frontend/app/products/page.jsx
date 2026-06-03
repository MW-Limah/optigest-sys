"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import ProductsModal from "../components/ProductsModal";
import { useState, useEffect } from "react";
import OpenedImage from "./img/OpenedImg";

export default function Page() {
  /* 
  const [isImageOpen, setIsImageOpen] = useState(false); */
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error to fetch products:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product successfully removed!");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error to delete this product:", error);
    }
  };

  return (
    <div className="page-wrapper flex h-screen w-full">
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="page-nav flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-500">Manage your products</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-lg">
            Add Products
          </button>
        </nav>
        <section>
          <div className="flex gap-6 mb-8 shadow-md">
            <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-sm rounded-t-xl">
              <p className="text-gray-500 text-sm font-medium">Total products</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">{products.length}</h2>
            </div>
          </div>

          <div className="table-wrapper w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            <table className="responsive-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Name</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">SKU/Barcode</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Description</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Stock</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Price/unit</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Category</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Expiration date</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-left">Image</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-gray-50 transition-colors">
                    <td data-label="Nome" className="px-6 py-4 text-gray-700 font-medium">
                      {product.name}
                    </td>
                    <td data-label="Código" className="px-6 py-4 text-gray-500 font-mono text-sm">
                      {product.cod_bar}
                    </td>
                    <td data-label="Descrição" className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                      {product.description}
                    </td>
                    <td data-label="Estoque" className="px-6 py-4 text-gray-700">
                      {product.quantity}
                    </td>
                    <td data-label="Preço" className="px-6 py-4 text-gray-700">
                      {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                    <td data-label="Categoria" className="px-6 py-4">
                      <span className="flex flex-col justify-start bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{product.category}</span>
                    </td>
                    <td data-label="Validade" className="w-[150px] px-6 py-4 text-gray-500">
                      {product.expiration_date || "-"}
                    </td>
                    <td data-label="Foto" className="px-1 py-4">
                      <div
                        className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 ml-auto cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setSelectedImage(product.image ? `/uploads/${product.image}` : "/placeholder.jpg")}
                      >
                        <Image src={product.image ? `/uploads/${product.image}` : "/placeholder.jpg"} alt={product.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2">
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

        <ProductsModal show={isModalOpen} setShow={setIsModalOpen} onProductAdded={fetchProducts} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
        {selectedImage && <OpenedImage srcImage={selectedImage} onClose={() => setSelectedImage(null)} />}
      </main>
    </div>
  );
}
