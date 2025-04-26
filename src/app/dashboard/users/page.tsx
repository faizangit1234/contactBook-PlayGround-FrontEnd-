import { columns } from '@/app/tableTest/columns'
import { DataTable } from '@/app/tableTest/data-table'
import { UserForm } from '@/components/forms/userForm'
import { Payment } from '@/lib/types'
import React from 'react'



async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}
const AdminUserDetails = async () => {
  const data = await getData()
  return (
    <>
      <section className="p-4 mx-4">
        <UserForm />
      </section>

      <section className="p-4 m-4">
        <DataTable columns={columns} data={data} />
      </section>
    </>
  )
}

export default AdminUserDetails