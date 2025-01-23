import { useEffect, useState } from "react"
import { SERVER_URL } from "../config"
import axios from "axios"
import { Table } from "antd"

const NGOs = () => {

    const [ngos, setNgos] = useState([])
    const [total, setTotal] = useState([])

    const getNgos = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/ngo/get_all?page_no=${1}`)
            setNgos(res?.data?.ngos)
            setTotal(res?.data?.total)
        } catch (e) {

        }
    }

    const deleteNgo = async (id: string) => {
        try {
            await axios.delete(`${SERVER_URL}/ngo/delete?id=${id}`)
            await getNgos()
        } catch (e) {

        }
    }


    useEffect(() => {
        getNgos()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Registration No',
            dataIndex: 'registration_no',
            key: 'registration_no',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Joined At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: string) => new Date(created_at).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: any) => (
                <button onClick={() => { deleteNgo(record?._id) }}>Delete</button>
            ),
        }
    ];

    console.log(ngos)
    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">
            NGOs
            </h1>
            <Table dataSource={ngos} columns={columns}  />
        </div>
    )
}

export default NGOs
