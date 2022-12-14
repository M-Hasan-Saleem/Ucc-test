import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { MoreVertical, Edit, Trash} from "react-feather";
import axios from "axios";
import animationPic from "../../assets/images/avtar/animation-pic.jpg";
import { Spinner } from "reactstrap";
import { Button } from "reactstrap";
import ReactPaginate from "react-paginate";
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import Default from '../../assets/images/default.png'
import './AllUsers.css'
import UpdateModal from './UpdateModal'

export default function AllUsers() {

    // Fetch Current User Data From LocalStorage
  const navigate = useNavigate();

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
      console.log(AdminData)  
      getAllUsers();
    }, [AdminData])

    const [pageno, setpageno] = useState(1)

    // Get All Users

    const [AllUsers, setAllUsers] = useState([])

    
    const forDesable = async ()=> {
      let response2 = await axios.put(`${baseUrl}/user/restrict/63212b73c289b9dcfe26a97b`, null,{
          headers: {Authorization: `Bearer ${AdminData?.jwtToken}`},
      });
    console.log(response2.data);
    getAllUsers()
  }

    const forEnable = async ()=> {
      let response3 = await axios.put(`${baseUrl}/user/enableUser/63212b73c289b9dcfe26a97b`, null,{
          headers: {Authorization: `Bearer ${AdminData?.jwtToken}`},
      });
    console.log(response3.data);
    getAllUsers()
    }
    const getAllUsers = async ()=> {
        let response = await axios.get(`${baseUrl}/user?page=${pageno}&limit=1`, {
            headers: {Authorization: `Bearer ${AdminData?.jwtToken}`},
        });
        
      
        let data = response.data;
        if(data.error){}else{
          setAllUsers(data?.results?.result);
        }
    }    

  const [animationlist, setanimationlist] = useState([]);
  const [PageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    triggeringFunction(currentPage);
  }, [currentPage]);

  const openAddAnimationModal = () => {
    document.getElementById("addpro").classList.add("show");
  };

  const triggeringFunction = async (currentPage) => {
   
    // let getData = await axios.get(`https://thewebtestlink.xyz/api/admin/getAnimation?page=${currentPage}&limit=10`, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    // });
    // setPageCount(Math.ceil(getData.data.totallength/10))
    // console.log(getData.data)
    // window.scrollTo(0, 0)
    // setanimationlist(getData.data.result);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); 
  }

  useEffect(() => {
    triggeringFunction(currentPage)
  }, [currentPage])
  

  return (
    <div>
      <button
        id="munnababa"
        style={{ display: "none" }}
        onClick={() => {
          triggeringFunction(currentPage);
        }}
      ></button>
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
                        <div className="col-md-9">
                          <div className="card-header">
                            <h4 className="card-title">All Users</h4>
                          </div>
                        </div>
                        <div className="col-md-3"></div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {AllUsers?.length !== 0 ? (
                        <Table hover responsive>
                          <thead>
                            <tr>
                                {/* <th>id</th>
                                <th>Profile Picture</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Online Status</th>
                                <th>Verification</th>
                                <th>Active Status</th> */}
                                <th>Status</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Update</th>
                                <th>Action</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllUsers?.map((v, i) => {
                              return (
                                <tr key={i}>
                                  {/* <td>
                                    <span className="align-middle fw-bold">
                                        {currentPage === 1 ? (i + 1) : ((i + (10 * (currentPage - 1)))+1)}
                                    </span>
                                  </td> */}
                                  <td>{v?.active ? "activated":"Deactivated"}</td>
                                  <td>{v?.email}</td>
                                  <td>{v?.fullName}</td>
                                  <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                          openAddAnimationModal();
                                        }}
                                      >
                                        <i className="fal fa-trash"></i>
                                        <span> Update</span>
                                    </button>
                                  </td>
                                  <td>
                                      {v?.active ? <button onClick={forDesable} className="pd-l">Deactivate</button> : <button onClick={forEnable}>Activate</button> }
                                  </td>
                                  {/* <td>
                                    <ReactFancyBox
                                        thumbnail={v?.profile_pic ?? Default}
                                        image={v?.profile_pic ?? Default}/>
                                  </td>
                                  <td>{v?.email}</td>
                                  <td>{v?.fullName}</td>
                                  <td style={v?.onlineStatus === 'ONLINE' ? {color: '#4ce54c', fontWeight: '500', textTransform: 'capitalize'} : {color: '#ff6b6b', fontWeight: '500', textTransform: 'capitalize'}}>{v?.onlineStatus}</td>
                                  <td style={v?.verify_user ? {color: '#4ce54c', fontWeight: '500'} : {color: '#ff6b6b', fontWeight: '500'}}>{v?.verify_user ? 'Verified' : 'Non Verified'}</td>
                                  <td>{
                                      v?.status === 1 ?
                                      <button>Active</button>
                                        :
                                      <button>Non Active</button>
                                      }</td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      ) : (
                        <div className="spiner">
                          <Spinner type="grow" color="primary" />
                          <Spinner type="grow" color="secondary" />
                          <Spinner type="grow" color="success" />
                        </div>
                      )}
                    </div>
                    {/* <ReactPaginate 
                      previousLabel={'<<'}
                      nextLabel={'>>'}
                      breakLabel={'...'}
                      pageCount={PageCount}
                      marginPagesDisplayed={3}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination justify-content-center'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                      previousClassName={'page-item'}
                      previousLinkClassName={'page-link'}
                      nextClassName={'page-item'}
                      nextLinkClassName={'page-link'}
                      breakClassName={'page-item'}
                      breakLinkClassName={'page-link'}
                      activeClassName={'active'}
                    /> */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <UpdateModal />
    </div>
  );
}
