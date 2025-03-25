import { z } from 'zod';

export const userLoginSchema = z.object({
    email: z.string().email(
        { message: "Masukan email dengan benar" }
    ),
    password: z.string().min(8, {
        message: "Password minimal 8 karakter"
    })
})

export const userRegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(
        { message: "Masukan email dengan benar" }
    ),
    password: z.string().min(8, {
        message: "Password minimal 8 karakter"
    })
})