import React from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';

const ItemsContainer = ({ data }) => {

  return (
    <div className="w-full gap-1 md:gap-3 py-12 bg-rowBg flex flex-wrap items-center justify-center">
        {(data && data?.length > 0) ? data?.map((item) => (
          <div key={item?.id} 
            className="w-225 m-auto h-auto bg-blue-200 rounded-lg p-2 px-3 hover:shadow-lg duration-300 my-12
            hover:bg-blue-300 md:mx-4">
            <div className="flex items-center justify-between">
              <motion.img 
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL} 
                alt="fruit"
                className="w-20 max-w-20 h-20 max-h-20 -mt-10 rounded-md hover:rounded-none" 
              />
              <motion.div
                whileTap={{ scale: 0.75 }} 
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