import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Curriculo() {
  const { id } = useParams();
  const [curriculo, setCurriculo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const fetchCurriculo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/curriculos/${id}`);
        setCurriculo(response.data);
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        setErro(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculo();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Carregando...</div>;
  if (erro || !curriculo) return <div className="p-6 text-red-500">Currículo não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Detalhes do Currículo</h1>

        <p><strong>Nome:</strong> {curriculo.nome}</p>
        <p><strong>Email:</strong> {curriculo.email}</p>
        <p><strong>Telefone:</strong> {curriculo.telefone}</p>
        <p><strong>Resumo:</strong> {curriculo.resumo}</p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Endereço</h2>
          <p>{curriculo.endereco?.rua}, {curriculo.endereco?.numero}</p>
          <p>{curriculo.endereco?.bairro} - {curriculo.endereco?.cidade}/{curriculo.endereco?.estado}</p>
          <p>CEP: {curriculo.endereco?.cep}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Experiências</h2>
          {curriculo.experiencias?.map((exp, index) => (
            <div key={index} className="mb-2">
              <p><strong>Cargo:</strong> {exp.cargo}</p>
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Período:</strong> {exp.inicio} até {exp.fim}</p>
              <p><strong>Descrição:</strong> {exp.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Formações</h2>
          {curriculo.formacoes?.map((formacao, index) => (
            <div key={index} className="mb-2">
              <p><strong>Curso:</strong> {formacao.curso}</p>
              <p><strong>Instituição:</strong> {formacao.instituicao}</p>
              <p><strong>Ano de Conclusão:</strong> {formacao.anoConclusao}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Idiomas</h2>
          {curriculo.idiomas?.map((idioma, index) => (
            <div key={index}>
              <p><strong>Idioma:</strong> {idioma.idioma}</p>
              <p><strong>Nível:</strong> {idioma.nivel}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}