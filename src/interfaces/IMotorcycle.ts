import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const motorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    invalid_type_error: 'Invalid engineCapacity type was provided',
    required_error: 'The key "engineCapacity" is required but was not provided',
  })
    .lte(2500, { message: 'Minimum value allowed for "engineCapacity" is 0' })
    .gte(0, { message: 'Maximum value allowed for "engineCapacity" is 2500' }),
});

type IMotorcycle = z.infer<typeof motorcycleSchema>;

export { IMotorcycle, motorcycleSchema };