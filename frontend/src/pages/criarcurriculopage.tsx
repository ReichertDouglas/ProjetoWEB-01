import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import { onSubmit } from '../controllers/curriculocontroller';
import { CurriculoSchema } from "../pages/schemas/curriculoschema";
import { curriculo } from './types/curriculo';
import { nivel } from './types/nivel';

export const CriarCurriculoPage = () => {
  const navigate = useNavigate();
  const listaCurriculos = () => navigate('/visualizar-curriculos');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<curriculo>({ resolver: yupResolver(CurriculoSchema) });

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
      <button type="button" onClick={() => addFormacao({ curso: '', instituicao: '', anoConclusao: 0 })} className="btn">
        Adicionar Formação
      </button>

      {/* Idiomas */}
      <h2 className="text-xl font-bold">Idiomas</h2>
      {idiomaFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`idiomas.${index}.idioma`)} placeholder="Idioma" className="input" />
          <select {...register(`idiomas.${index}.nivel`)} className="input">
            <option value="">Selecione o nível</option>
            <option value="BASICO">Básico</option>
            <option value="INTERMEDIARIO">Intermediário</option>
            <option value="AVANCADO">Avançado</option>
            <option value="FLUENTE">Fluente</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => addIdioma({ idioma: '', nivel: nivel.BASICO })} className="btn">
        Adicionar Idioma
      </button>

      {/* Ações */}
      <div className="flex justify-between pt-4">
        <button type="submit" className="cursor-pointer mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600">
          Salvar Currículo
        </button>
        <button type="button" className="cursor-pointer mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => listaCurriculos()}>
          Cancelar
        </button>
      </div>
    </form>
  );
};