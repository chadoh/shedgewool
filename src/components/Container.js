import React from 'react';
import '../styles/Container.css';

export default ({children}) => {
  return (
    <div className="Container">
      {children}
    </div>
  );
}
