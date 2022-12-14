import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './AllVideos.css'

export default function AddProduct(props) {
    const closeAddAnimationModal = () => {
        document.getElementById('addpro2').classList.remove('show');
    }

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [props])

    const formRef = useRef();
    const [TitleName, setProductName] = useState('')
    const [description, setdescription] = useState('')
    const [ProductImage, setProductImage] = useState([]);

    useEffect(() => {
        if (ProductImage.length > 10) {
            alert('max 10 images allowed!')
        } else {
            console.log(ProductImage);
        }
    }, [ProductImage])


    const handelClick = async (e) => {
        e.preventDefault();


      


        const formData = new FormData(formRef.current);
        let channel = formData.get("channel");
        let tag = formData.get("tag");
        let membership = formData.get("membership");
        let category = formData.get("category")

    

        if (formData.get("title") && formData.get("description")) {
            formData.set("channel", `["${channel}"]`)
            formData.set("category", `["${category}"]`)
            formData.set("tag", `["${tag}"]`)
            formData.set("membership", `["${membership}"]`)
            try {
                
                

                let response = await axios.post(
                    `${baseUrl}/channel/series`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${AdminData?.jwtToken}` },
                        validateStatus: status => {
                            // console.log(status);
                            return status >= 200
                        }
                    }
                );

                if (response.status === 200) {
                    closeAddAnimationModal();
                    props.setReload(!props.reload)
                }
                else {
                    console.log(response)
                    debugger
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const [totalDBCategories, settotalDBCategories] = useState([])
    const [totalDBChannel, settotalDBChannel] = useState([])
    const [totalDBSubscription, settotalDBSubscription] = useState([])
    const [totalDBTags,settotalDBTags] = useState([])

    const getCategories = async () => {
        let response = await axios.get(`${baseUrl}/category`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        settotalDBCategories(response?.data?.categories);
    }
    const getTags = async () => {
        let response = await axios.get(`${baseUrl}/category/tags`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        settotalDBTags(response?.data?.tags);
    }

    const getChannel = async () => {
        // /channel/:id ==> [{id: 123213}]
        let response = await axios.get(`${baseUrl}/channel`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        // let response = await axios.get(`${baseUrl}/channel/${'a12e12jbnaspd2'}`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
        settotalDBChannel(response?.data?.channels);
    }

    const getSubscription = async () => {
        let response = await axios.get(`${baseUrl}/membership/admin`, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
            console.log(response.data.data)
        settotalDBSubscription(response?.data?.data);
    }

    useEffect(() => {
        getCategories();
        getChannel();
        getSubscription();
        getTags();
    }, [AdminData])

    // check handdle

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
            <div className="modal fade" id="addpro2" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Add New Series</h1>


                            <form encType='multipart/form-data' ref={formRef} method="POST" onSubmit={handelClick} className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Video Title</label>
                                    <div className="input-group input-group-merge">
                                        <input className="form-control add-credit-card-mask" name='title' type="text" placeholder="Enter Product Name" />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Channel</label>
                                    <div className="input-group input-group-merge">
                                        <select className="form-select" id="Channel" name="channel">
                                            <option style={{ display: 'none' }}>Select Channel</option>
                                            {
                                                totalDBChannel?.length > 0 &&
                                                totalDBChannel.map((v, i) => {
                                                    return (
                                                        <option value={v?._id}>{v?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 sizesBox">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Category</label>
                                    <div className="input-group input-group-merge">
                                        {/* <select className="form-select" id="Category" name="category">
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
                                            totalDBChannel?.length > 0 &&
                                            totalDBChannel?.Categories?.map((v, i) => {
                                                return (
                                                    <span value={v?._id}>{v?.name}<input type={'checkbox'} onChange={(e)=>{checkEventHandler(e.target.checked, v?._id, v?.name)}} /></span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Add Tag </label>
                                    <div className="input-group input-group-merge">
                                        <input name="tag" className="form-control add-credit-card-mask" type="text" placeholder="Enter Description" />

                                    </div>
                                </div> */}
                                
                                {/* <div className="col-12">
                                    <label className="form-label">Color</label>
                                     <input onChange={(e)=>setproductColor(e.target.value)} type="color" className="form-control" />
                                    </div> */}






                                <div className="col-12 text-center">

                                    <Button className='me-1' type="submit" color='primary' disabled={ProductImage.length > 10 ? true : false}>Submit</Button>
                                    <Button type="button" color='secondary' outline onClick={closeAddAnimationModal}>
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
