import { FooterComponent } from "../components/footer";
import { Header } from "../components/header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="mx-auto w-full min-h-screen ">
      <Header />
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
