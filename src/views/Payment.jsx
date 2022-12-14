import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Navigations/Topnav";
import Sidenav from "../components/Navigations/Sidenav";
import PaymentTab from "../components/Payment/PaymentTab";


export default function Payment() {
    
  const navigate = useNavigate();

  useEffect(() => {
    
    if(localStorage.getItem('GotNextAdmin')){
    } else {
      console.log("siri not available");
      navigate("/");
    }
  }, []);

  return (
    <div>
     <Topnav/>
     <Sidenav/>
     <PaymentTab />
      
    </div>
  );
}
