import React, { useEffect, useState } from "react";
import {
    Table,
} from "reactstrap";
import axios from "axios";
import { Spinner } from "reactstrap";
import 'react-fancybox/lib/fancybox.css'
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import EditRun from './EditRun'
import AddWinner from './AddWinner'
import '../AllPosts/AllPosts.css'
import './run.css'
import SubsModal from "./SubsModal";
import UserModal from "./UserModal";

export default function AllUsers() {
    const [AdminData, setAdminData] = useState([]);
    const [UpdateData, setUpdateData] = useState([]);
    const [WinnerData, setWinnerData] = useState();
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])
    
    const [AllUsers, setAllUsers] = useState([])
    useEffect(() => {
        if(AllUsers?.length === 0){
            getAllUsers();
        }
            // getAllUsers();
    }, [AdminData,AllUsers])

    const getAllUsers = async () => {
        let response = await axios.get(`${baseUrl}/run/getAllRunList?page=0&limit=1000`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        let data = response.data;
        console.log(data);
        setAllUsers(data?.message);
    }
    
    const [AssociatedUserData, setAssociatedUserData] = useState([])
    const [DataHeading, setDataHeading] = useState('')

    const approvedUsers = async (id, status) => {

        console.log('checking approved users by this id: ',id,'\n');
        console.log('checking approved users by this Status: ',status);
        let response = await axios.get(`${baseUrl}/run/getFilteredList/${id}?status=${status}`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        // console.log(response);
        document.getElementById('usermod').classList.add('show');
        setAssociatedUserData(response?.data?.message)
        setDataHeading(`${status}`)
    }

    const rejectedUsers = async (id) => {

        console.log('checking rejected users by this id: ',id);
        let response = await axios.get(`${baseUrl}/run/getFilteredList/${id}?status=Rejected`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        console.log(response);
        document.getElementById('usermod').classList.add('show');
        setAssociatedUserData(response?.data?.message)
        setDataHeading('Rejected')

    }

    const [Subs, setSubs] = useState([])
    
    const getSubs = async (id) => {

        console.log(id);
        let response = await axios.get(`${baseUrl}/run/totalSubscriptions/${id}`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        setSubs(response?.data?.message)
        console.log(response?.data?.message);
        document.getElementById('subsmod').classList.add('show');
    }

    return (
        <div>
            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <section id="dashboard-ecommerce">
                            <div className="row" id="table-hover-row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="crd-wrp">
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <div className="card-header">
                                                        <h4 className="card-title">All Runs</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-6" style={{textAlign:'right', paddingRight:'10px'}}>
                                                <Link to="/runCategory" className="btn btn-primary" style={{marginRight:'10px'}}>Run Category</Link>
                                                <Link to="/createRun" className="btn btn-primary">Create Run</Link>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            {AllUsers?.length !== 0 ? (
                                                <Table hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>id</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Description</th>
                                                            <th>Physical Address</th>
                                                            <th>CITY</th>
                                                            <th>winner</th>
                                                            <th>Request</th>
                                                            <th>Pending</th>
                                                            <th>Approved</th>
                                                            <th>Rejected</th>
                                                            <th>Subscription</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="tab-act">
                                                        {AllUsers?.map((v, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>
                                                                        {++i}
                                                                    </td>
                                                                    <td>
                                                                        {v?.name}
                                                                    </td>
                                                                    <td>{v?.price}</td>
                                                                    <td>{v?.description}</td>
                                                                    <td>{v?.physical_address}</td>
                                                                    <td>{v?.city}</td>
                                                                    <td>{v?.winner}</td>
                                                                    <td>
                                                                        <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                                                            <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={(e) => { approvedUsers(e.target.value,"Pending") }}>View All</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                                                            <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={(e) => { approvedUsers(e.target.value, "Approved") }}>View All</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                                                            <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={(e) => { rejectedUsers(e.target.value) }}>View All</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="forMargin" style={{display:'flex', justifyContent:'center'}}>
                                                                            <button style={{padding:'4px 5px'}} value={v?._id} className="btn btn-sm" onClick={(e) => { getSubs(e.target.value) }}>View All</button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <div className="spiner">
                                                    <Spinner type="grow" color="primary" />
                                                    <Spinner type="grow" color="secondary" />
                                                    <Spinner type="grow" color="success" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <EditRun UpdateData={UpdateData} />
            <AddWinner WinnerData={WinnerData} />
            <SubsModal subs={Subs} />
            <UserModal AssociatedUserData={AssociatedUserData} heading={DataHeading} />
        </div>
    );
}
