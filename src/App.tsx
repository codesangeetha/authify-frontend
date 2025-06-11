import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ProfileImageUpload from './Components/ProfileImageUpload/ProfileImageUpload';
import AdminLogin from './Components/adminLogin/AdminLogin';
import AdminHome from './Components/adminHome/AdminHome';
import EditUser from './Components/editUser/EditUser';
import CreateUser from './Components/createUser/CreateUser';
import Test from './Components/test/Test';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
      <Route path="/profileimageupload" element={<ProfileImageUpload />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/edituser/:id" element={<EditUser/>}/>
      <Route path="/createuser" element={<CreateUser />} />

      <Route path="/test" element={<Test />} />

    </Routes>

  )
}

export default App;
