import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { IMaskInput } from 'react-imask';

const schema = yup.object().shape({
  fullName: yup.string().required('Nome é obrigatório').min(3),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  phone: yup.string().required('Telefone é obrigatório'),
  address: yup.object().shape({
    cep: yup.string().required('CEP é obrigatório'),
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório'),
  }),
  summary: yup.string().required('Resumo é obrigatório').min(30, 'Mínimo 30 caracteres'),
  experiences: yup.array().of(
    yup.object().shape({
      role: yup.string().required(),
      company: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      course: yup.string().required(),
      institution: yup.string().required(),
      year: yup.string().required(),
    })
  ),
  languages: yup.array().of(
    yup.object().shape({
      language: yup.string().required(),
      level: yup.string().required(),
    })
  ),
});

export const CriarCurriculoPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      experiences: [{ role: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ course: '', institution: '', year: '' }],
      languages: [{ language: '', level: '' }],
    },
  });

  const { fields: experienceFields, append: addExperience } = useFieldArray({
    control,
    name: 'experiences',
  });

  const { fields: educationFields, append: addEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: languageFields, append: addLanguage } = useFieldArray({
    control,
    name: 'languages',
  });

  const onSubmit = (data: any) => {
    console.log('Currículo:', data);
    alert('Currículo salvo com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Informações Pessoais */}
      <h2 className="text-xl font-bold">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register('fullName')} placeholder="Nome completo" className="input" />
        <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

        <input {...register('email')} placeholder="Email" className="input" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <Controller
        name="phone"
        control={control}
        rules={{ required: 'Telefone é obrigatório' }}
        render={({ field }) => (
          <IMaskInput
            {...field}
            mask="(00) 00000-0000"
            placeholder="Telefone"
            className="input"
            onAccept={(value) => field.onChange(value)} // importante para atualizar o valor corretamente
          />
        )}
      />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>

        <input {...register('address.cep')} placeholder="CEP" className="input" />
        <input {...register('address.street')} placeholder="Rua" className="input" />
        <input {...register('address.number')} placeholder="Número" className="input" />
        <input {...register('address.neighborhood')} placeholder="Bairro" className="input" />
        <input {...register('address.city')} placeholder="Cidade" className="input" />
        <input {...register('address.state')} placeholder="Estado" className="input" />
      </div>

      {/* Resumo Profissional */}
      <h2 className="text-xl font-bold">Resumo Profissional</h2>
      <textarea {...register('summary')} placeholder="Resumo profissional" className="input h-24" />
      <p className="text-red-500 text-sm">{errors.summary?.message}</p>

      {/* Experiência Profissional */}
      <h2 className="text-xl font-bold">Experiência Profissional</h2>
      {experienceFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`experiences.${index}.role`)} placeholder="Cargo" className="input" />
          <input {...register(`experiences.${index}.company`)} placeholder="Empresa" className="input" />
          <input type="date" {...register(`experiences.${index}.startDate`)} className="input" />
          <input type="date" {...register(`experiences.${index}.endDate`)} className="input" />
          <textarea {...register(`experiences.${index}.description`)} placeholder="Descrição" className="input h-20" />
        </div>
      ))}
      <button type="button" onClick={() => addExperience({role: '', company: '', startDate: '', endDate: '', description: ''})} className="">
        Adicionar Experiência
      </button>

      {/* Formação Acadêmica */}
      <h2 className="text-xl font-bold">Formação Acadêmica</h2>
      {educationFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register(`education.${index}.course`)} placeholder="Curso" className="input" />
          <input {...register(`education.${index}.institution`)} placeholder="Instituição" className="input" />
          <input type="text" {...register(`education.${index}.year`)} placeholder="Ano de Conclusão" className="input" />
        </div>
      ))}
      <button type="button" onClick={() => addEducation({ institution: '', year: '', course: '' })} className="btn">
        Adicionar Formação
      </button>

      {/* Idiomas */}
      <h2 className="text-xl font-bold">Idiomas</h2>
      {languageFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`languages.${index}.language`)} placeholder="Idioma" className="input" />
          <select {...register(`languages.${index}.level`)} className="input">
            <option value="">Selecione o nível</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => addLanguage({ language: '', level: '' })} className="btn">
        Adicionar Idioma
      </button>

      {/* Ações */}
      <div className="flex justify-between pt-4">
        <button type="submit" className="mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600">
          Salvar
        </button>
        <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cancelar
        </button> 
      </div>
    </form>
  );
};