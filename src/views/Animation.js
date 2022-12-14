import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Navigations/Topnav";
import Sidenav from "../components/Navigations/Sidenav";
import AnimationTable from "../components/Animations/AnimationTable"
export default function Home() {
    
  const navigate = useNavigate();

  useEffect(() => {
    
    if(localStorage.getItem('GotNextAdmin')){
    } else {
      console.log("siri not available");
      navigate("/Animation");
    }
  }, []);

  return (
    <div>
     <Topnav/>
     <Sidenav/>
     <AnimationTable/>
      
    </div>
  );
}
