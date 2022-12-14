import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Navigations/Topnav";
import Sidenav from "../components/Navigations/Sidenav";
import Logo from "../assets/images/got.png"
export default function Home() {
  
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
    <div className="app-content content">
    <div className="content-wrapper container-xxl p-0">
    <section id="dashboard-ecommerce">
                    <div className="row">
                     
                    
                        
                        <div className="col-xl-12 col-md-12 col-12">
                            <div className="card card-statistics">
                               <div className="dashpic">
                               <img src={Logo} alt="profile"/>
                                 <div className="wel">
                                   <h1>Welcome to <span>UCC on</span> Demand Dashboard</h1>
                                 </div>
                               </div>
                            </div>
                        </div>
                        
                    </div>

                   
                </section>
                </div>
    </div>
      
    </div>
  );
}
