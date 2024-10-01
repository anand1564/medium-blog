
import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string().min(10)
})

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().min(10).optional(),
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;