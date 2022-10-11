import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const carSchema = vehicleSchema.extend({
  doorsQty: z.number()
    .int()
    .gte(2)
    .lte(4),
  seatsQty: z.number()
    .int()
    .gte(2)
    .lte(7),
});

type ICar = z.infer<typeof carSchema>;

export { carSchema, ICar };
