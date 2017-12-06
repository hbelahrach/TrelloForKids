import React, { Component } from 'react';
import cat from '../assets/images/cat';
import dog from '../assets/images/dog';
import dogs from '../assets/images/dogs';

const hello = () => {
  return (
    <div className="container">
      <div>
        <img src={cat} alt=""/>
      </div>

      <div>
        <img src={dog} alt=""/>
      </div>

      <div>
        <img src={dogs} alt=""/>
      </div>
    </div>
  )
}

export default hello;
