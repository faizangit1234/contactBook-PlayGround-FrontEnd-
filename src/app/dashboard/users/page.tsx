'use client'

import { columns } from '@/app/tableTest/columns'
import { DataTable } from '@/app/tableTest/data-table'
import { UserForm } from '@/components/forms/userForm'
import axiosInstance from '@/lib/axios'
import { User } from '@/lib/types'
import React, { useState, useEffect } from 'react'

const AdminUserDetails = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get('/users/');
        console.log(res);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users");
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="p-4 mx-4">
        <UserForm />
      </section>

      <section className="p-4 m-4">
        <DataTable<User, unknown> columns={columns} data={users} />

      </section>
    </>
  )
}

export default AdminUserDetails
