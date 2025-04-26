"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User } from "@/lib/types"
import axiosInstance from "@/lib/axios"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const handleUpdate = async (e: string | number) => {

}

const handleDelete = async (id: string | number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?")

    if (!confirmDelete) return // If user clicks "Cancel", stop here

    console.log(id)
    try {
        const res = await axiosInstance.delete(`/users/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        if(res.data.message==='user deleted successfully'){

        }
        // Optionally: Refresh the table or show a success toast here
    } catch (error) {
        console.error('Error deleting user:', error)
    }
}


export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
   
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            const [open, setOpen] = useState(false) // <-- add open state for modal

            const handleOpenChange = (isOpen: boolean) => {
                setOpen(isOpen)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-bold ">Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user._id)}
                            >
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                           
                            

                            <DropdownMenuItem
                             asChild>
                                <AlertDialog>
                                    <AlertDialogTrigger className="text-sm ml-2">Update User</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction  onClick={(e) => handleUpdate(user._id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <AlertDialog open={open} onOpenChange={handleOpenChange}>
                                    <AlertDialogTrigger onClick={() => setOpen(true)} className="text-sm ml-2">Delete User</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this user
                                                and remove data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(user._id)}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Modal outside Dropdown */}

                </>
            )
        },
    },
]
