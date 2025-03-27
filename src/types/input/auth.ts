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

export const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password minimal 8 karakter",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password minimal 8 karakter",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
});
