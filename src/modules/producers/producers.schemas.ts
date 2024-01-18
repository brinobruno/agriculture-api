import { z } from 'zod'
import { cpfCnpjValidator } from '../../shared/validateCpfCnpj'

const producerCropSchema = z.object({
  cropName: z.string(),
})

// Add an object for storing repetitive error message or sentences

export const createProducerSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a text',
    })
    .min(1)
    .max(100),
  cpfCnpj: z
    .string({
      required_error: 'CPF or CNPJ code is required',
      invalid_type_error: 'CPF or CNPJ must be a text',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'CPF or CNPJ code is required',
    })
    .refine(cpfCnpjValidator, { message: 'Invalid CPF ou CNPJ code' }),
  farmName: z.string({
    required_error: 'Farm name is required',
    invalid_type_error: 'Farm name must be a text',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a text',
  }),
  state: z.string({
    required_error: 'State is required',
    invalid_type_error: 'State must be a text',
  }),
  totalAreaHectares: z.number({
    required_error: 'Total area of hectares is required',
    invalid_type_error: 'Total area of hectares must be a number',
  }),
  cultivableAreaHectares: z.number({
    required_error: 'Cultivable area of hectares is required',
    invalid_type_error: 'Cultivable area of hectares must be a number',
  }),
  vegetationAreaHectares: z.number({
    required_error: 'Vegetation area of hectares is required',
    invalid_type_error: 'Total area of hectares must be a number',
  }),
  producerCrops: z.array(producerCropSchema),
})
