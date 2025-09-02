import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface Curriculo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export default function ListarCurriculosPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/curriculos")
      .then((res) => {
        setCurriculos(res.data)
        setError(null)
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/curriculos/${id}`);
          setCurriculos((prev) => prev.filter((c) => c.id !== id));
          Swal.fire('Excluído!', 'O currículo foi removido.', 'success');
        } catch (err) {
          Swal.fire('Erro', 'Não foi possível excluir o currículo.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <p className="text-center py-6">Carregando currículos...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-6">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Currículos Cadastrados
        </h1>

        {curriculos.length === 0 ? (
          <p className="text-gray-500">Nenhum currículo cadastrado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {curriculos.map((cv) => (
              <li
                key={cv.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-4xl text-blue-500" />
                  <div>
                    <p className="text-lg font-semibold">{cv.nome}</p>
                    <p className="text-sm text-gray-600">{cv.email}</p>
                    <p className="text-sm text-gray-600">{cv.telefone}</p>
                  </div>
                </div>
                <button
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/curriculos/${cv.id}`)}
                >
                  Visualizar
                </button>
                <button
                  className="text-sm text-green-600 hover:underline cursor-pointer mr-4"
                  onClick={() => navigate(`/editar-curriculo/${cv.id}`)}
                >
                  Atualizar
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => handleDelete(cv.id)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}