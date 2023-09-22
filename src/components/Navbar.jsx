import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-between'>
        <div>
            <Link href='/'>
                <h1>The gay logo</h1>
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