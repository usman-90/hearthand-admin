import { message } from "antd";
import Form from "../components/login/form";

const Login = () => {
    const [_, contextHolder] = message.useMessage();

    return (
        <div className="bg-primary">
            {contextHolder}
            <Form />
        </div>
    );
};

export default Login;
