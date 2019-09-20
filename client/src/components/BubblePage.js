import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        // console.log(res.data);
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <button
        className='logout'
        onClick={() => {
          localStorage.removeItem('token');
          props.history.push('/');
        }}>
        Logout
      </button>
      <div className='bubbles-page'>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </div>
    </>
  );
};

export default BubblePage;
