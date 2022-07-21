import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Shared/Header";
import Footer from "./Component/Shared/Footer";
import Home from "./Component/Home";
import About from "./Component/About";
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import Wumpus from "./Component/Wumpus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Component/Firebase/RequireAuth";
import EmailVerification from "./Component/EmailVerification";
import ForgetPass from "./Component/ForgetPass";
import Dashboard from "./Component/Dashboard/Dashboard";
import Profile from "./Component/Profile";
import UploaderProfile from "./Component/UploaderProfile";
import MyAnimations from "./Component/MyAnimations";
import AddWumpus from "./Component/AddWumpus";
import ManageAnimation from "./Component/ManageAnimation";
import EditWumpus from "./Component/EditAnimation";
// import NotReqAuth from "./Component/Firebase/NotReqAuth";
import AllUser from "./Component/AllUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RequireAdmin from "./Component/Firebase/RequireAdmin";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/signIn"
          element={
            // <NotReqAuth>
            <SignIn />
            // </NotReqAuth>
          }
        ></Route>
        <Route
          path="/signUp"
          element={
            // <NotReqAuth>
            <SignUp />
            // </NotReqAuth>
          }
        ></Route>
        <Route
          path="/emailVerification"
          element={<EmailVerification />}
        ></Route>
        <Route path="/forgetPassword" element={<ForgetPass />}></Route>
        <Route
          path="/wumpus/:id"
          element={
            <RequireAuth>
              <Wumpus />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/editWumpus/:id"
          element={
            <RequireAuth>
              <EditWumpus />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/profile/:email"
          element={
            <RequireAuth>
              <UploaderProfile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAnimations />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route
            path="addNew"
            element={
              <RequireAdmin>
                <AddWumpus />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manage"
            element={
              <RequireAdmin>
                <ManageAnimation />
              </RequireAdmin>
            }
          ></Route>
          <Route path="own" element={<MyAnimations />}></Route>
          <Route
            path="users"
            element={
              <QueryClientProvider client={queryClient}>
                <RequireAdmin>
                  <AllUser />
                </RequireAdmin>
              </QueryClientProvider>
            }
          ></Route>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
