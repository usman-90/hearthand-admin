import { useState } from "react";
import "../../App.css";

import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaMoon, FaRegImage, FaRegUser } from "react-icons/fa";
// import { IoWalletOutline } from "react-icons/io5";
import { LuCalendarDays, LuWallet } from "react-icons/lu";
// import { PiChartLineLight } from "react-icons/pi";
import { ImFileText } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { BsTree } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { MdOutlineAreaChart } from "react-icons/md";

function SideBar() {
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currOption, setCurrOption] = useState("dashboard");

    return (
        <>
            <div
                className={`flex flex-col justify-between py-5 rounded-xl m-3 ${isCollapsed ? "w-20" : "w-60"
                    } bg-primary animate-width`}
            >
                <div>
                    <Link to={"/auth/dashboard"}>
                        <div className="flex items-center justify-start px-5 cursor-pointer">
                            <div
                                className="flex justify-start w-10 h-10 items-center"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                            </div>
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } text-white font-bold overflow-hidden text-lg`}
                            >
                                Heart Hand
                            </p>

                        </div>
                    </Link>

                    <Link to={"/auth/dashboard"}>
                        <div
                            onClick={() => setCurrOption("dashboard")}
                            className={`${isCollapsed && currOption === "dashboard"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start mt-10 text-3xl items-center cursor-pointer py-3 ${currOption === "dashboard" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "dashboard" ? "text-white" : ""}`}
                        >
                            <MdDashboard />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Dashboard
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/users"}>
                        <div
                            onClick={() => setCurrOption("users")}
                            className={`${isCollapsed && currOption === "users"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start text-3xl items-center cursor-pointer text- py-3 ${currOption === "users" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "users" ? "text-white" : ""}`}
                        >
                            <FaRegUser />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Users
                            </p>
                        </div>
                    </Link>
                    {/* <Link to={"/analytics"}>
            <div
              onClick={() => setCurrOption("analytics")}
              className={`${
                isCollapsed && currOption === "analytics"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${
                currOption === "analytics" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "analytics" ? "text-white" : ""}`}
            >
              <PiChartLineLight className="font-bold" />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Analytics
              </p>
            </div>
          </Link> */}
                    <Link to={"/auth/donations"}>
                        <div
                            onClick={() => setCurrOption("donations")}
                            className={`${isCollapsed && currOption === "donations"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${currOption === "donations" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "donations" ? "text-white" : ""}`}
                        >
                            <FaRegImage className="font-bold" />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                               Donations 
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/ngos"}>
                        <div
                            onClick={() => setCurrOption("ngos")}
                            className={`${isCollapsed && currOption === "ngos"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "ngos" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "ngos" ? "text-white" : ""}`}
                        >
                            <BsTree />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                               NGOs
                            </p>
                        </div>
                    </Link>
                    {
                    /*
                    <Link to={"/auth/settings"}>
                        <div
                            onClick={() => setCurrOption("settings")}
                            className={`${isCollapsed && currOption === "settings"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                                } cursor-pointer ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start text-3xl items-center tet-white py-3 ${currOption === "settings" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "settings" ? "text-white" : ""}`}
                        >
                            <MdOutlineSettings />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Settings
                            </p>
                        </div>
                    </Link>
                     */
                    }
                    <div
                        onClick={() => {
                            window.localStorage.removeItem("userData")
                            navigate("/")
                            window.location.assign("/")
                        }}
                        className={`${isCollapsed && currOption === "logout"
                            ? "bg-white text-primary rounded-lg py-1 px-1"
                            : ""
                            } cursor-pointer ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                            } flex justify-start text-3xl items-center tet-white py-3 ${currOption === "logout" && !isCollapsed
                                ? "rounded-l-xl bg-white text-primary"
                                : ""
                            } ${currOption !== "logout" ? "text-white" : ""}`}
                    >
                        <MdOutlineSettings />
                        <p
                            className={`${isCollapsed ? "w-0" : "ms-3"
                                } font-old overflow-hidden text-base`}
                        >
                            Logout
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SideBar;
