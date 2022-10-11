import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const carSchema = vehicleSchema.extend({
  doorsQty: z.number({
    invalid_type_error: 'Invalid doorsQty was provided',
    required_error: 'The key "doorsQty" is required but was not provided',
  }).int()
    .gte(2, { message: 'Minimum value allowed for "doorsQty" is 2' })
    .lte(4, { message: 'Maximum value allowed for "doorsQty" is 4' }),
  seatsQty: z.number({
    invalid_type_error: 'Invalid seatsQty was provided',
    required_error: 'The key "seatsQty" is required but was not provided',
  })
    .int()
    .gte(2, { message: 'Minimum value allowed for "seatsQty" is 2' })
    .lte(7, { message: 'Maximum value allowed for "seatsQty" is 7' }),
});

type ICar = z.infer<typeof carSchema>;

export { carSchema, ICar };
