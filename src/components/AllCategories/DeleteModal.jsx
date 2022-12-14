import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import './AllCategories.css'

export default function AddProduct({ selectedId, selectedData, reload, setReload }) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addpro').classList.remove('show');
        // console.log('removed')
    }

    // console.log(selectedId);

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])


    const ConfirmDelete = async () => {
        console.log(selectedData);
        let response = await axios.delete(`${baseUrl}/category?id=${selectedId}&removedId=${selectedId}`, {
            headers: { Authorization: `Bearer ${AdminData?.jwtToken}` },
        });
        console.log(response);
        if (response?.status == 200) {
            closeAddAnimationModal();
            setReload(!reload);
        }
    }

    return (
        <div className="modal fade" id="addpro" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-transparent">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal() }}></button>
                    </div>
                    <div className="modal-body px-sm-5 mx-50 pb-5">
                        <h1 className="text-center mb-1" id="addNewCardTitle">Are you sure?</h1>


                        <form enctype='multipart/form-data' className="row gy-1 gx-2 mt-75">
                            <div className="col-12 text-center">

                                <Button className='me-1' color='danger' onClick={() => ConfirmDelete()}>Delete</Button>
                                <Button color='secondary' outline onClick={closeAddAnimationModal}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
