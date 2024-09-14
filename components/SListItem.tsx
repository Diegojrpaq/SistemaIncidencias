"use client";
import React from 'react';

interface SListItemProps {
  icon: string;
  children: React.ReactNode;
}

const SListItem: React.FC<SListItemProps> = (props) => {
  return (
    <li className='li-sub mt-5 h5'>
      <i className={props.icon}></i>
      {props.children}
    </li>
  );
};

export default SListItem;