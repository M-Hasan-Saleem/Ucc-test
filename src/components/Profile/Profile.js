import React, { useEffect, useState } from "react";
import Profilepic from "../../assets/images/profile/01.png";
import "./Profile.css"
import 'react-fancybox/lib/fancybox.css'
import { baseUrl, domain } from "../../utils/baseUrl";
import PasswordModal from "./PasswordModal";
import axios from 'axios';

export default function Tables() {
  // Fetch Current User Data From LocalStorage
  const openPassword = () => {
    document.getElementById("addNewPassword").classList.add("show");
  };
  
  const [AdminData, setAdminData] = useState([]);
  const [userName, setuserName] = useState('');
  const [Email, setEmail] = useState('')
  const [profilePicUrl, setprofilePicUrl] = useState('')

  useEffect(() => {
      let data =  localStorage.getItem('GotNextAdmin');
      setAdminData(JSON.parse(data))
  }, [])

  useEffect(() => {
    setuserName(AdminData.full_name);
    setEmail(AdminData.email)
    setprofilePicUrl(AdminData.profilePic)
  }, [AdminData])

  useEffect(() => {
    console.log(profilePicUrl);
  }, [profilePicUrl])
  
  
  const [IsUserEdit, SetIsUserEdit] = useState(false)

  
  const updateUser = async () => {
    let data = {
      _id: AdminData?._id,
      full_name: userName,
    }
    let response = await axios.put(`${baseUrl}/users/update`,data , {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}})
    localStorage.setItem('GotNextAdmin', JSON.stringify(response?.data?.message));
    let newData =  localStorage.getItem('GotNextAdmin');
    setAdminData(JSON.parse(newData))
    SetIsUserEdit(false);
  }

  const uploadProfilePicture = async (e) => {
    let image = e.target.files[0]
    console.log(image);
    let data = new FormData();
    data.append('profilePicture', image);

    let response = await axios.post(`${baseUrl}/users/profilePic/${AdminData._id}` ,data ,{headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}}) 
    console.log(response);

    let newData = await axios.get(`${baseUrl}/users/${AdminData?._id}`, {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}}) 
    localStorage.setItem('GotNextAdmin', JSON.stringify(newData?.data?.message));
  }
  
  return (
    <div>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-row">
                <div className="col-12">
                  <div className="card">
                    <div className="crd-wrp">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="card-header">
                            <h4 className="card-title">Profile</h4>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="eid-btn">
                          <button className="btn btn-outline-primary mar-r" onClick={()=>{document.getElementById('profileInput').click();}}>
                            <i className="fal fa-plus"></i> 
                              <span> Upload Profile Picture</span>
                          </button>
                            {
                              IsUserEdit ?
                              <button onClick={()=>{updateUser()}} type="button" className="btn btn-outline-primary mar-r"><i className="fal fa-plus"></i>
                                <span> Update Username</span>
                              </button>
                              :
                              <button onClick={()=>{SetIsUserEdit(true)}} type="button" className="btn btn-outline-primary mar-r"><i className="fal fa-plus"></i>
                                <span> Edit Username</span>
                              </button>
                            }
                            <button className="btn btn-outline-primary" onClick={() => {openPassword();}}>
                            <i className="fal fa-plus"></i> 
                              <span> Change Password</span>
                          </button>
                          </div>
                        </div>
                      </div>
                      <div className="row pad-lr">
                        <div className="col-2">
                          <span className="profile-pic">
                            <img src={`${domain}${profilePicUrl}`} alt="profile"/>
                            <input type='file' id="profileInput" style={{display:'none'}} onChange={uploadProfilePicture} />
                            {/* <button className="upload-btn" onClick={()=>{document.getElementById('profileInput').click();}}>Upload</button> */}
                            {/* onClick={()=>{document.getElementById('profileInput').click();}} */}
                          </span>
                        </div>
                        <div className="col-10">
                          <div className="pro-h">
                            {
                              IsUserEdit ?
                                <input type="text" className="fom1" value={userName} onChange={(e)=>{setuserName(e.target.value)}}></input>
                              :
                              <h1>{userName}</h1>
                            }
                            <h4>{Email}</h4>
                            <span><a href="#"><i className="fab fa-facebook"></i></a></span>
                            <span><a href="#"><i className="fab fa-instagram"></i></a></span>
                            <span><a href="#"><i className="fab fa-twitter"></i></a></span>                         
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <PasswordModal/>
    </div>
  );
}
