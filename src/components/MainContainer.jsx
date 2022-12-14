import React, { useEffect } from 'react';

import { HomeContainer, RowContainer, MenuContainer, CartContainer } from './index';
import { useStateValue } from '../context/StateProvider';

const MainContainer = () => {
  const [{foodItems, cartShow}, dispatch] = useStateValue();
  
  useEffect(() => {
    //console.log(cartShow);
  }, [cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
            before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400
            to-orange-600 transition-all duration-300 ease-in-out max-w-[500px]">
            Our fresh & healthy Fruits
          </p>
        </div>

        <RowContainer flag={false} data={foodItems?.filter((n) => n.category === 'fruits')} />
      </section>

      <MenuContainer />
      
      {cartShow && (
        <CartContainer />
      )}
    </div>
  )
}

export default MainContainer;
