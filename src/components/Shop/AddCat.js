import React, { useEffect, useState} from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './Shop.css'

export default function AddCat({sethitToGetAllData}) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addcat').classList.remove('show');
        // console.log('removed')
      }
      
    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const [ProductName, setProductName] = useState('')
    const [ProductImage, setProductImage] = useState({});
  
    const handelClick = async () => {

        if (ProductName && ProductImage) {

            let data = new FormData();

            data.append('name',ProductName)
            data.append('category_image',ProductImage)

            let response = await axios.post(`${baseUrl}/shop_category/addShopCategory`, data, { headers: { Authorization:  `Bearer ${AdminData?.JWT_TOKEN}`}})

            console.log('add category: ', response);

            if(response.status === 200){
                sethitToGetAllData(true)
                // closeAddAnimationModal();
            }


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
                <div className="modal fade" id="addcat" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-transparent">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{closeAddAnimationModal()}}></button>
                            </div>
                            <div className="modal-body px-sm-5 mx-50 pb-5">
                                <h1 className="text-center mb-1" id="addNewCardTitle">Add New Category</h1>
                               

                                <form  className="row gy-1 gx-2 mt-75">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="modalAddCardNumber">Product name</label>
                                        <div className="input-group input-group-merge">
                                            <input onChange={(e)=>{setProductName(e.target.value)}} value={ProductName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Product Name"  />   
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label" htmlFor="customFile">Upload File</label>
                                        <input type="file" onChange={(e)=>setProductImage(e.target.files[0])} className="form-control" id="customFile" accept="image/*"/>
                                    </div>

                                    <div className="col-12 text-center">
                                        <Button className='me-1' color='primary'   onClick={()=>handelClick()}>Submit</Button>
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
