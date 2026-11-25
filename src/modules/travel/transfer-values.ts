import { z } from "zod";

export const vehicleCode = z.enum(["4cho", "7cho", "16cho", "limo9"]);
