import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Calendar, Users, MessageSquare, Globe, User } from 'lucide-react';

const Layout = () => {
  return (
    <>
      <header style={{ 
        padding: '1.2rem', 
        borderBottom: 'var(--border-width) solid var(--primary)', 
        backgroundColor: 'var(--accent)', 
        color: 'var(--primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.1em' }}>MFTDIA</h1>
          <p style={{ fontWeight: 900, fontSize: '0.7rem', color: 'var(--text)' }}>BUILDING YOUR FIRST 1000 DAYS.</p>
        </div>
        <NavLink 
          to="/profile" 
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text)',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          })}
        >
          <User size={28} />
        </NavLink>
      </header>
      
      <main>
        <Outlet />
      </main>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '430px',
        height: '75px',
        backgroundColor: 'var(--bg)',
        borderTop: 'var(--border-width) solid var(--text)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100
      }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '0.6rem',
            fontWeight: 900
          })}
        >
          <Calendar size={22} />
          <span>ROADMAP</span>
        </NavLink>

        <NavLink 
          to="/feed" 
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '0.6rem',
            fontWeight: 900
          })}
        >
          <Globe size={22} />
          <span>TALK</span>
        </NavLink>
        
        <NavLink 
          to="/network" 
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '0.6rem',
            fontWeight: 900
          })}
        >
          <Users size={22} />
          <span>BORROW</span>
        </NavLink>
        
        <NavLink 
          to="/assistant" 
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '0.6rem',
            fontWeight: 900
          })}
        >
          <MessageSquare size={22} />
          <span>ASK</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Layout;
