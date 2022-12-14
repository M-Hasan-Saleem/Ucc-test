import React, { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import '../AllPosts/AllPosts.css'
import Autocomplete from "react-google-autocomplete";
import { Navigate, useNavigate } from "react-router-dom";

export default function PaymentTab() {

    const [AdminData, setAdminData] = useState([]);
    const [RunCategory, setRunCategory] = useState([]);
    const [clientId, setclientId] = useState();
    const [clientSecret, setclientSecret] = useState();
    const [paymenttype, setpaymenttype] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    
    let submitForm = async () => {
        if(!clientId || !clientSecret || !paymenttype){
            alert("All fields is required")
            return;
        }
        let formData = new FormData();
        formData.append('clientId', clientId);
        formData.append('clientSecret', clientSecret);
        formData.append('paymenttype', paymenttype);
        
        let data = await axios.post(`${baseUrl}/run/addRunDetail`,formData, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        if(data.data.status == 200){
            alert(data.data.message)
            navigate('/')

        }
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
                                                <div className="col-md-9">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Payment</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-3"></div>
                                                <div className="col-md-12" style={{padding: '0 20px'}}>
                                                    <p>
                                                        <input id="name" className="form-control" type="text" placeholder="Client Id*" required onChange={(e) => setclientId(e.target.value)} />
                                                    </p>
                                                    <p class="full-width">
                                                        <input id="name" className="form-control" type="text" placeholder="Client Secret*" required onChange={(e) => setclientSecret(e.target.value)} />
                                                    </p>
                                                    <p>
                                                        <input id="price"  className="form-control" type="number" placeholder="Payment Type*" required onChange={(e) => setpaymenttype(e.target.value)} />
                                                    </p>
                                                 
                                                    <p class="full-width">
                                                        <input type="submit" class="btn btn-primary" value="Submit" onClick={submitForm} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
