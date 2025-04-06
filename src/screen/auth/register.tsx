import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerUserSchema } from "@/types/input/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { RegisterUser } from "@/services/auth"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@/store/feature/authSlice"
import { useState } from "react"

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: '',
            email: "",
            password: "",
            confirmPassword: "",
        }
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function onSubmit(values: z.infer<typeof registerUserSchema>) {
        setIsSubmitting(true)
        if (values.password !== values.confirmPassword) {
            toast.error('Password tidak sama')
            setIsSubmitting(false)
            return
        }

        try {
            const data = await RegisterUser(values.name, values.email, values.password)
            if (data.error) {
                toast.error(data.error)
            }
            dispatch(loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
            navigate('/apps')

        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message)
            } else {
                toast.error('Terjadi kesalahan')
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Sebelum melanjutkan silahkan daftar terlebih dahulu.
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="kep Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="keps@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Masukan ulang password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isSubmitting} type="submit" className="w-full">{isSubmitting ? 'Tunggu Sebentar': 'Daftar'}</Button>
                    </form>
                </Form>
            </div>
            <div className="text-center text-sm">
                Sudah punya akun ?{" "}
                <Link to="/auth" className="underline underline-offset-4">
                    Masuk disini
                </Link>
            </div>
        </div>
    )
}
