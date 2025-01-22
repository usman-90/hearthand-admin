import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../config";
// import { useNavigate } from "react-router-dom";

const Form : React.FC = () => {
  const [messageApi] = message.useMessage();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password?.length < 1) {
      messageApi.open({
        type: "error",
        content: "Password is required!",
      });
      return;
    } else if (!formData.email) {
      messageApi.open({
        type: "error",
        content: "Email can not be empty",
      });
      return;
    }
    
    try {
      const response = await axios.post(
        SERVER_URL + "/auth/admin/signin",
        formData
      );

      window.localStorage.setItem(
        "userData",
        JSON.stringify(response?.data)
      );
      console.log("yeah2", response?.data);
      messageApi.open({
        type: "success",
        content: "Logged in successfully",
      });
      window.location.assign("/auth/dashboard");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Ops! an error occured!",
      });
    }
  };

  return (
    <div>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
