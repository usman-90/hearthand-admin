import { useEffect, useState } from "react"
import { SERVER_URL } from "../config"
import axios from "axios"
import { Table } from "antd"

const Donations = () => {

    const [donations, setDonations] = useState([])
    const [_, setTotal] = useState([])

    const getDonations = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/donation/get_all?page_no=${1}`)
            setDonations(res.data.donations)
            setTotal(res?.data?.total)
        } catch (e) {

        }
    }

    const deleteUser = async (id: string) => {
        try {
            await axios.delete(`${SERVER_URL}/donation/delete?id=${id}`)
            await getDonations()
        } catch (e) {

        }
    }


    useEffect(() => {
        getDonations()
    }, [])

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user: any) => user?.name
        },
        {
            title: 'Ngo',
            dataIndex: 'selected_ngo',
            key: 'selected_ngo',
            render: (ngo: any) => ngo?.name
        },
        {
            title: 'Donation Type',
            dataIndex: 'donation_type',
            key: 'donation_type',
        },
        {
            title: 'Dates',
            dataIndex: 'selected_range',
            key: 'selected_range',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
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

    console.log(donations)
    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">
               Donations 
            </h1>
            <Table dataSource={donations} columns={columns} />
        </div>
    )
}

export default Donations
