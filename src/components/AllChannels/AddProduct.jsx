import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './AllChannels.css'
import e from "cors";

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
    const [currentCategory, setCurrentCategory] = useState('')
    const [currentSubscription, setCurrentSubscription] = useState('')
    const [currentFile, setcurrentFile] = useState('')


    const handelClick = async () => {
        if (TitleName) {

            // let data = new FormData();

            // data.append('title', TitleName)
            // data.append('subscriptions', JSON.stringify([currentSubscription]))
            // data.append('category', currentCategory)
            // data.append('picture', currentFile)

            let myForm = document.getElementById('customForm');
            let data = new FormData(myForm);

            data.forEach(element => {
                console.log(element);
            });

            console.log(data);
                debugger;

            let response = await axios.post(`${baseUrl}/channel`, data, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
            console.log(response)
            if (response.status === 200) {
                props.getAllUsers();
                closeAddAnimationModal();
            }
        }
    }

    const [totalDBCategories, settotalDBCategories] = useState([])
    const [totalDBSubscription, settotalDBSubscription] = useState([])

    const getCategories = async () => {
        let response = await axios.get(`${baseUrl}/category`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        console.log(response)
        settotalDBCategories(response?.data?.categories);
    }

    const getSubscription = async () => {
        let response = await axios.get(`${baseUrl}/membership`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        console.log(response, 'subs')
        settotalDBSubscription(response?.data?.data);
    }

    useEffect(() => {
        getCategories();
        getSubscription();
    }, [AdminData])

// CHECK HANDLER

let selectedCats = [];

const checkEventHandler = (event, id, name) => {
    if(event){
        selectedCats.push(id);
        console.log(selectedCats);
    }else{
        console.log(selectedCats.indexOf(id))
        selectedCats.splice(selectedCats.indexOf(id), 1);
        console.log(selectedCats);
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
                            <h1 className="text-center mb-1" id="addNewCardTitle">Add New Channel</h1>
                            <form id="customForm" enctype='multipart/form-data' onSubmit={handelClick} className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Channel Name</label>
                                    <div className="input-group input-group-merge">
                                        <input name="name" onChange={(e) => { setProductName(e.target.value) }} value={TitleName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Product Name" />

                                    </div>
                                </div>
                                <div className="col-12 sizesBox">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Category</label>
                                    <div className="input-group input-group-merge">
                                        {/* <select className="form-select" id="Category" onChange={(event) => { setCurrentCategory(event.target.value) }} defaultValue={currentCategory}>
                                            <option style={{ display: 'none' }}>Select Category</option>
                                            {
                                                totalDBCategories?.length > 0 &&
                                                totalDBCategories.map((v, i) => {
                                                    return (
                                                        <option value={v?._id}>{v?.name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        {
                                            totalDBCategories?.length > 0 &&
                                            totalDBCategories.map((v, i) => {
                                                return (
                                                    <span value={v?._id}>{v?.name}<input type={'checkbox'} name="category" onChange={(e)=>{checkEventHandler(e.target.checked, v?._id, v?.name)}} /></span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Subscription</label>
                                    <div className="input-group input-group-merge">
                                        <select className="form-select" id="Subscription" onChange={(event) => { setCurrentSubscription(event.target.value) }} defaultValue={currentSubscription}>
                                            <option style={{ display: 'none' }}>Select Subscription</option>
                                            {
                                                totalDBSubscription?.length > 0 &&
                                                totalDBSubscription.map((v, i) => {
                                                    return (
                                                        <option value={v?._id}>{v?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Upload File</label>
                                    <div className="input-group input-group-merge">
                                        <input name="picture" className="form-control" type={"file"} />
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
