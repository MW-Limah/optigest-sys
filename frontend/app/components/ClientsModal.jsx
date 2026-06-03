"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function ClientsModal({ show, setShow, onClientAdded, editingClient, setEditingClient }) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Input Masks for CPF and Phone Number
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // ✅ Load data when editing
  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name || "",
        cpf: editingClient.cpf || "",
        phone_number: editingClient.phone_number || "",
        email: editingClient.email || "",
        address: editingClient.address || "",
      });
    } else {
      setFormData({ name: "", cpf: "", phone_number: "", email: "", address: "" });
    }
    setMessage("");
  }, [editingClient, show]);

  if (!show) return null;

  const handleClose = () => {
    setEditingClient(null);
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") formattedValue = maskCPF(value);
    if (name === "phone_number") formattedValue = maskPhone(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const isEditing = !!editingClient;
    const url = isEditing ? `/api/clients/${editingClient.id}` : `/api/clients`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Sent directly as JSON
      });

      if (response.ok) {
        setMessage(isEditing ? "Client updated successfully!" : "Client registered successfully!");
        onClientAdded(); // Reloads the list on the parent page

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="modal-box fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[500px] border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">{editingClient ? "Edit Client" : "Register new Client"}</h2>
          <button onClick={handleClose} className="text-2xl text-gray-400 hover:text-gray-800 transition-colors">
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md border-[#ccc] focus:border-emerald-500 outline-none"
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            type="text"
            placeholder="CPF (000.000.000-00)"
            className="border p-2 rounded-md border-[#ccc] focus:border-emerald-500 outline-none"
            required
          />

          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            type="text"
            placeholder="Phone Number (00) 00000-0000"
            className="border p-2 rounded-md border-[#ccc] focus:border-emerald-500 outline-none"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="border p-2 rounded-md border-[#ccc] focus:border-emerald-500 outline-none"
            required
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="Full Address"
            className="border p-2 rounded-md border-[#ccc] focus:border-emerald-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 disabled:bg-gray-400 mt-2 transition-all"
          >
            {loading ? "Saving..." : editingClient ? "Update Client" : "Register Client"}
          </button>
        </form>

        {message && <p className={`text-center font-medium mt-2 ${message.includes("Error") ? "text-red-500" : "text-emerald-600"}`}>{message}</p>}
      </div>
    </div>
  );
}
