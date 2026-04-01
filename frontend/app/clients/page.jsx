"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";

import ClientsModal from "../components/ClientsModal";
import { useState, useEffect } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Cliente removido!");
        setClients((prev) => prev.filter((client) => client.id !== id));
      } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="page-wrapper flex h-screen w-full">
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <nav className="page-nav flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
            <p className="text-gray-500">Gerencie seus clientes</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-lg">
            + Clientes
          </button>
        </nav>
        <section>
          <div className="flex gap-6 mb-8 shadow-md">
            <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-sm rounded-t-xl">
              <p className="text-gray-500 text-sm font-medium">Quantidade de clientes</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">{clients.length}</h2>
            </div>
          </div>

          <div className="table-wrapper w-full border border-gray-200 rounded-2xl shadow-md bg-white overflow-hidden">
            <table className="responsive-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Nome</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">CPF</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Telefone</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">E-mail</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-left">Endereço</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map((client) => (
                  <tr key={client.id} className="group hover:bg-gray-50 transition-colors">
                    <td data-label="Nome" className="px-6 py-4 text-gray-700 font-medium">
                      {client.name}
                    </td>
                    <td data-label="Código" className="px-6 py-4 text-gray-500 font-mono text-sm">
                      {client.cpf}
                    </td>
                    <td data-label="Descrição" className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                      {client.phone_number}
                    </td>
                    <td data-label="Estoque" className="px-6 py-4 text-gray-700">
                      {client.email}
                    </td>
                    <td data-label="Preço" className="px-6 py-4 text-gray-700">
                      {client.address}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(client)}
                          className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
                        >
                          Editar
                        </button>
                        <button onClick={() => handleDelete(client.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2">
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

        <ClientsModal show={isModalOpen} setShow={setIsModalOpen} onClientAdded={fetchClients} editingClient={editingClient} setEditingClient={setEditingClient} />
      </main>
    </div>
  );
}
