import z, { ZodType } from 'zod';

const authScheman = z.object({
	email: z.string().email(), 
	password: z.string(),
});

export function validationAuth(object: ZodType) {
	return authScheman.safeParse(object);
}
