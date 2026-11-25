import type { z } from "zod";
export type FieldDefinition = {
  name: string;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "datetime-local"
    | "email"
    | "password"
    | "checkbox"
    | "select"
    | "json"
    | "markdown"
    | "image";
  required?: boolean;
  options?: { value: string; label: string }[];
  resource?: string;
  step?: string;
};
export type ResourceDefinition = {
  table: string;
  label: string;
  icon: string;
  fields: FieldDefinition[];
  columns: string[];
  schema: z.ZodType;
  roles: ("booking" | "editor")[];
  archive?: boolean;
};
