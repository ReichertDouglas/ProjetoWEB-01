import * as yup from 'yup';
import { curriculo } from '../types/curriculo';
import { nivel } from '../types/nivel';

export const CurriculoSchema: yup.ObjectSchema<curriculo> = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(5, 'Mínimo 5 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  telefone: yup.string().required('Telefone é obrigatório'),
  endereco: yup.object({
    cep: yup.string(),
    rua: yup.string(),
    numero: yup.number().optional(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
  }),
  resumo: yup.string(),
  
  experiencias: yup.array().of(
    yup.object({
      cargo: yup.string(),
      empresa: yup.string(),
      inicio: yup.string(),
      fim: yup.string(),
      descricao: yup.string(),
    })
  ),

  formacoes: yup.array().of(
    yup.object({
      curso: yup.string(),
      instituicao: yup.string(),
      anoConclusao: yup.number(),
    })
  ),

  idiomas: yup.array().of(
    yup.object({
      idioma: yup.string(),
        nivel: yup.mixed<nivel>().oneOf([nivel.BASICO, nivel.INTERMEDIARIO, nivel.AVANCADO, nivel.FLUENTE]),

    })
  ),
    id: yup.number().transform(value => (isNaN(value) ? undefined : value)).optional()
});