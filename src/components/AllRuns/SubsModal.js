import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import{ Table }from "reactstrap";

export default function SubsModal({subs}) {

    const [CategoryName, setCategoryName] = useState()
    const [CategoryId, setCategoryId] = useState()
    const [tempName, settempName] = useState('')

    const [AdminData, setAdminData] = useState([]);
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
        console.log('subs here: ',subs);
    }, [subs])
    

    const closeEditRunCategoryModal = () => {
        document.getElementById('subsmod').classList.remove('show');
    }
  
    return (
        <>
            <div className="modal fade" id="subsmod" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeEditRunCategoryModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">{subs?.length > 0 ? `Total Subscription: ${subs?.length}` : 'No Subscriptions Yet!'}</h1>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>

                                <tbody className="tab-act">
                                    {
                                        subs?.length > 0 ? 
                                        subs.map((v,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td>
                                                        {++i}
                                                    </td>
                                                    <td>
                                                        {v?.user_id?.full_name}
                                                    </td>
                                                    <td>{`${v.overAllAmount} ${v.currency}`}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <></>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
