import React, { useEffect, useState } from "react";
import { Tag, Modal, Table, DatePicker } from "antd";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import axios from "axios";
import { SERVER_URL } from "../config";
import { FaArrowUp, FaRegUser } from "react-icons/fa";
import { BsTree } from "react-icons/bs";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

interface DonationRequest {
    id: number;
    donor: string;
    items: string;
    address: string;
    status: "Pending" | "Delivered" | "PickedUp";
    pickupDate: string;
}

const Dashboard: React.FC = () => {


    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] =
        useState<DonationRequest | null>(null);

    const [dashboardData, setDashboardData] = useState({})


    const [donations, setDonations] = useState([])

    const getDonations = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/donation/get_all?page_no=${1}`)
            setDonations(res.data?.donations?.slice(0, 5))
        } catch (e) {

        }
    }


    useEffect(() => {
        getDonations()
    }, [])



    const get_data = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/ngo/get_admin_dashboard_data?month=${month}&year=${year}`)
            setDashboardData(res.data)
        } catch (e) {

        }
    }

    useEffect(() => {
        get_data()
    }, [month, year])

    const pieData = {
        labels: ["Total Donations", "Active Donations", "Completed Donations"],
        datasets: [
            {
                //@ts-ignore
                data: [dashboardData?.donation_data?.total_donation, dashboardData?.donation_data?.active_donations, dashboardData?.donation_data?.total_donations - dashboardData?.donation_data?.active_donations],
                backgroundColor: ["#FFCD56", "#4CAF50", "#6A0B37"],
                hoverBackgroundColor: ["#FFB74D", "#66BB6A", "#A3144E"],
            },
        ],
    };
    console.log(pieData.datasets[0], "pieeeeeee", dashboardData)


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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Item Type',
            dataIndex: 'item_type',
            key: 'item_type',
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
    ];


    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedRequest(null);
    };
    console.log(donations, "DONNN")

    return (
        <div
            style={{
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <header
                style={{
                    backgroundColor: "#6A0B37",
                    padding: "15px 20px",
                    color: "white",
                    borderRadius: "8px",
                }}
            >
                <h1>Admin Dashboard</h1>
            </header>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                }}
            >
                <div
                    style={{
                        flex: "0.45",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <DatePicker onChange={(e) => {
                        // @ts-expect-error
                        setYear(e.$y)
                        // @ts-expect-error
                        setMonth(e.$M)
                    }} picker="month" />
                    <h3 style={{ color: "#6A0B37" }}>Donation Status</h3>
                    <Pie data={pieData} />
                </div>
                <div
                    style={{
                        flex: "0.45",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h3 style={{ color: "#6A0B37" }}>NGO's growth</h3>
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <BsTree className="text-3xl text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900"> Total NGOs</h3>
                            {/*@ts-expect-error*/}
                            <p className="text-2xl font-semibold text-gray-700">{dashboardData?.ngo_data?.total_ngos}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md my-4 rounded-lg p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <FaArrowUp className="text-3xl text-green-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">NGOs joined this month</h3>
                            {/*@ts-expect-error*/}
                            <p className="text-2xl font-semibold text-gray-700">{dashboardData?.ngo_data?.this_month}</p>
                        </div>
                    </div>
                    <h3 style={{ color: "#6A0B37" }}>User's growth</h3>
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <FaRegUser className="text-3xl text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900"> Total Users</h3>
                            {/*@ts-expect-error*/}
                            <p className="text-2xl font-semibold text-gray-700">{dashboardData?.user_data?.total_users}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md my-4 rounded-lg p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <FaArrowUp className="text-3xl text-green-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Users joined this month</h3>
                            {/*@ts-expect-error*/}
                            <p className="text-2xl font-semibold text-gray-700">{dashboardData?.user_data?.this_month}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: "20px",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h3 style={{ color: "#6A0B37" }}>5 Recent Donation Requests</h3>
                <Table
                    dataSource={donations}
                    columns={columns}
                />
            </div>

            {/* Modal for Viewing Details */}
            {selectedRequest && (
                <Modal
                    title="Donation Details"
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <p>
                        <strong>Donor:</strong> {selectedRequest.donor}
                    </p>
                    <p>
                        <strong>Address:</strong> {selectedRequest.address}
                    </p>
                    <p>
                        <strong>Items:</strong> {selectedRequest.items}
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <Tag
                            color={
                                selectedRequest.status === "Delivered" ? "green" : "#6A0B37"
                            }
                        >
                            {selectedRequest.status}
                        </Tag>
                    </p>
                    <p>
                        <strong>Pickup Date:</strong> {selectedRequest.pickupDate}
                    </p>
                </Modal>
            )}
        </div>
    );
};

export default Dashboard;
