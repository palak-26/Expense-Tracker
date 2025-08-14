import React, { useState ,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import expenseLogo from "../assets/expenseLogo.png";

const NavBar = () => {
    const list = ["Home", "About", "ContactUs" ];
    const [isScrolled, setIsScrolled]  = useState()
    useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const navigate = useNavigate();

    useEffect(()=>{
        const path = ({item})=>{
        let p = `/${item.toLowerCase()}`;
        navigate(p);
        
    }

    },[])
    
  return (
    <div>
        <div className={`absolute fixed z-50 top-0 w-full min-w-full h-20 p-5 border-5 border-black flex  items-center justify-center ${isScrolled ? "bg-white/20 shadow-md dark:bg-slate-900 dark:transition-all dark:duration-100 " : "  dark:bg-slate-800/30 dark:backdrop-blur-lg  dark:transition-all dark:duration-100"}`}>
            

            <div className='flex justify-evenly w-1/2 justify-center items-center p-4'>
                <ul  className='flex justify-evenly w-full'>
                    {list.map((item)=>(
                    <li key={item} className='cursor-pointer font-bold text-black decoration-0 text-lg hover:text-[#4d31a3]' onClick={()=> path({item}) }>
                        {item}
                    </li>
                    ))}
                </ul>

                <button className='font-semibold text-white bg-[#6744ce] p-2 rounded-md' onClick={()=> navigate("/login")}>Login/Register</button>
            </div>
        </div>
    </div>
  )
}

export default NavBar