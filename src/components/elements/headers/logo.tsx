import React from 'react'
import Image from 'next/image'

const Logo = (): JSX.Element => {
  return (
    <div
      className="container has-text-centered mt-3 mb-3"
      style={{ height: '54px' }}
    >
      <Image
        src={'/images/logo.png'}
        alt={'Supapanya Logo'}
        layout={'fill'}
        objectFit={'contain'}
      />
    </div>
  )
}

export default Logo
