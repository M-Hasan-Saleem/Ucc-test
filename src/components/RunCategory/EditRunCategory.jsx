import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";

export default function EditRunCategory({id, name}) {

    const [CategoryName, setCategoryName] = useState()
    const [CategoryId, setCategoryId] = useState()

    useEffect(() => {
        setCategoryName(name)
        setCategoryId(id)
    },[id, name])
    
    const [AdminData, setAdminData] = useState([]);
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const closeEditRunCategoryModal = () => {
        document.getElementById('addNewCard').classList.remove('show');
    }

    const handelClick = async () => {
        if (CategoryName && CategoryId) {
            
            let data = await axios.put(`${baseUrl}/run_category/update`, { _id: CategoryId, name: CategoryName }, { headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` } });
            console.log(data);
            // return
            document.getElementById('addNewCard').classList.remove('show');
        }
    }
    return (
        <>
            <div className="modal fade" id="addNewCard" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeEditRunCategoryModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Edit Run Category  Details</h1>
                            <form className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Category Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setCategoryName(e.target.value) }} value={CategoryName} className="form-control add-credit-card-mask" type="text" placeholder="Enter Category Name" />

                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <Button className='me-1' color='primary' onClick={handelClick}>Submit</Button>
                                    <Button color='secondary' outline onClick={closeEditRunCategoryModal}>
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
