import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer';
import BeastlyBuddy from '../shared/BeastlyBuddy';
import BottomTabs from './BottomTabs';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      {/* pt-14 for navbar + on mobile pb-16 for bottom tabs */}
      <main className="flex-1 pt-14 pb-0 md:pb-0">
        <div className="pb-16 md:pb-0">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BeastlyBuddy />
      {/* Mobile-only bottom navigation */}
      <BottomTabs />
    </div>
  );
}