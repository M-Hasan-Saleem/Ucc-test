import React, { useState , useEffect} from "react";
import { Button } from "reactstrap";
import { baseUrl } from "../../utils/baseUrl";
import axios from 'axios'



export default function AddAnimationModal() {
    // const close = <button type='button' className='ms-1 btn-close'></button>
    const closeAddAnimationModal = () => {
        document.getElementById('addNewPassword').classList.remove('show');
        // console.log('removed')
      }
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

      const changePassword = async () => {

        let data = {
            "_id":AdminData._id,
            "password":animationfield
        }

        let response = await axios.post(`${baseUrl}/users/changePassword`, data, {headers: {Authorization: `Bearer ${AdminData?.JWT_TOKEN}`}});
        // console.log(response)
        
        response?.data?.status === 200 && document.getElementById('addNewPassword').classList.remove('show');
      }
  
    
      

    return (
        <>
                <div className="modal fade" id="addNewPassword" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-transparent">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{closeAddAnimationModal()}}></button>
                            </div>
                            <div className="modal-body px-sm-5 mx-50 pb-5">
                                <h1 className="text-center mb-1" id="addNewCardTitle">Change Password</h1>
                               

                                <form  className="row gy-1 gx-2 mt-75">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="modalAddCardNumber">Create New Password</label>
                                        <div className="input-group input-group-merge">
                                            <input onChange={(e)=>{setanimationfield(e.target.value)}} value={animationfield} className="form-control add-credit-card-mask" type="password" placeholder="Enter Your New Password"  />
                                           
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                    
                                    <Button className='me-1' color='primary' onClick={changePassword}>Confirm</Button>
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
