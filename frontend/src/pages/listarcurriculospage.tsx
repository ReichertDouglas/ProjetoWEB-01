import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserCircle, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { deletarCurriculo, listarCurriculos } from "../controllers/curriculocontroller";

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
    const fetchData = async () => {
      try {
        const data = await listarCurriculos();
        setCurriculos(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar os currículos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          await deletarCurriculo(id);
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
    <div className="min-h-screen py-8 px-3 md:py-15 md:px-30">
      <div className="max-w-5xl mx-auto bg-white/10 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          Currículos Cadastrados
        </h1>

        {curriculos.length === 0 ? (
          <p className="text-gray-500">Nenhum currículo cadastrado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {curriculos.map((cv) => (
              <li
                key={cv.id}
                className="flex justify-between bg-white/30 p-4 rounded-md shadow-sm hover:scale-101 transition">
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-4xl text-white" />
                  <div>
                    <p className="text-lg text-white font-semibold">{cv.nome}</p>
                    <p className="text-sm text-white">{cv.email}</p>
                    <p className="text-sm text-white">{cv.telefone}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate(`/curriculo/${cv.id}`)}
                    title="Visualizar"
                    className="text-blue-900 hover:text-blue-600 cursor-pointer"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => navigate(`/editar-curriculo/${cv.id}`)}
                    title="Editar"
                    className="text-green-900 hover:text-green-600 cursor-pointer"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    title="Excluir"
                    className="text-red-900 hover:text-red-600 cursor-pointer"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}