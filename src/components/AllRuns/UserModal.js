import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import { baseUrl } from "../../utils/baseUrl";
import { Table } from "reactstrap";

export default function UserModal({ AssociatedUserData, heading }) {

    // const [tempHeading, settempHeading] = useState('')
    // const [tempData, settempData] = useState([])

    const [AdminData, setAdminData] = useState([]);
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
        console.log(AssociatedUserData, heading);
        // settempData(AssociatedUserData)
        // settempHeading(heading)
    }, [AssociatedUserData, heading])


    const closeEditRunCategoryModal = () => {
        document.getElementById('usermod').classList.remove('show');
    }

    const requestHandleFunction = async (id, status, userID, e) => {
        
        
        let data = {
            user_id: userID,
            status: status
        }
        let response = await axios.put(`${baseUrl}/run/requestPlayAgainstRunApproveAndReject/${id}`, data, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        if (response.data.status == 200) {
            console.log(response.data.message);
        }

    }

    return (
        <>
            <div className="modal fade" id="usermod" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeEditRunCategoryModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-2 mx-50 pb-3">
                            <h1 style={{ fontSize: '24px' }} className="text-center mb-1" id="addNewCardTitle">{AssociatedUserData?.length > 0 ? `Total ${heading} Users` : `No ${heading} Users Yet!`}</h1>
                            {
                                AssociatedUserData?.length > 0 ?

                                    <Table hover responsive>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                {
                                                    heading != 'Approved' ?
                                                        <th>Approved</th>
                                                        :
                                                        ''
                                                }
                                                {
                                                    heading != 'Rejected' ?
                                                        <th>Rejected</th>
                                                        :
                                                        ''
                                                }
                                                {/* <th>Name</th>
                                            <th>Amount</th> */}
                                            </tr>
                                        </thead>

                                        <tbody className="tab-act">
                                            {
                                                AssociatedUserData[0].runRequestPlay.map((v, i) => {
                                                    if (v.status == heading && v.userId) {
                                                        return (
                                                            <tr key={i}>
                                                                <td>
                                                                    {++i}
                                                                </td>
                                                                <td>
                                                                    {v?.userId?.full_name}
                                                                </td>
                                                                {
                                                                    heading != 'Approved' ?
                                                                        <td>
                                                                            <Button color='secondary' outline onClick={(e) => requestHandleFunction(AssociatedUserData[0]?._id, 'Approved', v?.userId?._id, e)}>
                                                                                Approved
                                                                            </Button>
                                                                        </td>
                                                                        :
                                                                        ''
                                                                }
                                                                {
                                                                    heading != 'Rejected' ?
                                                                        <td>
                                                                            <Button color='secondary' outline onClick={(e) => requestHandleFunction(AssociatedUserData[0]?._id, 'Rejected', v?.userId?._id, e)}>
                                                                                Rejected
                                                                            </Button>
                                                                        </td>
                                                                        :
                                                                        ''
                                                                }
                                                                <td>

                                                                </td>
                                                                {/* <td>
                                                                {v?.user_id?.full_name}
                                                            </td>
                                                            <td>{`${v.overAllAmount} ${v.currency}`}</td> */}
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
