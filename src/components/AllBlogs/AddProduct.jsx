import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './AllBlogs.css'

export default function AddProduct(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addpro3').classList.remove('show');
        // console.log('removed')
    }

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [props])

    const [TitleName, setProductName] = useState('')
    const [BlogSlug, setBlogSlug] = useState('')
    const [Description, setDescription] = useState('');
    const [thumbnailImage, setthumbnailImage] = useState('');


    const handelClick = async () => {
        if (TitleName && BlogSlug) {
            let dataForm = new FormData();
            dataForm.append('title', TitleName);
            dataForm.append('description', Description);
            dataForm.append('auther', AdminData?._id);
            dataForm.append('thumbnail', thumbnailImage);
            
            let response = await axios.post(`${baseUrl}/blog`, dataForm, { headers: { Authorization: `Bearer ${AdminData?.jwtToken}` } })
            console.log(response)
            if (response.status === 200) {
                closeAddAnimationModal();
                props.setReload(!props.reload)
            }
        }
    }

    return (
        <>
            <div className="modal fade" id="addpro3" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Add New Blog</h1>
                            <form enctype='multipart/form-data' className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Blog Title Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setProductName(e.target.value) }} value={TitleName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Blog Title" />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Description:</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setDescription(e.target.value) }} value={Description} className="form-control add-credit-card-mask" type="text" placeholder="Enter Blog Title" />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Blog Slug</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setBlogSlug(e.target.value) }} value={BlogSlug} className="form-control add-credit-card-mask" type="text" placeholder="Enter Blog Title" />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Thumbnail</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setthumbnailImage(e.target.files[0]) }} className="form-control add-credit-card-mask" type="file" placeholder="Enter Blog Title" />

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
