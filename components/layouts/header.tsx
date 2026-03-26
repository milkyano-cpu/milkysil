'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/product', label: 'Product' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact Us' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // useEffect(() => {
  //   setOpen(false)
  // }, [pathname])

  return (
    <header
      className={`w-full z-20 transition-[background-color,box-shadow,padding] duration-500 ease-in-out ${
        scrolled ?
        // 'bg-[#4A7D6D] shadow-lg py-3'
        ''
        :
        'bg-transparent'
      }`}
    >
      <nav className="w-full h-[87px] md:h-28 flex items-center justify-between px-9 md:px-50">
        <Image
          src="/milkysil-logo.svg"
          priority
          alt="logo"
          width={300}
          height={100}
          className="w-[200px] md:w-[320px] h-auto"
        />

        {/* Desktop nav */}
        <ul className="hidden md:flex h-[52.5px] items-center gap-8 text-primary text-lg font-normal">
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
            <a
              href="https://wa.me/628170297297"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'cta', size: 'cta' }))}
            >
              Request a Quote
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Image
            src="/iconamoon_menu-burger-horizontal-fill.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>

        {/* Mobile slide-out menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Image
                src="/milkysil-logo.svg"
                alt="logo"
                width={200}
                height={100}
                className="h-auto"
              />
            </SheetHeader>
            <nav className="flex flex-col gap-2 px-4 mt-4">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href

                return (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'py-3 text-lg text-primary transition-colors hover:text-blue border-b border-gray-100',
                        isActive && 'font-semibold text-blue'
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
            <div className="mt-auto p-4">
              <SheetClose asChild>
                <a
                  href="https://wa.me/628170297297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'cta', size: 'cta' }),
                    'w-full'
                  )}
                >
                  Request a Quote
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
export default Header
