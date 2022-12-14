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
import AddProduct from "./AddProduct";

export default function AllUsers() {

    // Fetch Current User Data From LocalStorage

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
        let response = await axios.get(`${baseUrl}/product/getAllShopProductList`, {
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
  
  const openAddAnimationModal = () => {
    document.getElementById("addpro").classList.add("show");
  };
  
  const deleteProduct = async (id) => {
    let response = await axios.delete(`${baseUrl}/product/${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    });
    console.log(response);
    getAllUsers();
  }

  const [toUpdateThisContent, settoUpdateThisContent] = useState({})

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
                            <h4 className="card-title">Shop</h4>
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
                              <span> Add Product</span>
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
                                <th>id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Profile Image</th>
                                <th>Sub Title</th>
                                <th>Rate</th>
                                <th>Sizes</th>
                                <th>Colors</th>
                                <th>Ratings</th>
                                <th>Likes</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody className="tab-act">
                            {AllUsers?.map((v, i) => {
                              console.log(v.product_image);
                              return (
                                <tr key={i}>
                                  <td>
                                    <span className="align-middle fw-bold">
                                        {currentPage === 1 ? (i + 1) : ((i + (10 * (currentPage - 1)))+1)}
                                    </span>
                                  </td>
                                  <td>{v?.name}</td>
                                  <td>{v?.description}</td>
                                  <td>
                                    <ReactFancyBox
                                        thumbnail={v?.product_image !== '' ? domain+v?.product_image : DefaultProduct}
                                        image={v?.product_image !== '' ? domain+v?.product_image : DefaultProduct}/>
                                  </td>
                                  <td>{v?.sub_title}</td>
                                  <td>{v?.rate}</td>
                                  <td>
                                    {
                                      v?.sizes.map((sizes,index)=>{
                                        // console.log(sizes);
                                        return (sizes.stock_available === 'yes' || sizes.stock_available === 'Yes') && <span style={{padding:'5px',border:'1px solid #3b4253',margin: '0 2px 0 2px'}}>{sizes.name.charAt(0) === 'E' ? 'XL' : sizes.name.charAt(0)}</span>
                                      })
                                    }
                                  </td>
                                  <td>
                                    <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                                    {
                                      v?.colors.map((colors,index)=>{
                                        // console.log(colors);
                                        return (colors.stock_available === 'yes' || colors.stock_available === 'Yes') && <span style={{width: '12px',height: '12px',backgroundColor:colors?.name, borderRadius:'100%'}}></span>
                                      })
                                    }
                                    </div>
                                  </td>
                                  <td>{v?.totalRating}</td>
                                  <td>{v?.userLikes.length}</td>
                                  <td>
                                      <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                          <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={() => { 
                                            settoUpdateThisContent(v) ;
                                            document.getElementById("addproupdate").classList.add("show");
                                            }}>Edit</button>
                                      </div>
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
      <AddProduct shallowFunc={getAllUsers} />
      <UpdateProduct shallowFunc={getAllUsers} {...toUpdateThisContent} />
    </div>
  );
}

// 

// Update Product component

// 

export const UpdateProduct = (props) =>{
  const closeAddAnimationModal = () => {
    document.getElementById('addpro').classList.remove('show');
    document.getElementById('addproupdate').classList.remove('show');
    // console.log('removed')
  }
  
const [AdminData, setAdminData] = useState([]);

// const checksizes = () => {
//   props?.sizes.map((sizes,index)=>{
//     if(sizes?.name === 'Small' && sizes?.stock_available === 'yes'){
//       document.getElementById('Small').checked = true;
//     }
//     if(sizes?.name === 'Medium' && sizes?.stock_available === 'yes'){
//       document.getElementById('Medium').checked = true;
//     }
//     if(sizes?.name === 'Large' && sizes?.stock_available === 'yes'){
//       document.getElementById('Large').checked = true;
//     }
//     if(sizes?.name === 'Extra Large' && sizes?.stock_available === 'yes'){
//       document.getElementById('Extra Large').checked = true;
//     }
//   })
// }

useEffect(() => {
    let data =  localStorage.getItem('GotNextAdmin');
    setAdminData(JSON.parse(data))
    console.log(props);
    setProductName(props.name)
    setSubTitle(props.sub_title)
    setdescription(props.description)
    setRate(props.rate)
    // checksizes()
}, [props])

const [ProductName, setProductName] = useState('')
const [SubTitle, setSubTitle] = useState('')
const [description, setdescription] = useState('')
const [Rate, setRate] = useState('')
const [SmallSizeStatus, setSmallSizeStatus] = useState({"name":'Small',"stock_available":'no'})
const [MediumSizeStatus, setMediumSizeStatus] = useState({"name":'Medium',"stock_available":'no'})
const [LargeSizeStatus, setLargeSizeStatus] = useState({"name":'Large',"stock_available":'no'})
const [ExtraLargeSizeStatus, setExtraLargeSizeStatus] = useState({"name":'Extra Large',"stock_available":'no'})
const [currentCategory, setCurrentCategory] = useState('')
const [ProductImage, setProductImage] = useState([]);
const [RedColorStatus, setRedColorStatus] = useState({"name":'red',"stock_available":'no'})
const [GreenColorStatus, setGreenColorStatus] = useState({"name":'green',"stock_available":'no'})
const [BlueColorStatus, setBlueColorStatus] = useState({"name":'blue',"stock_available":'no'})

useEffect(() => {
  if(ProductImage.length > 10){
    alert('max 10 images allowed!')
  }else{
    console.log(ProductImage);
  }
}, [ProductImage])


  const handelClick = async () => {

    if (ProductName && SubTitle && description && Rate && currentCategory && ProductImage) {

        let sizesArray = [SmallSizeStatus,MediumSizeStatus,LargeSizeStatus,ExtraLargeSizeStatus];
        let colorsArray = [RedColorStatus,GreenColorStatus,BlueColorStatus];

        let data = new FormData();

        data.append('name',ProductName)
        data.append('sub_title',SubTitle)
        data.append('description',description)
        data.append('rate',Rate)
        data.append('sizes',JSON.stringify(sizesArray))
        // data.append('product_image',ProductImage)
        data.append('category_id',currentCategory)
        data.append('colors',JSON.stringify(colorsArray))

        let response = await axios.post(`${baseUrl}/product/addProductInShop`, data, { headers: { Authorization:  `Bearer ${AdminData?.JWT_TOKEN}`}})

        if(response.status === 200){
            closeAddAnimationModal();
        }

        console.log(response);
        props.shallowFunc();

        // document.getElementById('munnababa').click();
        // document.getElementById('addNewCard').classList.remove('show');
    }


}

const [totalDBCategories, settotalDBCategories] = useState([])

const getCategories = async () => {
    let response = await axios.get(`${baseUrl}/shop_category/getAllShopCategories`, { headers: { Authorization:  `Bearer ${AdminData?.JWT_TOKEN}`}})
    settotalDBCategories(response?.data?.message);
}

useEffect(() => {
    getCategories();
}, [AdminData])
  return (
    <>
            <div className="modal fade" id="addproupdate" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{closeAddAnimationModal()}}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Add New Product</h1>
                           

                            <form enctype='multipart/form-data' className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Product name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e)=>{setProductName(e.target.value)}} value={ProductName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Product Name"  />
                                       
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Add Sub Title </label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e)=>{setSubTitle(e.target.value)}} value={SubTitle} className="form-control add-credit-card-mask" type="text" placeholder="Enter Sub Title"  />
                                       
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Add Description </label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e)=>{setdescription(e.target.value)}} value={description} className="form-control add-credit-card-mask" type="text" placeholder="Enter Description"  />
                                       
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Add Rate</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e)=>{setRate(e.target.value)}} value={Rate} className="form-control add-credit-card-mask" type="number" placeholder="Enter Coin"  />
                                       
                                    </div>
                                </div>
                                <div className="col-12 sizesBox">
                                    <label className="form-label">Select Sizes:</label>
                                    <ul>
                                        <li>
                                            <label className="form-label" htmlFor="Small">Small</label>
                                            <input type="checkbox" name="Small" id="Small" value='Small' onChange={(e)=>{
                                                setSmallSizeStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }} />
                                        </li>
                                        <li>
                                            <label className="form-label" htmlFor="Medium">Medium</label>
                                            <input type="checkbox" name="Medium" id="Medium" value='Medium' onChange={(e)=>{
                                                setMediumSizeStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }}/>
                                        </li>
                                        <li>
                                            <label className="form-label" htmlFor="Large">Large</label>
                                            <input type="checkbox" name="Large" id="Large" value='Large' onChange={(e)=>{
                                                setLargeSizeStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }}/>
                                        </li>
                                        <li>
                                            <label className="form-label" htmlFor="Extra Large">Extra Large</label>
                                            <input type="checkbox" name="Extra Large" id="Extra Large" value='Extra Large' onChange={(e)=>{
                                                setExtraLargeSizeStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }}/>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Category</label>
                                    <div className="input-group input-group-merge">
                                        <select className="form-select"  id="Category" onChange={(event) => {setCurrentCategory(event.target.value)}} defaultValue={currentCategory}>
                                            <option style={{display:'none'}}>Select Category</option>
                                            {
                                                totalDBCategories?.length > 0 &&
                                                totalDBCategories.map((v,i)=>{
                                                    return(
                                                        <option value={v?._id}>{v?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 sizesBox">
                                    <label className="form-label">Select Colors:</label>
                                    <ul>
                                        <li>
                                            <label className="form-label" htmlFor="Red">Red</label>
                                            <input type="checkbox" name="Red" id="Red" value='red' onChange={(e)=>{
                                                setRedColorStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }} />
                                        </li>
                                        <li>
                                            <label className="form-label" htmlFor="Green">Green</label>
                                            <input type="checkbox" name="Green" id="Green" value='green' onChange={(e)=>{
                                                setGreenColorStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }}/>
                                        </li>
                                        <li>
                                            <label className="form-label" htmlFor="Blue">Blue</label>
                                            <input type="checkbox" name="Blue" id="Blue" value='blue' onChange={(e)=>{
                                                setBlueColorStatus({
                                                    "name":e.target.value,
                                                    "stock_available":e.target.checked ? 'yes' : 'no'
                                                })
                                            }}/>
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className="col-12">
                                <label className="form-label">Color</label>
                                 <input onChange={(e)=>setproductColor(e.target.value)} type="color" className="form-control" />
                                </div> */}
                                <div className="col-12">
                                <label className="form-label" htmlFor="customFile">Upload File</label>
                                 <input multiple type="file" onChange={(e)=>setProductImage(e.target.files)} className="form-control" id="customFile" accept="image/*"/>
                                </div>

                                

                               

                                <div className="col-12 text-center">
                                
                                <Button className='me-1' color='primary' disabled={ProductImage.length > 10 ? true : false} onClick={()=>handelClick()}>Submit</Button>
                                    <Button  color='secondary'outline onClick={closeAddAnimationModal}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </>
)
}