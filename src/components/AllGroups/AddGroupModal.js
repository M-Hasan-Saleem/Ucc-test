import { baseUrl } from "../../utils/baseUrl";
import React, { useState , useEffect} from "react";
import { Button } from "reactstrap";
import axios from 'axios'





export default function AddAnimationModal(props) {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addNewGroup').classList.remove('show');
        // console.log('removed')
      }
      const [animationimgstate, setanimationimgstate] = useState('')
      const [animationimgstate2, setanimationimgstate2] = useState('')
      const [description, setdescription] = useState('')
      const [animationcoin, setanimationcoin] = useState('')
      const [animationfield, setanimationfield] = useState('')
      const [currentCategory, setCurrentCategory] = React.useState('GREEN')
      const changeCategory = (newCategory) => {
          setCurrentCategory(newCategory)
      }
  
      const [AdminData, setAdminData] = useState([]);
      
      useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

      const handelClick = async () => {
          let getInput = animationfield;
          if (getInput && currentCategory&&animationimgstate&&description&&animationcoin) {
              
              var data = new FormData();
              data.append('group_name',animationfield)
              data.append('group_description',description)
              data.append('profile_image',animationimgstate)
              data.append('cover_image',animationimgstate2)
              data.append('rules',animationcoin)
              data.append('user_id',AdminData._id)
            //   console.log(data)
            let response = await axios.post(`${baseUrl}/groups/add_group`, data, {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}});
            console.log(response)
             setanimationfield('')
             setanimationcoin('')
             setdescription('')
            document.getElementById('munnababa').click();
            document.getElementById('addNewGroup').classList.remove('show');
            props.getAllGroupsAPI();
      }
    }

    return (
        <>
                <div className="modal fade" id="addNewGroup" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-transparent">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{closeAddAnimationModal()}}></button>
                            </div>
                            <div className="modal-body px-sm-5 mx-50 pb-5">
                                <h1 className="text-center mb-1" id="addNewCardTitle">Add New Group</h1>
                               

                                <form  className="row gy-1 gx-2 mt-75">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="modalAddCardNumber">Group name</label>
                                        <div className="input-group input-group-merge">
                                            <input onChange={(e)=>{setanimationfield(e.target.value)}} value={animationfield} className="form-control add-credit-card-mask" type="text" placeholder="Enter Animation Name"  />
                                           
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="modalAddCardNumber">Group Description </label>
                                        <div className="input-group input-group-merge">
                                            <input onChange={(e)=>{setdescription(e.target.value)}} value={description} className="form-control add-credit-card-mask" type="text" placeholder="Enter Description"  />
                                           
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="modalAddCardNumber">Rules </label>
                                        <div className="input-group input-group-merge">
                                            <input onChange={(e)=>{setanimationcoin(e.target.value)}} value={animationcoin} className="form-control add-credit-card-mask" type="text" placeholder="Set Rules"  />
                                           
                                        </div>
                                    </div>
                                    <div className="col-12">
                                    <label className="form-label" htmlFor="customFile">Upload Profile Picture</label>
                                     <input type="file" onChange={(e)=>setanimationimgstate(e.target.files[0])} className="form-control" id="customFile" accept="image/*"/>
                                    </div>
                                    <div className="col-12">
                                    <label className="form-label" htmlFor="customFile">Upload Cover Picture</label>
                                     <input type="file" onChange={(e)=>setanimationimgstate2(e.target.files[0])} className="form-control" id="customFile" accept="image/*"/>
                                    </div>

                                 

                                   

                                    <div className="col-12 text-center">
                                    
                                    <Button className='me-1' color='primary'   onClick={handelClick}>Submit</Button>
                                        <Button  color='secondary'outline onClick={closeAddAnimationModal}>
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
