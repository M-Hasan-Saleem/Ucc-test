import React, { useEffect, useState } from "react";
import FancyVideo from 'react-videojs-fancybox';
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { MoreVertical, Edit, Trash } from "react-feather";
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
import './AllVideos.css'
import AddProduct from "./AddProduct";
import AddSeries from "./AddSeries";
import ReactPlayer from 'react-player/youtube'

export default function AllVideos() {

  // Fetch Current User Data From LocalStorage
  const navigate = useNavigate();

  const [AdminData, setAdminData] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('GotNextAdmin');
    setAdminData(JSON.parse(data))
  }, [])

  useEffect(() => {
    console.log(AdminData)
    getAllVideos();
  }, [AdminData, reload])

  // Get All Users

  const [AllVideos, setAllVideos] = useState([])



  const getAllVideos = async () => {
    let response = await axios.get(`${baseUrl}/video`, {
      headers: { Authorization: `Bearer ${AdminData?.jwtToken}` },
    });
    console.log(response)
    let data = response.data;
    if (data.error) { } else {
      setAllVideos(data?.videos);
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

  const openAddAnimationModal = () => {
    document.getElementById("addpro").classList.add("show");
  };

  const openAddAnimationModal2 = () => {
    document.getElementById("addpro2").classList.add("show");
  };

  function deleteVideo(id){
    let response = axios.delete(`${baseUrl}/video/${id}`, {
      headers: { Authorization: `Bearer ${AdminData?.jwtToken}` },
    });
    let data = response.data;
    getAllVideos();
    console.log(response);
  }

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
                            <h4 className="card-title">All Videos</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="eid-btn">
                            
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => {
                                openAddAnimationModal();
                              }}
                            >
                              <i className="fal fa-plus"></i>
                              <span> Add New Video</span>
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {AllVideos?.length !== 0 ? (
                        <Table hover responsive>
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Channel</th>
                              <th>Description</th>
                              <th>Play Video</th>
                              <th>Delete Video</th>
                              <th>Add Series</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllVideos?.map((v, i) => {
                              console.log(v?.privatePath);
                              return (
                                <tr key={i}>
                                  <td>{v?.title}</td>
                                  <td>{v?.channel}</td>
                                  <td>{v?.description}</td>
                                  <td className="rel-div">
                                    {/* <FancyVideo 
                                    style={{width:"60px"}}
                                    source={v?.privatePath}
                                    poster="https://raw.githubusercontent.com/waskito/react-modal-videojs/master/example/public/preview.png"
                                    id={v._id}
                                  /> */}
                                    <a
                                      href={v.privatePath}
                                      target="_blank"    
                                      style={{fontSize: '28px'}}                                >
                                      {/* <ReactPlayer width={'150px'} height={'150px'} url={v?.privatePath} /> */}
                                      <i className="fa fa-play"></i>
                                    </a>
                                  </td>
                                  <td>
                                    <button onClick={() => deleteVideo(v._id)} value={v._id}>Delete</button>
                                  </td>
                                  <td>
                                    <button onClick={() => {openAddAnimationModal2();}}>Add&nbsp;New</button>
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
      <AddProduct reload={reload} setReload={setReload} />
      <AddSeries />
    </div>
  );
}
