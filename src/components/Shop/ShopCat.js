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
import { baseUrl, domain } from "../../utils/baseUrl";
import DefaultProduct from '../../assets/images/deafultProduct.png'
import './Shop.css'
import AddCat from "./AddCat";

export default function ShopCat() {

    // Fetch Current User Data From LocalStorage

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
        getAllUsers();
      }, [AdminData])
      
      const [CatName, setCatName] = useState('')

    // Get All Users

    const [AllUsers, setAllUsers] = useState([])
    const [hitToGetAllData, sethitToGetAllData] = useState(false)

    const getAllUsers = async ()=> {
        let response = await axios.get(`${baseUrl}/shop_category/getAllShopCategories`, {
            headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`},
        });
        let data = response.data;
        console.log(data);
        setAllUsers(data?.message);
        document.getElementById("addcat").classList.remove("show");
    }    

    useEffect(() => {
      if(hitToGetAllData){
        getAllUsers();
      }
    }, [hitToGetAllData])
    

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
    document.getElementById("addcat").classList.add("show");
  };
  
  const deleteProduct = (id) => {
    // delete cat api here
  }

  const [EnableUpdateName, setEnableUpdateName] = useState(false);

  const updateName = async (id) => {
    console.log(id);
    let data = {
      "_id":id,
      "name":CatName
    }
    if(CatName !== ''){
      let response = await axios.put(`${baseUrl}/shop_category/update`, data, {
        headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}
      });
      console.log(response);
      setCatName('');
      setEnableUpdateName('');
      getAllUsers();
    }else{
      setEnableUpdateName('');
    }
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
                            <h4 className="card-title">Shop Categories</h4>
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
                              <span> Add Category</span>
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
                                <th>S. No</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllUsers?.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <span className="align-middle fw-bold">
                                        {currentPage === 1 ? (i + 1) : ((i + (10 * (currentPage - 1)))+1)}
                                    </span>
                                  </td>
                                  <td>
                                    {
                                      (EnableUpdateName == v._id) ?
                                      <>
                                        <input type={'text'} value={CatName} onChange={(e)=>{setCatName(e.target.value)}} />
                                        <button onClick={()=>{updateName(v._id)}} style={{border:'0',padding:'0px',width:'20px',height:'20px',marginLeft:'5px',background:'transparent',color:'white'}}><i className="fal fa-check"></i></button>
                                      </>
                                      :
                                      <>
                                        {v?.name} 
                                        <button onClick={()=>setEnableUpdateName(v._id)} style={{border:'0',padding:'0px',width:'20px',height:'20px',marginLeft:'5px',background:'transparent',color:'white'}}><i className="fal fa-edit"></i></button>
                                      </>
                                    }  
                                  </td>
                                  <td>
                                    <ReactFancyBox
                                        thumbnail={v?.category_image !== '' ? domain+v?.category_image : DefaultProduct}
                                        image={v?.category_image !== '' ? domain+v?.category_image : DefaultProduct}/>
                                  </td>
                                  <td>
                                      <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                          <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={(e) => { deleteProduct(e.target.value) }}>Delete</button>
                                      </div>
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
      <AddCat sethitToGetAllData={sethitToGetAllData} />
    </div>
  );
}
