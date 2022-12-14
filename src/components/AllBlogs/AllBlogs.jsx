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
import { Spinner } from "reactstrap";
import 'react-fancybox/lib/fancybox.css'
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import './AllBlogs.css'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'
import AddProduct from './AddProduct'


export default function AllCategories() {

    // Fetch Current User Data From LocalStorage
  const navigate = useNavigate();
  const [tempid, settempid] = useState('');

  const [reload, setReload] = useState(false);

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
      console.log(AdminData)  
      getAllUsers();
    }, [AdminData, reload]);

    const [pageno, setpageno] = useState(1)

    // Get All Users

    const [AllUsers, setAllUsers] = useState([])

    
    const openAddAnimationModal = () => {
      document.getElementById("addpro").classList.add("show");
    };

    const openAddAnimationModal2 = () => {
      document.getElementById("addpro2").classList.add("show");
    };

    const openAddAnimationModal3 = () => {
      document.getElementById("addpro3").classList.add("show");
    };

    const getAllUsers = async ()=> {
        let response = await axios.get(`${baseUrl}/blog`, {
            headers: {Authorization: `Bearer ${AdminData?.jwtToken}`},
        });
        
      
        let data = response.data;
        if(data.error){}else{
          setAllUsers(data?.data);
        }
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
                            <h4 className="card-title">All Blogs</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="eid-btn">
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  openAddAnimationModal3();
                                }}
                              >
                                <i className="fal fa-plus"></i>
                                <span> Add New Category</span>
                              </button>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {AllUsers?.length !== 0 ? (
                        <Table hover responsive>
                          <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Created Date</th>
                                <th>Last Update Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllUsers?.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{v?._id}</td>
                                  <td>{v?.title}</td>
                                  <td>{v?.createdAt}</td>
                                  <td>{v?.updatedAt}</td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        openAddAnimationModal2();
                                      }}
                                    >
                                      <i className="fal fa-edit"></i>
                                      <span> Update</span>
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        settempid(v?._id)
                                        openAddAnimationModal();
                                      }}
                                    >
                                      <i className="fal fa-trash"></i>
                                      <span> Delete</span>
                                    </button>
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
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <DeleteModal selectedId={tempid} />
      <UpdateModal />
      <AddProduct setReload={setReload} reload={reload} />
    </div>
  );
}
