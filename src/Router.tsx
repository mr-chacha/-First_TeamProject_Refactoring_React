import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import LoginPage from "./Page/LoginPage";
import MainPage from "./Page/MainPage";
import Mypage from "./Page/MyPage";
import SignupPage from "./Page/Signup";
import styled from "styled-components";
import Footer from "./Component/Footer";
function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Login" element={<LoginPage />} />
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
