import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './AllPages.css'

export default function AddProduct(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal2 = () => {
        document.getElementById('addpro2').classList.remove('show');
        // console.log('removed')
    }

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [props])

    const [TitleName, setProductName] = useState('')
    const [Price, setPrice] = useState('')
    

    const handelClick = async () => {
        if (TitleName) {

            let data = new FormData();

            data.append('title', TitleName)
            
            let response = await axios.post(`${baseUrl}/page`, data, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
            console.log(response)
            if (response.status === 200) {
                closeAddAnimationModal2();
            }
        }
    }

    return (
        <>
            <div className="modal fade" id="addpro2" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal2() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Create New Page</h1>
                            <form enctype='multipart/form-data' className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Page Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setProductName(e.target.value) }} value={TitleName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Subscription Name" />

                                    </div>
                                </div>

                                
                                <div className="col-12 text-center">
                                    <Button className='me-1' color='primary' onClick={() => handelClick()}>Submit</Button>
                                    <Button color='secondary' outline onClick={closeAddAnimationModal2}>
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
