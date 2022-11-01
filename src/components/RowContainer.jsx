import React from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';

const RowContainer = ({ flag }) => {
  return (
    <div className={`w-full my-12 bg-rowBg ${flag ? "overflow-x-scroll" : "overflow-x-hidden"}`}>
      <div 
        className="w-300 md:w-340 h-auto bg-blue-50 rounded-lg p-2 backdrop-blur-md my-12 hover:shadow-lg duration-300
        hover:bg-blue-100"
      >
        <div className="w-full flex items-center justify-between">
          <motion.img 
            whileHover={{ scale: 1.2 }}
            src="https://img.freepik.com/free-photo/pleased-blonde-woman-with-red-lips-posing-with-friend-new-year-party-laughing-light-wall_197531-6066.jpg?w=1380&t=st=1667332331~exp=1667332931~hmac=2b335c4e7a0313d12da928f9963d08a3730b40c265c03d9ec881a3f965122dae" 
            alt=""
            className="w-40 -mt-8 rounded-md hover:rounded-none" 
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
            Chocolate & Vanilla  
          </p> 
          <p className="mt-1 text-sm text-gray-500">45 calories</p>
          <div className="flex items-center gap-8">
            <p className="text-lg text-headingColor font-semibold">
              <span className="text-sm text-red-500">$</span> 5.25
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RowContainer;
