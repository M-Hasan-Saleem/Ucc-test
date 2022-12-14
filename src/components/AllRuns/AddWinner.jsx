import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";
import { baseUrl, domain } from "../../utils/baseUrl";
import ReactFancyBox from 'react-fancybox'

export default function AddWinner({WinnerData}) {
    const [AdminData, setAdminData] = useState([]);


    const [Winner, setWinner] = useState();
    

    useEffect(() => {
        console.log(WinnerData);
        setWinner(WinnerData?.winner)
    }, [WinnerData])
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const closeAddWinnerModal = () => {
        document.getElementById('AddWinnerModal').classList.remove('show');
    }

    const handelClick = async () => {
       
        let data = await axios.put(`${baseUrl}/run/update/${WinnerData._id}`,{winner: Winner}, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        console.log(data.data)
        if(data.data.status === 200){
            // setRunImage({})
            document.getElementById('AddWinnerModal').classList.remove('show');
            // navigate('/getAllRuns')
        }
    }
    return (
        <>
            <div className="modal fade" id="AddWinnerModal" tabIndex="-1" aria-labelledby="AddWinnerModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeAddWinnerModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="AddWinnerModalTitle">Add Winner</h1>
                            <form className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Winner Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setWinner(e.target.value) }} value={Winner} className="form-control add-credit-card-mask" type="text" placeholder="Enter Run Name" />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <Button className='me-1' color='primary' onClick={handelClick}>Submit</Button>
                                    <Button color='secondary' outline onClick={closeAddWinnerModal}>
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
