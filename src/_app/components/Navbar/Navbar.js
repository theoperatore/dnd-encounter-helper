import React from 'react';
import './Navbar.less';

export default function Navbar(props) {
  const {
    title,
    onLeftMenuClick,
    onRightMenuClick,
  } = props;
  return <div className='navbar'>
    <span
      className='fa fa-bars navbar-btn'
      onClick={onLeftMenuClick}
    ></span>
    <h3 className='navbar-title'>{title}</h3>
    <span
      className='fa fa-ellipsis-v navbar-btn'
      onClick={onRightMenuClick}
    ></span>
  </div>
}
