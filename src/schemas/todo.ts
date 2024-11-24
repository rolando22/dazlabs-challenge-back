import z, { ZodType } from 'zod';

const todoSchema = z.object({
	text: z.string(),
	completed: z.boolean(),
});

export function validateTodo(object: ZodType) {
	return todoSchema.safeParse(object);
}

export function validatePartialTodo(object: ZodType) {
	return todoSchema.partial().safeParse(object);
}
