import Image from 'next/image'
import Navbar from './components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    < >
      <Navbar></Navbar>
      <div className='flex flex-col items-center'>
        <div className='pt-10'>
          <h1 className='text-9xl font-mono italic'>The Chart</h1>
        </div>
        <div>
          <Link href='/connect'>
            <button className='bg-rose-500/50 hover:bg-rose-500 rounded p-2 ' >connect</button>
          </Link>
        </div>
      </div>
    </>
  )
}
