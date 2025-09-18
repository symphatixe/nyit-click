'use client';
import React from 'react'
import { useState } from "react";

import { LuMenu } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import Link from 'next/link';



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
          ? "fixed left-0 top-0 w-[65%] md:hidden h-screen bg-[#f0eada] pt-6 px-5 ease-in duration-500"
        : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
      }>
        <div className='flex w-full items-center justify-end'>
          <div onClick={handleMenu} className='cursor-pointer'>
            <IoCloseCircle size={30}/>
            
          </div>
          
        </div>
        <div className='flex-col py-4'>
          <ul>
            <Link href="/">
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4"> Home </li>
            </Link>
            <Link href="/planner">
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4"> Planner </li>
            </Link>
            <Link onClick={handleMenu} href="/Placeholder1">
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4"> Placeholder1 </li>
            </Link>
            <Link href="/Placeholder2">
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4"> Planceholder2</li>
            </Link>
            <Link href="/resources">
              <li onClick={handleMenu} className="uppercase hover:border-b text-xl py-4"> Resources </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
    
  )
}

export default Menu



