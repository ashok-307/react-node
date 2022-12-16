import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useDispatch } from 'react-redux';
import { getUserDetailsAPI } from './store/slices/auth/auth';
import ProtectedRoute from './components/Protected/ProtectedRoute';
// import CustomRoute from './core/components/CustomRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

function App() {
  let dispatchEvent = useDispatch<any>();
  
  useEffect(() => {
    dispatchEvent(getUserDetailsAPI());
  }, [dispatchEvent]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<ProtectedRoute component={Login}/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profiles" element={<Profiles/>} />
        <Route path="/profile/:id" element={<ProtectedRoute component={Profile}/>} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard}/>} />
        <Route path="/create-profile" element={<ProtectedRoute component={CreateProfile}/>} />
        <Route path="/edit-profile" element={<ProtectedRoute component={EditProfile}/>} />
        <Route path="/add-experience" element={<ProtectedRoute component={AddExperience}/>} />
        <Route path="/add-education" element={<ProtectedRoute component={AddEducation}/>} />
        <Route path="/posts" element={<ProtectedRoute component={Posts}/>} />
        <Route path="/posts/:postId" element={<ProtectedRoute component={Post}/>} />
        <Route path="/" index element={<Landing />} />
        {/* <Route path="/login" element={<CustomRoute pathName={'/login'}><ProtectedRoute component={Login}/></CustomRoute>} />
        <Route path="/register" element={<CustomRoute pathName={'/register'}><Register/></CustomRoute>} />
        <Route path="/dashboard" element={<CustomRoute pathName={'/dashboard'}><ProtectedRoute component={Dashboard}/></CustomRoute>} />
        <Route path="/create-profile" element={<CustomRoute pathName={'/create-profile'}><ProtectedRoute component={CreateProfile}/></CustomRoute>} />
        <Route path="/" index element={<CustomRoute pathName={'/'}><Landing /></CustomRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
