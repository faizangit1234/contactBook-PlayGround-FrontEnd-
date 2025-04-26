"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { UserformSchema } from "@/lib/schemas";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import axiosInstance from "@/lib/axios";

type FormValues = z.infer<typeof UserformSchema>;

export function UserForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(UserformSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            company: "",
            department: "",
            role: "",
            avatar: undefined,
        },
    });

    const onSubmit = async(values: FormValues) => {
        try {
            const res= await axiosInstance.post('/users/',values)
            console.log(res)
            if (res.data.message==='user created successfully') {
                alert("user created successfully")
                
            } else {
                alert("response not suitable")
            }
        } catch (error) {
            throw new Error("something went wrong")
        }
        
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Email */}
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Password */}
                <FormField name="password" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />



                {/* Company */}
                <FormField name="company" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company ID</FormLabel>
                        <FormControl>
                            <Input placeholder="ACME12345" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Department */}
                <FormField name="department" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                            <Input placeholder="Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Role */}
                <FormField name="role" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <Input placeholder="Admin | Employee" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Avatar */}
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    // DO NOT SPREAD {...field} here
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file); // manually set the file
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Upload your avatar</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
