import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const motorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number()
    .lte(2500)
    .gte(0),
});

type IMotorcycle = z.infer<typeof motorcycleSchema>;

export { IMotorcycle, motorcycleSchema };