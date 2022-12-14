import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from '../views/Home'
import Login from '../views/Login'
import Animation from '../views/Animation'
import Profile from '../views/Profile'
import AllUsers from '../views/AllUsers';
import AllRoles from '../views/AllRoles';
import AllGroups from '../views/AllGroups';
import AllCategories from '../views/AllCategories';
import AllVideos from '../views/AllVideos';
import AllChannels from '../views/AllChannels';
import AllMemberships from '../views/AllMemberships';
import AllBlogs from '../views/AllBlogs';
import AllPosts from '../views/AllPosts';
import AllEvents from '../views/AllEvents';
import AllPages from '../views/AllPages';
import Orders from '../views/Orders';
import MerchantPayment from '../views/MerchantPayment';
import AllGroupPost from '../views/AllGroupPost';
import Shop from '../views/Shop';
import Run from '../views/AllRuns';
import CreateRun from '../views/CreateRun';
import RunCategory from '../views/RunCategory';
import UserProfile from '../views/UserProfile';
import ApprovedEventsPage from '../views/ApprovedEvents';
import RejectedEventsPage from '../views/RejectedEvents';
import ShopCategories from '../views/ShopCategories';
import Payment from '../views/Payment';

export default function AppRoute() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/login" element={<Login/>}></Route>
                    <Route exact path="/Animation" element={<Animation/>}></Route>
                    <Route exact path="/Profile" element={<Profile/>}></Route>
                    <Route exact path="/Profile/:userProfileId" element={<UserProfile/>}></Route>
                    <Route exact path='/AllUsers' element={<AllUsers />} />
                    <Route exact path='/AllRoles' element={<AllRoles />} />
                    <Route exact path='/AllGroups' element={<AllGroups />} />
                    <Route exact path='/AllCategories' element={<AllCategories />} />
                    <Route exact path='/AllVideos' element={<AllVideos />} />
                    <Route exact path='/AllPages' element={<AllPages />} />
                    <Route exact path='/MerchantPayment' element={<MerchantPayment />} />
                    <Route exact path='/AllChannels' element={<AllChannels />} />
                    <Route exact path='/Orders' element={<Orders />} />
                    <Route exact path='/AllMemberships' element={<AllMemberships />} />
                    <Route exact path='/AllBlogs' element={<AllBlogs />} />
                    <Route exact path='/AllPosts' element={<AllPosts />} />
                    <Route exact path='/AllEvents' element={<AllEvents />} />
                    <Route exact path='/RejectedEvents' element={<RejectedEventsPage />} />
                    <Route exact path='/ApprovedEvents' element={<ApprovedEventsPage />} />
                    <Route exact path='/AllGroupPost' element={<AllGroupPost />} />
                    <Route exact path='/Shop' element={<Shop />} />
                    <Route exact path='/shopCategories' element={<ShopCategories />} />
                    <Route exact path='/getAllRuns' element={<Run />} />
                    <Route exact path='/createRun' element={<CreateRun />} />
                    <Route exact path='/runCategory' element={<RunCategory />} />
                    <Route exact path='/payment' element={<Payment />} />
                </Routes>        
           </Router>
        </div>
    )
}
