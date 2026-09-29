import React from 'react'
import { useTheme } from './hooks/useTheme';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerify from './pages/OTPVerify';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Document from './pages/Document';
import Summary from './pages/Summary';
import MCQs from './pages/MCQs';
import Chat from './pages/Chat';
import Workspace from './pages/Workspace';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/otp-verify" element={<OTPVerify/>} />

         {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Document />} />
        <Route path="summary" element={<Summary />} />
        <Route path="mcqs" element={<MCQs />} />
        <Route path="chat" element={<Chat />} />
        <Route path="workspace/:docId" element={<Workspace />} />
      </Route>
      </Routes>
    </>
  )
}

export default App
