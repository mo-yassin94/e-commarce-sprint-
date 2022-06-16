import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';

function Header() {
  const value = useContext(GlobalState);
  return <div>{value}</div>;
}

export default Header;
