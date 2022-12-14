import React, { useEffect, useState } from "react";
import {
    Table,
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";
import axios from "axios";
import { Spinner } from "reactstrap";
import 'react-fancybox/lib/fancybox.css'
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import '../AllPosts/AllPosts.css'
import EditRunCategory from "../RunCategory/EditRunCategory";
export default function AllUsers() {

    // Fetch Current User Data From LocalStorage
    const [AdminData, setAdminData] = useState([]);
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])
    const [AllUsers, setAllUsers] = useState([])
    useEffect(() => {
        getAllUsers();
    }, [AdminData, AllUsers])
    // Get All Users
    const getAllUsers = async () => {
        let response = await axios.get(`${baseUrl}/run_category/getAllRunCategories`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        let data = response.data;
        setAllUsers(data?.message);
    }
    const [animationlist, setanimationlist] = useState([]);
    const [PageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        triggeringFunction(currentPage);
    }, [currentPage]);
    const triggeringFunction = async (currentPage) => {
        // let getData = await axios.get(`https://thewebtestlink.xyz/api/admin/getAnimation?page=${currentPage}&limit=10`, {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        // });
        // setPageCount(Math.ceil(getData.data.totallength/10))
        // console.log(getData.data)
        // window.scrollTo(0, 0)
        // setanimationlist(getData.data.result);
    };
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }
    
    const openAdEditRunModal = (id, name) => {
        setCategoryId(id);
        setCategoryName(name);
        document.getElementById("addNewCard").classList.add("show");
    };
    useEffect(() => {
        triggeringFunction(currentPage)
    }, [currentPage])

    const [CategoryId, setCategoryId] = useState();
    const [CategoryName, setCategoryName] = useState();
    
    const runPostRequest = async () => {
        if (!CategoryName) {
            alert("CategoryName is required.")
            return
        }
        let data = await axios.post(`${baseUrl}/run_category/addRunCategory`, { name: CategoryName }, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        // console.log(data);
        if (data.data.status !== 200) {
            alert(data.data.error)
            return;
        }
        alert(data.data.message)
        setCategoryName('')
        getAllUsers()
    }
    return (
        <div>
            <button
                id="munnababa"
                style={{ display: "none" }}
                onClick={() => {
                    triggeringFunction(currentPage);
                }}
            ></button>
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
                                                        <h4 className="card-title">Run Category</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-6" style={{ textAlign: 'right', paddingRight: '10px' }}></div>
                                                <div className="col-md-12 p-5">
                                                    <input type="text" className="form-control" value={CategoryName} placeholder="Enter Category Name" onChange={(e) => setCategoryName(e.target.value)} />
                                                    <button type="button" className="btn btn-primary mt-3" onClick={runPostRequest}>Save</button>
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
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="tab-act">
                                                        {AllUsers?.map((v, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>
                                                                        <span className="align-middle fw-bold">
                                                                            {currentPage === 1 ? (i + 1) : ((i + (10 * (currentPage - 1))) + 1)}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        {v?.name}
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => { openAdEditRunModal(v?._id,v?.name) }}>Edit</button>
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
            <EditRunCategory name={CategoryName} id={CategoryId} />
        </div>
    );
}
