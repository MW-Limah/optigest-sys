"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function ProductsModal({ show, setShow, onProductAdded, editingProduct, setEditingProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    cod_bar: "",
    description: "",
    quantity: "",
    category: "",
    other_category: "",
    expiration_date: "",
    image: "",
    price: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Currency formatting
  const formatCurrency = (value) => {
    if (!value) return "";

    const number = String(value).replace(/\D/g, "");
    const float = Number(number) / 100;

    return float.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // ✅ Specific handler for price
  const handlePriceChange = (e) => {
    const formatted = formatCurrency(e.target.value);

    setFormData((prev) => ({
      ...prev,
      price: formatted,
    }));
  };

  // ✅ Load data when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        cod_bar: editingProduct.cod_bar || "",
        description: editingProduct.description || "",
        quantity: editingProduct.quantity || "",
        category: editingProduct.category || "",
        other_category: editingProduct.other_category || "",
        expiration_date: editingProduct.expiration_date || "",
        image: editingProduct.image || "",
        price: editingProduct.price ? formatCurrency(editingProduct.price) : "",
      });
    } else {
      setFormData({
        name: "",
        cod_bar: "",
        description: "",
        quantity: "",
        category: "",
        other_category: "",
        expiration_date: "",
        image: "",
        price: "",
      });
    }
  }, [editingProduct, show]);

  if (!show) return null;

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();

    data.append("name", formData.name);
    data.append("cod_bar", formData.cod_bar);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);

    const finalCategory = formData.category === "others" ? formData.other_category : formData.category;

    data.append("category", finalCategory);
    data.append("expiration_date", formData.expiration_date);

    // ✅ Convert price to number
    const rawPrice = formData.price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();

    data.append("price", rawPrice);

    if (selectedFile) {
      data.append("image", selectedFile);
    } else if (editingProduct && formData.image) {
      data.append("image", formData.image);
    }

    const isEditing = !!editingProduct;
    const url = isEditing ? `/api/products/${editingProduct.id}` : `/api/products`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: data,
      });

      if (response.ok) {
        setMessage(isEditing ? "Product updated successfully!" : "Product registered successfully!");

        onProductAdded();
        setSelectedFile(null);

        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || errorData.error}`);
      }
    } catch (error) {
      console.error("Operation error:", error);
      setMessage("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditingProduct(null);
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category" && value !== "others") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        other_category: "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="modal-box fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">{editingProduct ? "Edit Product" : "Register new Product"}</h2>

          <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800 transition-colors">
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="text" placeholder="Product Name" required />

          <input name="cod_bar" value={formData.cod_bar} onChange={handleChange} type="number" placeholder="Barcode" className="border p-2 rounded-md border-[#ccc]" required />

          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={100}
            className="border p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Description"
          />

          <input name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="number" placeholder="Quantity" required />

          {/* 💰 PRICE */}
          <input
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
            type="text"
            placeholder="Price (R$ 0.00)"
            className="border p-2 rounded-md border-[#ccc]"
            required
          />

          <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded-md border-[#ccc] bg-white" required>
            <option value="" disabled>
              Select a category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Food & Beverages">Food & Beverages</option>
            <option value="Clothing">Clothing</option>
            <option value="others">Others</option>
          </select>

          {formData.category === "others" && (
            <input
              name="other_category"
              value={formData.other_category}
              onChange={handleChange}
              type="text"
              placeholder="Other category"
              className="border p-2 rounded-md border-[#ccc]"
              required
            />
          )}

          <input name="expiration_date" value={formData.expiration_date} onChange={handleChange} className="border p-2 rounded-md border-[#ccc]" type="date" />

          <input name="image" type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md border-[#ccc]" />

          <button type="submit" disabled={loading} className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 disabled:bg-gray-400">
            {loading ? "Sending..." : editingProduct ? "Update Product" : "Register Product"}
          </button>
        </form>

        {message && <p className={`text-center mt-2 ${message.includes("Error") ? "text-red-500" : "text-emerald-600"}`}>{message}</p>}
      </div>
    </div>
  );
}
