import React, { useEffect, useState} from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './Shop.css'

export default function AddProduct(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addpro').classList.remove('show');
        // console.log('removed')
      }
      
    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
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
    // const [productColor, setproductColor] = useState('');
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
                <div className="modal fade" id="addpro" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
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
