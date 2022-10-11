import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string({
    invalid_type_error: 'Invalid model type was provided',
    required_error: 'The key "model" is required but was not provided',
  }).min(3, 'The key "model" must be at least 3 characters length'),
  year: z.number({
    invalid_type_error: 'Invalid year type was provided',
    required_error: 'The key "year" is required but was not provided',
  }).int()
    .positive()
    .gte(1900, { message: 'Minimum value allowed for "year" is 1900' })
    .lte(2022, { message: 'Maximum value allowed for "year" is 2022' }),
  color: z.string({
    invalid_type_error: 'Invalid color type was provided',
    required_error: 'The key "color" is required but was not provided',
  }).min(3, { message: 'The key "model" must be at least 3 characters length' }),
  status: z.boolean({
    invalid_type_error: 'Invalid status type was provided',
  }).optional(),
  buyValue: z.number({
    invalid_type_error: 'Invalid buyValue type was provided',
    required_error: 'The key "buyValue" is required but was not provided',
  }).int(),
});

type IVehicle = z.infer<typeof vehicleSchema>;

export { vehicleSchema, IVehicle };