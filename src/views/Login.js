import React,{useState,useEffect} from 'react'
import { baseUrl } from '../utils/baseUrl';
import Logo from '../assets/images/got.png'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
const axios = require('axios');

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('GotNextAdmin')){
            navigate('/')
        }
    }, [])

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [LoginAPIMessage, setLoginAPIMessage] = useState('')
    const [EyeStatus, setEyeStatus] = useState(false)

    const loginAdmin = async () => {
      
        document.getElementById('loginBtn').disabled = true;
      
        let userCredentials = {
            email : Email,
            password : Password
        }
        
        let request = await axios.post(`${baseUrl}/auth/login`, userCredentials);
        let {data} = request;
        if(data.user !== ""){
            let AllData = data.user;
            localStorage.setItem('GotNextAdmin', JSON.stringify(AllData));
            document.getElementById('loginAPIMessage-div').classList.add('bg-green');
            setLoginAPIMessage('Login Successful');
            setTimeout(() => {
                navigate('/');
            }, 500);
            document.getElementById('loginBtn').disabled = false;
        }else{
            document.getElementById('loginAPIMessage-div').classList.add('bg-red');
            setLoginAPIMessage(data.message);
        }
        // else if(data.message){
        //     document.getElementById('loginAPIMessage-div').classList.add('bg-red');
        //     setLoginAPIMessage(data.message)
        //     document.getElementById('loginBtn').disabled = false;
        // }
        document.getElementById('loginBtn').disabled = false;
    }
    
    const [IsRegisterFormOpen, setIsRegisterFormOpen] = useState(false)
    // make 4 state for 4 input

    return (
        <div className='login-wrp'>
            <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
            <div className="content-header row">
            </div>
            <div className="content-body">
                <div className="auth-wrapper auth-basic px-2">
                    <div className="auth-inner my-2">
                       
                        <div className="card mb-0">
                            <div className="card-body">
                                <div id='loginAPIMessage-div'>{LoginAPIMessage}</div>
                                <Link to='' className="login-log brand-logo">
                                    <img src={Logo} alt=''/>
                                </Link>

                                <h4 className="card-title mb-1">Welcome to UCC on Demand????</h4>
                               
                                {
                                    IsRegisterFormOpen ?
                                    <div>
                                        <p className="card-text mb-2">Please Enter your Email</p>

                                        <form className="auth-login-form mt-2" >
                                            <div className="mb-1">
                                                <label htmlFor="login-email" className="form-label">Email</label>
                                                <input type="text" className="form-control" id="login-email" name="login-email" placeholder="john@example.com" aria-describedby="login-email" tabIndex="1" autoFocus
                                                value={Email} 
                                                onChange={(e)=>{setEmail(e.target.value)}}
                                                />
                                            </div>

                                            
                                        </form>
                                        <button id='loginBtn' className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    :
                                    <div>
                                        <p className="card-text mb-2 text-center">Please sign-in to your account and start the adventure</p>

                                        <form className="auth-login-form mt-2" >
                                            <div className="mb-1">
                                                <label htmlFor="login-email" className="form-label">Email</label>
                                                <input type="text" className="form-control" id="login-email" name="login-email" placeholder="john@example.com" aria-describedby="login-email" tabIndex="1" autoFocus
                                                value={Email} 
                                                onChange={(e)=>{setEmail(e.target.value)}}
                                                />
                                            </div>

                                            <div className="mb-1">
                                                <div className="d-flex justify-content-between">
                                                    <label className="form-label" htmlFor="login-password">Password</label>
                                            
                                                </div>
                                                <div className="input-group input-group-merge form-password-toggle">
                                                    <input type={EyeStatus ? 'text' : 'password'} className="form-control form-control-merge" id="login-password" name="login-password" tabIndex="2" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="login-password"
                                                    value={Password}
                                                    onChange={(p)=>{setPassword(p.target.value)}}
                                                    />
                                                    <span className="input-group-text cursor-pointer" onClick={e => setEyeStatus(!EyeStatus)}><i className="fal fa-eye"></i></span>
                                                </div>
                                            </div>
                                            
                                        
                                        </form>
                                        <button id='loginBtn' className="btn btn-primary w-100" onClick={loginAdmin}>Sign in</button>
                                    </div>
                                }

                                <p className="text-center mt-2">
                                    
                                    {/* <Link to=''>
                                        <span>Forgot Password?</span>
                                    </Link> */}
                                    {
                                        IsRegisterFormOpen ?
                                        // <button className='btn btn-primary w-100' onClick={()=>{
                                        //     setIsRegisterFormOpen(false)
                                        // }} >Login</button>
                                        <></>
                                        :
                                        <button className='btn btn-primary w-100' onClick={()=>{
                                            setIsRegisterFormOpen(true)
                                        }} >Forgot Password</button>
                                    }
                                </p>

                              

                                

                                
                            </div>
                        </div>
                       
                    </div>
                </div>

            </div>
        </div>
    </div>
        </div>
    )
}
