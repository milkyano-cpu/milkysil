'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/portfolio', label: 'Products' },
  { href: '/package', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full z-20 transition-[background-color,box-shadow,padding] duration-500 ease-in-out ${
        scrolled ? 'bg-[#4A7D6D] shadow-lg py-3' : 'bg-transparent'
      }`}
    >
      <nav className="w-full h-32 flex items-center justify-between px-50">
        <Link href="/">
          <Image
            src="/milkysil-logo.svg"
            priority
            alt="logo"
            width={367}
            height={70}
          />
        </Link>
        <ul className="flex h-[52.5px] items-center gap-8 text-primary text-lg font-normal">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative pb-3 transition-colors duration-300 ease-in-out hover:text-blue ${
                    isActive ? 'font-semibold' : ''
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 block h-0 transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'w-full scale-x-100 opacity-100'
                        : 'w-full scale-x-0 opacity-0'
                    }`}
                    style={{ borderBottom: '1.35px solid #1674D3' }}
                  />
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: 'cta', size: 'cta' }))}
            >
              Request a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
