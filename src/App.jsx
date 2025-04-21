import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MultiLevelSidebar } from './Components/Sidebar'
import Home from './pages/Home'
import { Route,Routes } from 'react-router'
import ManageCountry from './pages/ManageCountry'
import ManageState from './pages/ManageState'
import ManagePlace from './pages/ManagePlace'
import ManageDestination from './pages/ManageDestination'


function App() {

  return (
    <>
      <div className="flex h-screen overflow-hidden w-screen">
        <MultiLevelSidebar />
        <div className="overflow-y-auto w-full p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/managecountry" element={<ManageCountry />} />
            <Route path="/managestate" element={<ManageState />} />
            <Route path="/manageplace" element={<ManagePlace />} />
            <Route path="/managedestination" element={<ManageDestination />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App
