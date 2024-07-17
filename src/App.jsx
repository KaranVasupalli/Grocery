import React, { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const getLocalItems = ()=> {
    let list = localStorage.getItem('lists');
    console.log(list);
    if(list){
      return JSON.parse(localStorage.getItem('lists'))
    }else{
      return[];
    }
  }
  const [text, setText] = useState('');
  const [groceries, setGroceries] = useState(getLocalItems);

  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(groceries))
  }, [groceries]);

  const addItem = () => {
    if (text.trim() === '') {
      toast.error('Please enter a grocery item.');
      return;
    }

    setGroceries([...groceries, text]);
    setText('');
    toast('Grocery add successfully.');
  };

  const deleteItem = (index) => {
    const updatedGroceries = [...groceries];
    updatedGroceries.splice(index, 1);
    setGroceries(updatedGroceries);
    toast('Grocery deleted successfully.');
  };

  return (
    <>
      <h1 className='text-center mb-3'>Grocery List</h1>
      <div className='flex gap-4'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type='text'
          className='px-2 py-3 rounded-md'
          placeholder='Enter your grocery item'
        />
        <button onClick={addItem}>Add item</button>
      </div>
      <div className='mt-4 flex flex-col gap-2 rounded-md'>
        {groceries.map((grocery, index) => (
          <div key={index} className='flex justify-between items-center border p-4 rounded-md bg-gray-700 text-orange-600'>
            <p className='text-2xl'>{grocery}</p>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
        {groceries.length === 0 && (
          <p className='text-center text-white mt-4'>Add Some Grocery.</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
