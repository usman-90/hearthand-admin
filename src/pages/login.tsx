import { message } from "antd";
import Form from "../components/login/form";
import Pic from '../../public/illustration.svg'

const Login = () => {
    const [_, contextHolder] = message.useMessage();

    return (
        <div>
            {contextHolder}
            <Form />
        </div>
    );
};

export default Login;
