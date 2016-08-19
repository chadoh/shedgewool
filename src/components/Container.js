import React from 'react';
import '../styles/Container.css';

export default ({className, children}) => {
  return (
    <div className={[className, 'Container'].join(' ')}>
      {children}
    </div>
  );
}
