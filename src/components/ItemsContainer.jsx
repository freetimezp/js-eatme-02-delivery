import React, { useState, useEffect } from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const ItemsContainer = ({ data }) => {
  const [items, setItems] = useState([]);
  const [{cartItems}, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div className="w-full gap-0 md:gap-3 py-12 bg-rowBg flex flex-wrap items-center justify-center">
        {(data && data?.length > 0) ? data?.map((item) => (
          <div key={item?.id} 
            className="w-300 h-[160px] md:w-225 md:h-[140px] m-auto bg-blue-200 rounded-lg p-2 px-3 hover:shadow-lg 
            duration-300 my-12 hover:bg-blue-300 md:mx-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pl-2 md:pl-0">
              <motion.img 
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL} 
                alt="fruit"
                className="w-[100px] md:w-20 max-w-[100px] md:max-w-20 h-[100px] md:h-20 max-h-[100px] md:max-h-20 
                -mt-10 rounded-md hover:rounded-none hover:scale-125 transition-all duration-300" 
              />
              <motion.div whileTap={{ scale: 0.75 }} onClick={() => setItems([...cartItems, item])}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
        
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}  
              </p> 
              <p className="mt-1 text-sm italic text-gray-700">{item?.calories} calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-700">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        )):(
          <div className="w-full flex items-center justify-center relative">
            <img src={NotFound} alt="NoItems" className="h-420" />
            <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] py-4 px-10 bg-red-700
              text-lg text-white">
              Wait a liitle, we work on adding new..
            </p>
          </div>
        )}
    </div>
  )
}

export default ItemsContainer;
