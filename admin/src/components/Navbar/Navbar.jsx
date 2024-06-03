import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Logo of the logo" />
        <img className='profile' src={assets.profile_image} alt="Image of the Admin" />
    </div>
  )
}

export default Navbar
