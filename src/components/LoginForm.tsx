'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function LoginForm() {
  const [err, setErr] = useState<string | null>(null) // 🔁 make sure it's a string
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await axios.post('/users/login', values)

      if (res.data?.accessToken) {
        localStorage.setItem('authToken',res.data.accessToken)
        router.push('/dashboard')
      } else {
        setErr('Login failed: No token received')
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Something went wrong'
      setErr(message) // ✅ just the message
      console.error('Login failed:', message)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-24 shadow-xl">
      <CardContent className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      onChange={(e) => {
                        setErr(null) // reset error on input
                        field.onChange(e)
                      }}
                    />
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
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                      onChange={(e) => {
                        setErr(null) // reset error on input
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          {/* 🔴 ERROR MESSAGE UI */}
          {err && (
            <p className="text-sm text-red-500 text-center mt-2">{err}</p>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}
