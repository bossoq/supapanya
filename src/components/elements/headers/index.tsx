import React from 'react'
import TopBanner from './topbanner'
import Logo from './logo'
import Navbar from './navbar'

const Header = (): JSX.Element => {
  return (
    <>
      <TopBanner />
      <Logo />
      <Navbar />
    </>
  )
}

export default Header
