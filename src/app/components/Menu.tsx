'use client';
import React from 'react'
import { useState } from "react";

import { LuMenu } from "react-icons/lu";



const Menu = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!openMenu);
    console.log(openMenu);
  }

  return (
    <div onClick={handleMenu} className='cursor-pointer pl-24'>
        <LuMenu
        size={25}
        />
    </div>
  )
}

export default Menu



