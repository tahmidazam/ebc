import z from "zod";

export const codeSchema = z.string().regex(new RegExp("^\\d+$"));
