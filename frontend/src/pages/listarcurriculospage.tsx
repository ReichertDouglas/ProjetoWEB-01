import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fakeData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 91234-5678",
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria@email.com",
    telefone: "(21) 99876-5432",
  },
];

export default function ListarCurriculosPage() {
    const navigate = useNavigate();

return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Currículos Cadastrados</h1>

        {fakeData.length === 0 ? (
          <p className="text-gray-500">Nenhum currículo cadastrado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {fakeData.map((cv) => (
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
                <button className="text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => navigate(`/curriculos/${cv.id}`)}>Visualizar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}