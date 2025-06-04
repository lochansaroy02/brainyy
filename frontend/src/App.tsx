//@ts-ignore
import axios from "axios";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useContentStore, useDocsStore } from "./utils/store";



const App = () => {

  const { setContent } = useContentStore();


  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/content/fetch", {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      });
      const data = response.data.data;
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }





  useEffect(() => {
    localStorage.getItem("token") && getData()
  }, [])

  return <div>

    <Router>
      <Routes>
        <Route path="/" element={localStorage.getItem("token")
          ? <DashBoard /> : <Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router >
  </div>
}
export default App