import Button from "antd/es/button";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import LoginForm from "../forms/auth-forms/LoginForm";
import RegistrationForm from "../forms/auth-forms/ReigstrationForm";
export default function NonAuthNavBar() {
  return (
    <nav style={{zIndex:1000}} className="md:w-full w-[100vw] bg-[#2fb9ff]    lg:px-60  fixed top-0 left-0 h-[95px] flex items-center justify-between px-10 z-100">
      <div>
        <h1 className="text-white text-2xl font-bold  md:flex hidden">Nine Sky</h1>
      </div>
      <div className="flex  space-x-4  ">
        <button>
          <LoginForm />
        </button>

        <button>
          <RegistrationForm />
        </button>
      </div>
    </nav>
  );
}
