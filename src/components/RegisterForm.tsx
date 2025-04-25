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

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  department: z.string(),
  role: z.string(),
  password: z.string().min(6),
})

export default function RegisterForm() {
  const [err, setErr] = useState<string | null>(null) // 🔁 make sure it's a string
  const [loading,setLoading] = useState<boolean>(false) // 🔁 make sure it's a boolean
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '' ,name:'', company:'',department:'', role:''},
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await axios.post('/users/', values)
      console.log(res)
      setLoading(true)
      if (res.data.message="user created successfully") {
        setLoading(false)
        router.push('/')
        
      } else {
        setErr('registeration failed: ')
        setLoading(false)
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Something went wrong'
      setErr(message) // ✅ just the message
      console.error('registeration failed:', message)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-24 shadow-xl">
      <CardContent className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="john doe"
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
             <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>company</FormLabel>
                  <FormControl>
                    <Input
                      type="srting"
                      placeholder="company"
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
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>department</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="department"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="role"
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading? 'Registering...': "Register"}
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
