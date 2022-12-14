import React, { useEffect, useState } from "react";
import Profilepic from "../../assets/images/profile/01.png";
import "./Profile.css"
import 'react-fancybox/lib/fancybox.css'
import { baseUrl, domain } from "../../utils/baseUrl";
import PasswordModal from "./PasswordModal";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ChatsModal from "./ChatsModal";

export default function UserProfile() {

    const params = useParams();

    const [AdminData, setAdminData] = useState([]);
    const [CurrentUserData, setCurrentUserData] = useState([])
    const [CurrentUserChat, setCurrentUserChat] = useState([])
    const [CurrentUserChatName, setCurrentUserChatName] = useState([])
    const [CurrentUserName, setCurrentUserName] = useState('')  
    const [EditingStatus, setEditingStatus] = useState(false)

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const getCurrentUserDetails = async () => {
        console.log(baseUrl);
        console.log(params.userProfileId);
        console.log(AdminData);
        let response = await axios.get(`${baseUrl}/users/${params.userProfileId}`, {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}})
        setCurrentUserData(response?.data?.message);
        setCurrentUserName(response?.data?.message.full_name);
        console.log(response?.data?.message);
        setEditingStatus(false)
    }

    const showChatWithClickedUser = (index) => {
      setCurrentUserChat(CurrentUserData.chatFriends[index].chat)
      setCurrentUserChatName(CurrentUserData.chatFriends[index].userId)
      document.getElementById("theChats").classList.add("show");
    }

    const updateCurrentUser = async () => {
      let data = {
        "_id":params.userProfileId,
        "full_name":CurrentUserName,
        "status" : 0,
        "comments" : "applied"
      }
      let response = await axios.put(`${baseUrl}/users/update`, data, {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}})
      console.log(response);
      getCurrentUserDetails();
    }


    useEffect(() => {
        console.log(params);
        getCurrentUserDetails();
    }, [params, AdminData])
    
  
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
                            <h4 className="card-title">User Profile</h4>
                          </div>
                        </div>
                        <div className="col-md-6">
                        <div className="eid-btn">
                          {
                            EditingStatus ?
                            <button className="btn btn-outline-primary mar-r" onClick={()=>{
                              // document.getElementById('anyUserEdit').click();
                              updateCurrentUser()
                              }}>
                              <i className="fal fa-check"></i> 
                                <span> Update</span>
                            </button>
                            :
                            <button className="btn btn-outline-primary mar-r" onClick={()=>{
                              // document.getElementById('anyUserEdit').click();
                              setEditingStatus(true)
                              }}>
                              <i className="fal fa-edit"></i> 
                                <span> Edit Profile</span>
                            </button>

                          }
                            {/* {
                              IsUserEdit ?
                              <button onClick={()=>{updateUser()}} type="button" className="btn btn-outline-primary mar-r"><i className="fal fa-plus"></i>
                                <span> Update Username</span>
                              </button>
                              :
                              <button onClick={()=>{SetIsUserEdit(true)}} type="button" className="btn btn-outline-primary mar-r"><i className="fal fa-plus"></i>
                                <span> Edit Username</span>
                              </button>
                            } */}
                            {/* <button className="btn btn-outline-primary" onClick={() => {openPassword();}}>
                            <i className="fal fa-plus"></i> 
                              <span> Change Password</span>
                          </button> */}
                          </div>
                        </div>
                      </div>
                      <div className="row pad-lr">
                        <div className="col-2">
                          <span className="profile-pic">
                            <img src={CurrentUserData?.profilePic === undefined ? Profilepic : `${domain}${CurrentUserData?.profilePic}`} alt="profile"/>
                          </span>
                        </div>
                        <div className="col-10">
                          <div className="pro-h">
                            <ul className="userProfileItems">
                                <li><b>Name:</b>&nbsp;
                                  {EditingStatus ? 
                                    <input type='text' value={CurrentUserName} onChange={(e)=>{setCurrentUserName(e.target.value)}} />
                                    :
                                    CurrentUserData?.full_name
                                  }
                                 
                                 </li>
                                <li><b>Email:</b>&nbsp; {CurrentUserData?.email}</li>
                                <li><b>Phone No:</b>&nbsp; {CurrentUserData?.phone_no ?? '-' }</li>
                                <li style={{color: CurrentUserData?.onlineStatus === 'ONLINE' ? 'green' : 'red'}} ><b>Online Status:</b>&nbsp; {CurrentUserData?.onlineStatus}</li>
                                <li><b>Verified Status:</b>&nbsp; {
                                    CurrentUserData?.verify_user ? <button className="green">Verified</button> : <button className="red">Not Verified</button> 
                                }</li>
                                <li><b>Activation Status:</b>&nbsp; {
                                    CurrentUserData?.status === 1 ? <button className="green">Active</button> : <button className="red">InActive</button> 
                                }</li>
                                <li><b>Followers:</b>&nbsp; {CurrentUserData?.totalFollowers}</li>
                                <li><b>Followings:</b>&nbsp; {CurrentUserData?.totalFollowings}</li>
                                <li><b>Posts:</b>&nbsp; {CurrentUserData?.totalPosts}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" id="table-hover-row">
                <div className="col-12">
                  <div className="card">
                    <div className="crd-wrp">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="card-header">
                            <h4 className="card-title">{CurrentUserData?.chatFriends?.length > 0 ? "Chats with..." : 'No Chats Yet'}</h4>
                          </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-12">
                            <ul className='chatList'>
                            {
                                CurrentUserData?.chatFriends?.length > 0 ?
                                    CurrentUserData?.chatFriends.map((v,i)=>{
                                        return(
                                            <li key={i}><button value={i} className="btn btn-outline-primary" onClick={(e)=>{showChatWithClickedUser(e.target.value)}}>{v?.userId}</button></li>
                                        )
                                    })
                                    :
                                    <></>
                            }
                            </ul>
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
      <ChatsModal chat={CurrentUserChat} chatWithName={CurrentUserChatName} />
    </div>
  );
}
