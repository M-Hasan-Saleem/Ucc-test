import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import axios from "axios";
import { Spinner } from "reactstrap";
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import { baseUrl } from "../../utils/baseUrl";
import AddGroupModal from "./AddGroupModal";
import AddMemberModal from "./AddMemberModal";
import Default from '../../assets/images/default.png'
import './AllGroups.css'  

export default function AllUsers() {

    // Fetch Current User Data From LocalStorage
    const openAddGroup = () => {
      document.getElementById("addNewGroup").classList.add("show");
    };

    const openAddModal = () => {
      document.getElementById("addNewMember").classList.add("show");
    };

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
        getAllUsers();
    }, [AdminData])
    

    // Get All Users
    
    const [AllUsers, setAllUsers] = useState([])
    const getAllUsers = async ()=> {
        let response = await axios.get(`${baseUrl}/groups/getAllGroupList?limit=100&page=0`, {
            headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`},
        });
        let data = response.data;
        console.log(data);
        setAllUsers(data?.message);
    }    

  const [animationlist, setanimationlist] = useState([]);
  const [PageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    triggeringFunction(currentPage);
  }, [currentPage]);

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
                            <h4 className="card-title">All Groups</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="eid-btn text-right">
                            {/* <button className="btn btn-outline-primary mar-r" onClick={() => {openAddGroup();}}>
                              <i className="fal fa-plus"></i> 
                                <span> Add New Group</span>
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {AllUsers?.length !== 0 ? (
                        <Table hover responsive>
                          <thead>
                            <tr>
                                <th>id</th>
                                <th>Group Name</th>
                                <th>Group Description</th>
                                <th>Rules</th>
                                <th>Profile Picture</th>
                                <th>Verification</th>
                                <th>Action</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllUsers?.reverse().map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <span className="align-middle fw-bold">
                                        {currentPage === 1 ? (i + 1) : ((i + (10 * (currentPage - 1)))+1)}
                                    </span>
                                  </td>
                                  <td>
                                    {v?.group_name}
                                  </td>
                                  <td>{v?.group_description}</td>
                                  <td>{v?.rules}</td>
                                  <td>
                                  <ReactFancyBox
                                        thumbnail={v?.profilePic ?? Default}
                                        image={v?.profilePic ?? Default}/>
                                  </td>
                                  <td style={v?.verify_user ? {color: '#4ce54c', fontWeight: '500'} : {color: '#ff6b6b', fontWeight: '500'}}>{v?.verify_user ? 'Verified' : 'Non Verified'}</td>
                                  <td>
                                      <button>Action</button>
                                  </td>
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
      <AddGroupModal getAllGroupsAPI={getAllUsers} />
      <AddMemberModal />
    </div>
  );
}
