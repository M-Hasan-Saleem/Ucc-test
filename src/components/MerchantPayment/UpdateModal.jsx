import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './MerchantPayment.css'

export default function AddProduct(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addpro').classList.remove('show');
        // console.log('removed')
    }

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [props])

    const [TitleName, setProductName] = useState('')
    const [SlugName, setSlugName] = useState('')
    
    


    const handelClick = async () => {
        if (TitleName) {

            let data = new FormData();

            data.append('name', TitleName)
            data.append('slug', SlugName)
            
            let response = await axios.put(`${baseUrl}/merchant/${AdminData._id}`, data, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
            console.log(response)
            if (response.status === 200) {
                closeAddAnimationModal();
            }
        }
    }

    

    
    return (
        <>
            <div className="modal fade" id="addpro" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Update Merchant</h1>


                            <form enctype='multipart/form-data' className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Edit Merchant Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setProductName(e.target.value) }} value={TitleName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Page Name" />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Edit Slug</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setSlugName(e.target.value) }} value={SlugName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Slug" />

                                    </div>
                                </div>
                                


                                <div className="col-12 text-center">

                                    <Button className='me-1' color='primary' onClick={() => handelClick()}>Submit</Button>
                                    <Button color='secondary' outline onClick={closeAddAnimationModal}>
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
