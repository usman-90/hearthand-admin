import React, { useState } from "react";
import { Tag, Modal, Button, Table, DatePicker } from "antd";
import { ColumnsType } from "antd/es/table";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

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

    const [dashboardData, setDashboardData] = useState()

    const get_data = () => {
            try{
                
            }
    }
    const donationRequests: DonationRequest[] = [
        {
            id: 1,
            donor: "John Doe",
            items: "Clothes, Shoes",
            address: "123 Main St.",
            status: "Pending",
            pickupDate: "Jan 25, 2025",
        },
        {
            id: 2,
            donor: "Jane Smith",
            items: "Bags, Jackets",
            address: "456 Maple Ave.",
            status: "Delivered",
            pickupDate: "Jan 20, 2025",
        },
        {
            id: 3,
            donor: "Alice Johnson",
            items: "Books, Toys",
            address: "789 Oak Blvd.",
            status: "PickedUp",
            pickupDate: "Jan 18, 2025",
        },
    ];

    const pieData = {
        labels: ["Pending", "Delivered", "PickedUp"],
        datasets: [
            {
                data: [5, 7, 3],
                backgroundColor: ["#FFCD56", "#4CAF50", "#6A0B37"],
                hoverBackgroundColor: ["#FFB74D", "#66BB6A", "#A3144E"],
            },
        ],
    };

    const barData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Monthly Donations",
                data: [30, 20, 40, 35, 50, 60, 55, 40, 65, 70, 45, 80],
                backgroundColor: "#6A0B37",
                borderColor: "#6A0B37",
                borderWidth: 1,
            },
        ],
    };

    const columns: ColumnsType<DonationRequest> = [
        { title: "Donor Name", dataIndex: "donor", key: "donor" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Items", dataIndex: "items", key: "items" },
        { title: "Pickup Date", dataIndex: "pickupDate", key: "pickupDate" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div>
                    <Button
                        style={{
                            backgroundColor: "#6A0B37",
                            color: "#fff",
                            marginRight: "8px",
                        }}
                        onClick={() => handleViewDetails(record)}
                    >
                        View Details
                    </Button>
                    <Button style={{ backgroundColor: "#FFCD56", color: "#fff" }}>
                        Confirm
                    </Button>
                </div>
            ),
        },
    ];

    const handleViewDetails = (request: DonationRequest) => {
        setSelectedRequest(request);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedRequest(null);
    };

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
                    <DatePicker onChange={(e, d) => console.log(e.$M, e.$y)} picker="month" />
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
                    <h3 style={{ color: "#6A0B37" }}>Monthly Donations</h3>
                    <Bar data={barData} />
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
                <h3 style={{ color: "#6A0B37" }}>Donation Requests</h3>
                <Table
                    dataSource={donationRequests}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
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
