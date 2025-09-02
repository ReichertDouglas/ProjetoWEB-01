import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { IMaskInput } from 'react-imask';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Schema com campos em português e validações
const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  telefone: yup.string().required('Telefone é obrigatório'),
  endereco: yup.object().shape({
    cep: yup.string().required('CEP é obrigatório'),
    rua: yup.string().required('Rua é obrigatória'),
    numero: yup.string().required('Número é obrigatório'),
    bairro: yup.string().required('Bairro é obrigatório'),
    cidade: yup.string().required('Cidade é obrigatória'),
    estado: yup.string().required('Estado é obrigatório'),
  }),
  resumo: yup.string().required('Resumo é obrigatório').min(30, 'Resumo deve ter no mínimo 30 caracteres'),
  experiencias: yup.array().of(
    yup.object().shape({
      cargo: yup.string().required('Cargo é obrigatório'),
      empresa: yup.string().required('Empresa é obrigatória'),
      inicio: yup.string().required('Data de início é obrigatória'),
      fim: yup.string().required('Data de fim é obrigatória'),
      descricao: yup.string().required('Descrição é obrigatória'),
    })
  ),
  formacoes: yup.array().of(
    yup.object().shape({
      curso: yup.string().required('Curso é obrigatório'),
      instituicao: yup.string().required('Instituição é obrigatória'),
      anoConclusao: yup.string().required('Ano de conclusão é obrigatório'),
    })
  ),
  idiomas: yup.array().of(
    yup.object().shape({
      idioma: yup.string().required('Idioma é obrigatório'),
      nivel: yup.string().required('Nível é obrigatório'),
    })
  ),
});

export const CriarCurriculoPage = () => {
  const navigate = useNavigate();
  const listaCurriculos = () => navigate('/visualizar-curriculos');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
      resumo: '',
      experiencias: [{ cargo: '', empresa: '', inicio: '', fim: '', descricao: '' }],
      formacoes: [{ curso: '', instituicao: '', anoConclusao: '' }],
      idiomas: [{ idioma: '', nivel: '' }],
    },
  });

  const { fields: experienciaFields, append: addExperiencia } = useFieldArray({
    control,
    name: 'experiencias',
  });

  const { fields: formacaoFields, append: addFormacao } = useFieldArray({
    control,
    name: 'formacoes',
  });

  const { fields: idiomaFields, append: addIdioma } = useFieldArray({
    control,
    name: 'idiomas',
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/curriculos", data);
      if (response.status !== 201) throw new Error("Erro ao salvar currículo");

      alert("Currículo salvo com sucesso!");
      reset();
      listaCurriculos();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar currículo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Informações Pessoais */}
      <h2 className="text-xl font-bold">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input {...register('nome')} placeholder="Nome completo" className="input" />
          <p className="text-red-500 text-sm">{errors.nome?.message}</p>
        </div>
        <div>
          <input {...register('email')} placeholder="Email" className="input" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                placeholder="Telefone"
                className="input"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.telefone?.message}</p>
        </div>
        <input {...register('endereco.cep')} placeholder="CEP" className="input" />
        <input {...register('endereco.rua')} placeholder="Rua" className="input" />
        <input {...register('endereco.numero')} placeholder="Número" className="input" />
        <input {...register('endereco.bairro')} placeholder="Bairro" className="input" />
        <input {...register('endereco.cidade')} placeholder="Cidade" className="input" />
        <input {...register('endereco.estado')} placeholder="Estado" className="input" />
      </div>

      {/* Resumo Profissional */}
      <h2 className="text-xl font-bold">Resumo Profissional</h2>
      <textarea {...register('resumo')} placeholder="Resumo profissional" className="input h-24" />
      <p className="text-red-500 text-sm">{errors.resumo?.message}</p>

      {/* Experiência Profissional */}
      <h2 className="text-xl font-bold">Experiência Profissional</h2>
      {experienciaFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`experiencias.${index}.cargo`)} placeholder="Cargo" className="input" />
          <input {...register(`experiencias.${index}.empresa`)} placeholder="Empresa" className="input" />
          <input type="date" {...register(`experiencias.${index}.inicio`)} className="input" />
          <input type="date" {...register(`experiencias.${index}.fim`)} className="input" />
          <textarea {...register(`experiencias.${index}.descricao`)} placeholder="Descrição" className="input h-20" />
        </div>
      ))}
      <button type="button" onClick={() => addExperiencia({ cargo: '', empresa: '', inicio: '', fim: '', descricao: '' })} className="btn">
        Adicionar Experiência
      </button>

      {/* Formação Acadêmica */}
      <h2 className="text-xl font-bold">Formação Acadêmica</h2>
      {formacaoFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register(`formacoes.${index}.curso`)} placeholder="Curso" className="input" />
          <input {...register(`formacoes.${index}.instituicao`)} placeholder="Instituição" className="input" />
          <input type="text" {...register(`formacoes.${index}.anoConclusao`)} placeholder="Ano de Conclusão" className="input" />
        </div>
      ))}
      <button type="button" onClick={() => addFormacao({ curso: '', instituicao: '', anoConclusao: '' })} className="btn">
        Adicionar Formação
      </button>

      {/* Idiomas */}
      <h2 className="text-xl font-bold">Idiomas</h2>
      {idiomaFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`idiomas.${index}.idioma`)} placeholder="Idioma" className="input" />
          <select {...register(`idiomas.${index}.nivel`)} className="input">
            <option value="">Selecione o nível</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => addIdioma({ idioma: '', nivel: '' })} className="btn">
        Adicionar Idioma
      </button>

      {/* Ações */}
      <div className="flex justify-between pt-4">
        <button type="submit" className="cursor-pointer mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600">
          Salvar Currículo
        </button>
        <button type="button" className="cursor-pointer mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => reset()}>
          Cancelar
        </button>
      </div>
    </form>
  );
};