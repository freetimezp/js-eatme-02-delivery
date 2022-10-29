import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user}, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if(!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
    
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      });
  
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }else{
      setIsMenu(!isMenu);
    }
  }

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  }

  return (
    <header className="fixed z-50 w-screen p-3 md:p-6 px-4 md:px-16">
      {/* deactop & tanlet */}
      <div className="hidden md:flex h-full w-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> EatMe</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul 
            initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
              ease-in-out cursor-pointer">Home</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
              ease-in-out cursor-pointer">Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
              ease-in-out cursor-pointer">About Us</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
              ease-in-out cursor-pointer">Service</li>
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }} 
              className="w-10 h-10 shadow-2xl cursor-pointer min-w-[40px] min-h-[40px] rounded-full" 
              src={user ? user.photoURL : Avatar} 
              alt="user profile"
              onClick={login} 
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
              >
                {user && user.email === 'fromzpcity@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all
                      duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p 
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all
                  duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden h-full w-full">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> EatMe</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }} 
            className="w-10 h-10 shadow-2xl cursor-pointer min-w-[40px] min-h-[40px] rounded-full" 
            src={user ? user.photoURL : Avatar} 
            alt="user profile"
            onClick={login} 
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
            >
              {user && user.email === 'fromzpcity@gmail.com' && (
                <Link to={'/createItem'}>
                  <p className="px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all
                    duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
                  ease-in-out cursor-pointer px-6 py-3 hover:bg-slate-200">Home</li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
                  ease-in-out cursor-pointer px-6 py-3 hover:bg-slate-200">Menu</li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
                  ease-in-out cursor-pointer px-6 py-3 hover:bg-slate-200">About Us</li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all
                  ease-in-out cursor-pointer px-6 py-3 hover:bg-slate-200">Service</li>
              </ul>

              <p 
                className="m-2 p-3 flex items-center justify-center gap-3 cursor-pointer transition-all
                duration-100 ease-in-out text-textColor text-base bg-slate-200 hover:bg-slate-300
                rounded-md"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;
