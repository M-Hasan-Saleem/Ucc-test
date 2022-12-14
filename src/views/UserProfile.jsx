import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Navigations/Topnav";
import Sidenav from "../components/Navigations/Sidenav";
import UserProfile from "../components/Profile/UserProfile";
export default function Home() {
    
  const navigate = useNavigate();

  useEffect(() => {
    
    if (localStorage.getItem("GotNextAdmin")) {
    } else {
      console.log("siri not available");
      navigate("/login");
    }
  }, []);

  return (
    <div>
     <Topnav/>
     <Sidenav/>
     <UserProfile/>
    </div>
  );
}
