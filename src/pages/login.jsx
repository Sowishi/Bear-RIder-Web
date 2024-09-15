import Default from "../layout/default";
import logo from "../assets/LOGO 1 (1).png";
import { LoginForm } from "../components/loginForm";

const Login = () => {
  return (
    <>
      <div className="w-full  h-screen flex">
        <div className="hidden basis-6/12 lg:flex justify-center items-center">
          <img width={500} src={logo} alt="Flowbite React Logo" />
        </div>
        <div className="basis-full lg:basis-6/12 flex justify-center items-center ">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
