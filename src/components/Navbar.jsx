import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/chartlogo.png'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-between'>
        <div>
            <Link href='/'>
                <Image width={75} height={75} src={logo} alt='the weird logo'></Image>
            </Link>
        </div>
        <div className='columns-2'>
            <div>
                <h1>other shans</h1>
            </div>
            <div>
            <Link href='/account'>
                <h1>account</h1>
            </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar