import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const motorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    invalid_type_error: 'Invalid engineCapacity type was provided',
    required_error: 'The key "engineCapacity" is required but was not provided',
  })
    .lte(2500, { message: 'Maximum value allowed for "engineCapacity" is 2500' })
    .gte(1, { message: 'Minimum value allowed for "engineCapacity" is 1' }),
});

type IMotorcycle = z.infer<typeof motorcycleSchema>;

export { IMotorcycle, motorcycleSchema };