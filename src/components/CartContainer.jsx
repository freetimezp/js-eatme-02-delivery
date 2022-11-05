import React from 'react';

import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

import EmptyCart from '../img/emptyCart.svg';

const CartContainer = () => {
  const [{cartShow, cartItems, user}, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 200}} animate={{ opacity: 1, x: 0}} exit={{ opacity: 0, x: 200}}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white flex flex-col z-[101]">
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p whileTap={{ scale: 0.75 }} className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 
          rounded-md hover:shadow-md cursor-pointer text-textColor text-base">
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems && cartItems?.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/*items wrapper*/}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/*item*/}
            {cartItems && cartItems?.length > 0 && cartItems?.map((item) => (
              <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2" key={item.id}>
                <img src={item?.imageURL}
                  className="w-20 h-20 max-w-[60px] rounded-full object-contain" alt="cart" />

                <div className="flex flex-col gap-2 mx-2">
                  <p className="text-base text-gray-50">{item?.title}</p>
                  <p className="text-sm block text-gray-300 font-semibold">$ {item?.price}</p>
                </div>

                <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                  <motion.div whileTap={{ scale: 0.75 }}>
                    <BiMinus className="text-gray-50" />
                  </motion.div>
                  <p className="w-5 h-5 rounded-sm bg-black text-gray-50 flex items-center justify-center">
                    {item?.qty}
                  </p>
                  <motion.div whileTap={{ scale: 0.75 }}>
                    <BiPlus className="text-gray-50" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/*cart total*/}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly 
            px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ 6.2</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 1.1</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ 13.5</p>
            </div>

            {user ? (
              <motion.button whileTap={{ scale: 0.8 }} type="button"
                className="w-full p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-gray-50 
                text-lg my-2 hover:bg-orange-700 hover:bg-gradient-to-l">
                Check Out
              </motion.button>
            ) : (
              <motion.button whileTap={{ scale: 0.8 }} type="button" disabled
                className="w-full p-2 rounded-full bg-red-700 text-gray-50 text-lg my-2">
                Login For Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="empty" className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart..
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer;
