import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically calculate viewport height
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: 'calc(var(--vh, 1vh) * 100)' }}>
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        open={sidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Navbar toggleSidebar={toggleSidebar} /> 
        <Box sx={{ marginTop: '0px', padding: '16px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;