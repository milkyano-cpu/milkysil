'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <header
      className={`fixed w-full z-20 transition-all py-4 ${scrolled ? 'bg-[#4A7D6D] shadow-lg py-3' : 'bg-transparent'} `}
    >
      <nav className='max-w-7xl w-full flex items-center justify-between mx-auto px-4 sm:px-6'>
        <Link href='/'>
          <Image
            src='/images/logo-putih.webp'
            priority
            alt='logo'
            width={80}
            height={51}
          />
        </Link>
        <ul className='hidden md:flex items-center font-bold gap-9 text-white'>
          <li>
            <Link href='/'>Beranda</Link>
          </li>
          <li>
            <Link href='/about'>Tentang Kami</Link>
          </li>
          <li>
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li>
            <Link href='/package'>Paket</Link>
          </li>
          <li>
            <Link href='/contact'>Hubungi Kami</Link>
          </li>
          <li>
            {/* <Button /> */}
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header