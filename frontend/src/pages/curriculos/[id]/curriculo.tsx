import { useParams } from "react-router-dom";

const fakeData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 91234-5678",
    resumo: "Desenvolvedor Front-End com 5 anos de experiência.",
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria@email.com",
    telefone: "(21) 99876-5432",
    resumo: "Especialista em UX/UI com background em design gráfico.",
  },
];

export default function Curriculo() {
    const { id } = useParams();
    const curriculo = fakeData.find((item) => item.id === Number(id));

    if (!curriculo) {
    return <div className="p-6 text-red-500">Currículo não encontrado.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Currículo</h1>
            <p><strong>Nome:</strong> {curriculo.nome}</p>
            <p><strong>Email:</strong> {curriculo.email}</p>
            <p><strong>Telefone:</strong> {curriculo.telefone}</p>
            <p><strong>Resumo:</strong> {curriculo.resumo}</p>
            </div>
        </div>
    );
}