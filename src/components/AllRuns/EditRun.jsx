import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";
import { baseUrl, domain } from "../../utils/baseUrl";
import ReactFancyBox from 'react-fancybox'

export default function EditRun({UpdateData}) {
    const [AdminData, setAdminData] = useState([]);
    const [RunCategory, setRunCategory] = useState([]);


    const [Name, setName] = useState();
    const [Price, setPrice] = useState();
    const [Description, setDescription] = useState();
    const [PhysicalAddress, setPhysicalAddress] = useState();
    const [Latitude, setLatitude] = useState();
    const [Longitude, setLongitude] = useState();
    const [Hour, setHour] = useState();
    const [RunImage, setRunImage] = useState();
    const [RunCategoryId, setRunCategoryId] = useState();
    const [City, setCity] = useState();

    useEffect(() => {
        getRunCategory()
        setName(UpdateData?.name)
        setPrice(UpdateData?.price)
        setDescription(UpdateData?.description)
        setPhysicalAddress(UpdateData?.physical_address)
        setLatitude(UpdateData?.latitude)
        setLongitude(UpdateData?.longitude)
        setHour(UpdateData?.hours)
        setRunCategoryId(UpdateData?.run_category_id)
        setCity(UpdateData?.city)
    }, [UpdateData])

    let ApiKey = 'AIzaSyBtGPJeKV8bZQuM73Yr97Q_FNKBqEnkDJ4';
    const getRunCategory = async () => {
        let data = await axios.get(`${baseUrl}/run_category/getAllRunCategories`, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        data = data.data;
        setRunCategory(data.message);
    }
    useEffect(() => {
        let data = localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    const closeEditRunModal = () => {
        document.getElementById('addNewCard').classList.remove('show');
    }

    const handelClick = async () => {
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

        let data = await axios.put(`${baseUrl}/run/update/${UpdateData._id}`,formData, {
            headers: { Authorization: `Bearer ${AdminData?.JWT_TOKEN}` },
        });
        if(data.data.status === 200){
            // setRunImage({})
            alert(data.data.message)
            document.getElementById('addNewCard').classList.remove('show');
            // navigate('/getAllRuns')
        }
    }
    return (
        <>
            <div className="modal fade" id="addNewCard" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-transparent">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeEditRunModal() }}></button>
                        </div>
                        <div className="modal-body px-sm-5 mx-50 pb-5">
                            <h1 className="text-center mb-1" id="addNewCardTitle">Edit Run Details</h1>
                            <form className="row gy-1 gx-2 mt-75">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="modalAddCardNumber">Run Name</label>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setName(e.target.value) }} value={Name} className="form-control add-credit-card-mask" type="text" placeholder="Enter Run Name" />
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <textarea onChange={(e) => { setDescription(e.target.value) }} value={Description} className="form-control add-credit-card-mask mt-1" placeholder="Enter Description"></textarea>
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setPrice(e.target.value) }} value={Price} className="form-control add-credit-card-mask mt-1" type="number" placeholder="Enter Price" />
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setHour(e.target.value) }} value={Hour} className="form-control add-credit-card-mask mt-1" type="number" placeholder="Enter Hours" />
                                    </div>
                                    {/* <div className="input-group input-group-merge"> */}
                                    <Autocomplete
                                        apiKey={ApiKey}
                                        style={{ width: "90%" }}
                                        onPlaceSelected={async (place) => {
                                            setPhysicalAddress(place.formatted_address);
                                            let latLong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place.place_id}&key=${ApiKey}`)
                                            let cityName = latLong.data.results[0].address_components;
                                            cityName = cityName[cityName.length - 3]['long_name']
                                            latLong = latLong.data.results[0].geometry.location;
                                            setLatitude(latLong.lat);
                                            setLongitude(latLong.lng);
                                            setCity(cityName)
                                        }}
                                        defaultValue={PhysicalAddress ?? ''}
                                    />
                                    {/* </div> */}
                                    <div className="input-group input-group-merge">
                                        <input onChange={(e) => { setRunImage(e.target.files[0])}} className="form-control add-credit-card-mask mt-1" type="file" placeholder="" />
                                    </div>
                                    <ReactFancyBox
                                        thumbnail={UpdateData?.run_image? URL.createObjectURL(RunImage) : domain + UpdateData?.run_image}
                                        image={UpdateData?.run_image ? URL.createObjectURL(RunImage) : domain + UpdateData?.run_image} />
                                    <div className="input-group input-group-merge">
                                        <select className="form-control add-credit-card-mask mt-1" onChange={(e) => setRunCategoryId(e.target.value)}>
                                            {RunCategory?.map((v, i) => {
                                                return (
                                                    <option value={v._id} selected={v._id === RunCategoryId ? true : false}>{v.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <Button className='me-1' color='primary' onClick={handelClick}>Submit</Button>
                                    <Button color='secondary' outline onClick={closeEditRunModal}>
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
