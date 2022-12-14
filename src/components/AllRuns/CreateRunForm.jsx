import React, { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import '../AllPosts/AllPosts.css'
import Autocomplete from "react-google-autocomplete";
import { Navigate, useNavigate } from "react-router-dom";

export default function AllUsers() {

    const [AdminData, setAdminData] = useState([]);
    const [RunCategory, setRunCategory] = useState([]);
    const [Name, setName] = useState();
    const [Price, setPrice] = useState();
    const [Description, setDescription] = useState();
    const [PhysicalAddress, setPhysicalAddress] = useState();
    const [Latitude, setLatitude] = useState();
    const [Longitude, setLongitude] = useState();
    const [City, setCity] = useState();
    const [Hour, setHour] = useState();
    const [RunImage, setRunImage] = useState();
    const [RunCategoryId, setRunCategoryId] = useState();
    let ApiKey = 'AIzaSyBtGPJeKV8bZQuM73Yr97Q_FNKBqEnkDJ4';
    const navigate = useNavigate();

    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
        getRunCategory();
    }, [AdminData])

    const getRunCategory = async () => {
        let data = await axios.get(`${baseUrl}/run_category/getAllRunCategories`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        data = data.data;
        console.log(data);
        setRunCategory(data.message);
    }
    let submitForm = async () => {
        if(!Name || !Description || !Price || !Hour || !PhysicalAddress || !RunCategoryId || !RunImage || !Latitude || !Longitude || !City){
            alert("All fields is required")
            return;
        }
        let formData = new FormData();
        formData.append('name', Name);
        formData.append('description', Description);
        formData.append('price', Price);
        formData.append('hours', Hour);
        formData.append('physical_address', PhysicalAddress);
        formData.append('run_image', RunImage);
        formData.append('run_category_id', RunCategoryId);
        formData.append('latitude', Latitude);
        formData.append('longitude', Longitude);
        formData.append('city', City);

        let data = await axios.post(`${baseUrl}/run/addRunDetail`,formData, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        if(data.data.status == 200){
            alert(data.data.message)
            navigate('/getAllRuns')

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
                                                        <h4 className="card-title">Create Run</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-3"></div>
                                                <div className="col-md-12" style={{padding: '0 20px'}}>
                                                    <p>
                                                        <input id="name" className="form-control" type="text" placeholder="Your Name*" required onChange={(e) => setName(e.target.value)} />
                                                    </p>
                                                    <p class="full-width">
                                                        <textarea id="Description" cols="30" rows="7"  className="form-control" placeholder="Your Description*" onChange={(e) => setDescription(e.target.value)}></textarea>
                                                    </p>
                                                    <p>
                                                        <input id="price"  className="form-control" type="number" placeholder="Price*" required onChange={(e) => setPrice(e.target.value)} />
                                                    </p>
                                                    <p>
                                                        <input id="hour"  className="form-control" type="time" placeholder="Hour*" required onChange={(e) => setHour(e.target.value)} />
                                                    </p>
                                                    <p class="full-width">
                                                        <Autocomplete
                                                            className="form-control"
                                                            apiKey={ApiKey}
                                                            style={{ width: "90%" }}
                                                            onPlaceSelected={async(place) => {
                                                                setPhysicalAddress(place.formatted_address);
                                                                let latLong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place.place_id}&key=${ApiKey}`)
                                                                let cityName = latLong.data.results[0].address_components; 
                                                                cityName = cityName[cityName.length - 3]['long_name']
                                                                latLong = latLong.data.results[0].geometry.location;
                                                                setLatitude(latLong.lat);
                                                                setLongitude(latLong.lng);
                                                                setCity(cityName)
                                                            }}
                                                        />
                                                    </p>
                                                    <p class="full-width">
                                                        <input id="run_image" className="form-control" type="file" required onChange={(e) => setRunImage(e.target.files[0])} />
                                                    </p>
                                                    <p class="full-width">
                                                        <select name="run_category" id="run_category"  className="form-select" onChange={(e) => setRunCategoryId(e.target.value)}>
                                                            <option value="" selected disabled>Select Run Category</option>
                                                            {RunCategory?.map((v, i) => {
                                                                return (
                                                                    <option value={v._id}>{v.name}</option>
                                                                )
                                                            })}
                                                        </select>
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
