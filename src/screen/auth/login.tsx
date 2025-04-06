import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { userLoginSchema } from "@/types/input/auth"
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
import { loginUser } from "@/services/auth"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@/store/feature/authSlice"
import { useState } from "react"

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof userLoginSchema>>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof userLoginSchema>) {
        setIsSubmitting(true)
        try {
            const data = await loginUser(values.email, values.password)
            if (data.error) {
                toast.error(data.error)
            }
            else {
                dispatch(loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
                navigate('/apps')
            }
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Masuk ke akun</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Masukkan email dan kata sandi Anda untuk melanjutkan
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="kepsn@example.com" {...field} />
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
                        <Button disabled={isSubmitting} type="submit" className="w-full">{isSubmitting ? 'Tunggu Sebentar...':'Masuk'}</Button>
                    </form>
                </Form>
            </div>
            <div className="text-center text-sm">
                Belum punya akun?{" "}
                <Link to="/auth/register" className="underline underline-offset-4">
                    Daftar sekarang
                </Link>
            </div>
        </div>
    )
}
