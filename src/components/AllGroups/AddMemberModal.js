import { baseUrl } from "../../utils/baseUrl";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from 'axios'





export default function AddAnimationModal(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addNewMember').classList.remove('show');
        // console.log('removed')
    }
    const [description, setdescription] = useState('')
    const [animationcoin, setanimationcoin] = useState('')
    const [animationfield, setanimationfield] = useState('')
    const [currentCategory, setCurrentCategory] = React.useState('GREEN')
    const changeCategory = (newCategory) => {
        setCurrentCategory(newCategory)
    }

    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const handelClick = async () => {
        let getInput = animationfield;
        if (getInput && currentCategory && description && animationcoin) {

            var data = new FormData();
            data.append('group_name', animationfield)
            data.append('group_description', description)
            data.append('rules', animationcoin)
            data.append('user_id', AdminData._id)
            //   console.log(data)
            let response = await axios.post(`${baseUrl}/groups/add_group`, data, { headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` } });
            console.log(response)
            setanimationfield('')
            setanimationcoin('')
            setdescription('')
            document.getElementById('munnababa').click();
            document.getElementById('addNewMember').classList.remove('show');
            props.getAllGroupsAPI();
        }
    }

    return (
        <>
            <div className="modal fade" id="addNewMember" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddAnimationModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Add New Member</h1>


                            <form className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Select Member</label>
                                    <div className="input-group input-group-merge">
                                        <select className="form-select" id="Category" onChange={(event) => changeCategory(event.target.value)} defaultValue={currentCategory}>
                                            <option value="GREEN">GREEN</option>
                                            <option value="BLUE">BLUE</option>
                                            <option value="RED">RED</option>
                                            <option value="PURPLE">PURPLE</option>
                                            <option value="GOLDEN">GOLDEN</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <Button className='me-1' color='primary'>Add Member</Button>
                                    <Button color='secondary' outline onClick={closeAddAnimationModal}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
