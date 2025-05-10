//@ts-ignore
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateDoc from "./components/CreateDoc";
import Sidebar from "./components/Sidebar";



const App = () => {

  const token = localStorage.getItem("token");


  return <div>

    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={token ? <DashBoard /> : <SignUp />} />
        <Route path="/create" element={<CreateDoc />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router >
  </div>
}
export default App