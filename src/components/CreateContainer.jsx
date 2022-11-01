import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';

import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { saveItem } from '../utils/firebaseFunctions';

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    //console.log(imageFile);

    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    //console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    //console.log(uploadTask);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot) * 100;
        //console.log(uploadProgress);
      }, 
      (error) => {
        //console.log(error);
        setFields(true);
        setMsg('Error when uploading - try later..');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true); 
          setMsg('Image uploaded successfully!');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted!');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if(!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg('Required fields cant be empty!');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }else{
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveItem(data);

        setIsLoading(false);
        setFields(true);
        setMsg('Data upload successfully!');
        clearData();
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch(error) {
      //console.log(error);
      setFields(true);
      setMsg('Error when uploading - try later..');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCategory(null);
  };

  return (
    <div className="w-full min-h-[calc(100vh-128px)] flex items-center justify-center">
      <div 
        className="w-[90%] md:w-[75%] border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center
          gap-4"
      >
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" 
            ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b-2 border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input 
            type="text" 
            value={title} 
            placeholder="Give me a title..." 
            required 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent outline-none border-none text-textColor 
              placeholder:text-gray-400"
          />
        </div>

        <div className="w-full">
          <select 
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-300 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">Select Category</option>
            {categories && categories.map((item) => (
              <option 
                key={item.id}
                value={item.urlParamName}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full
          h-225 md:h-420 cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ):(
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-400 text-3xl hover:text-gray-600" />
                      <p className="text-gray-400 text-xl hover:text-gray-600">Click here to upload image</p>
                    </div>
                    <input 
                      type="file" 
                      name="uploadImage" 
                      accept="image/*" 
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ):(
                <>
                  <div className="relative h-full">
                    <img 
                      src={imageAsset} 
                      alt="uploaded"
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                      hover:shadow-lg transition-all duration-400 ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row itemc-center gap-2">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input 
              type="text" 
              placeholder="Calories" 
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required 
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400
                text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input 
              type="text" 
              placeholder="Price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required 
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400
                text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none bg-emerald-500 px-12 py-2
            rounded-lg text-lg text-white font-semibold hover:bg-emerald-600"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer;
