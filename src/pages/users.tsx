import { useEffect, useState } from "react"
import { SERVER_URL } from "../config"
import axios from "axios"
import { Table } from "antd"

const Users = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/user/get_all`)
            setUsers(res.data)
        } catch (e) {

        }
    }

    const deleteUser = async (email: string) => {
        try {
            await axios.delete(`${SERVER_URL}/user/delete_one_by_email?email=${email}`)
            await getUsers()
        } catch (e) {

        }
    }


    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Joined at',
            dataIndex: 'created_at',
            key: 'is_email_verified',
            render: (created_at: string) => new Date(created_at).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: any) => (
                <button onClick={() => { deleteUser(record?.email) }}>Delete</button>
            ),
        }
    ];

    console.log(users)
    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">
                Users
            </h1>
            <Table dataSource={users} columns={columns} />
        </div>
    )
}

export default Users
