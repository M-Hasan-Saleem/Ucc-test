import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Navigations/Topnav";
import Sidenav from "../components/Navigations/Sidenav";
import Orders from "../components/Orders/Orders";
export default function AllUser() {
  
  const navigate = useNavigate();

  useEffect(() => {
    
    if(localStorage.getItem('GotNextAdmin')){
    } else {
      console.log("siri not available");
      navigate("/login");
    }
  }, []);

  // const navigate= useNavigate();

  return (
    <div>
        <Topnav/>
        <Sidenav/>
        <Orders />    

    </div>
  );
}
