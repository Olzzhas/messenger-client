import React from 'react';

const Layout = ({ children }) => {
   return (
      <div className="min-h-screen flex flex-col bg-[#e5e5e5]">{children}</div>
   );
};

export default Layout;
