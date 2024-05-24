import React from 'react';

const Container = ({ children }) => {
   return <div className="flex-grow container mx-auto px-4">{children}</div>;
};

export default Container;
