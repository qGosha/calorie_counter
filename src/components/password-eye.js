import React, { Component } from "react";
import FontAwesome from 'react-fontawesome';

export const PasswordEye = ({showPassword}) => {
  return (<div className="btn btn-lg btn-primary"> {
     showPassword ? <FontAwesome
      className='fas fa-eye'
      name='eye'
      size='1x'
    />
    : 
     <FontAwesome
      className='fas fa-eye-slash'
      name='eye-slash'
      size='1x'
    />
  
  }</div>)
 
  
}