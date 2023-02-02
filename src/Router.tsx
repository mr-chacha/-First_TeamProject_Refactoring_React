import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
import Loginpage from "./Page/Login/Login";
import HomePage from "./Page/Home/Home.Page";
import Mypage from "./Page/MyPage/MyPage";
import SignupPage from "./Page/Signup/Signup";
import styled from "styled-components";
import Footer from "./Component/Footer/Footer";
function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="Login" element={<Loginpage />} />
          <Route path="Signup" element={<SignupPage />} />
          <Route path="MyPage" element={<Mypage />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
const Layout = styled.div`
  width: 1920;
  height: 1020;
`;
