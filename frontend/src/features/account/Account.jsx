import React, { useState } from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx';

export default function Account() {
  const [mode, setMode] = useState("login");
  return (
    <div className='space-y-4'>
      <OtherPageHeroSection text="My Account"/>
      {mode === "login" ? <LoginForm setMode={setMode} /> : <RegisterForm setMode={setMode} />}
      <PolicySection/>
    </div>
  )
}
