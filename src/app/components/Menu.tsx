'use client';
import React from 'react'
import { useState } from "react";

import { LuMenu } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import Link from 'next/link';
import { navItems } from '../../../constants';



const Menu = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!openMenu);
    console.log(openMenu);
  }

  return (

    <div>
      <div onClick={handleMenu} className='cursor-pointer pl-24'>
        <LuMenu
        size={25}
        />
      </div>
      <div className={
        openMenu
          ? "fixed left-0 top-0 w-[65%] lg:hidden h-screen bg-[#f0eada] pt-6 px-5 ease-in duration-500"
        : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
      }>
        <div className='flex w-full items-center justify-end'>
          <div onClick={handleMenu} className='cursor-pointer'>
            <IoCloseCircle size={30}/>
            
          </div>
          
        </div>
        <div className='flex-col py-4'>
          <ul>
            {navItems.map((item) => (
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4" key={item.name}>
                <Link href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
  )
}

export default Menu



