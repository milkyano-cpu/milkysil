'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
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

const productSubLinks = [
  { href: '/milkysil/product', label: 'MilkySil' },
  { href: '/milkyclean/product', label: 'MilkyClean' },
  { href: '/trading/product', label: 'Trading & Distribution' },
  { href: '/product', label: 'Other Products' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [productExpanded, setProductExpanded] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isProductActive =
    pathname === '/product' ||
    pathname.startsWith('/product/') ||
    pathname.startsWith('/milkysil/') ||
    pathname.startsWith('/milkyclean/') ||
    pathname.startsWith('/trading/')

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
            if (href === '/product') {
              return (
                <li key={href} className="relative group">
                  <span
                    className={`relative pb-3 transition-colors duration-300 ease-in-out hover:text-blue cursor-default ${
                      isProductActive ? 'font-semibold' : ''
                    }`}
                  >
                    {label}
                    <ChevronDown className="inline w-4 h-4 ml-0.5 align-middle transition-transform group-hover:rotate-180" />
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 block h-0 transition-all duration-300 ease-in-out ${
                        isProductActive
                          ? 'w-full scale-x-100 opacity-100'
                          : 'w-full scale-x-0 opacity-0'
                      }`}
                      style={{ borderBottom: '1.35px solid #1674D3' }}
                    />
                  </span>

                  {/* Invisible bridge to prevent hover gap */}
                  <div className="absolute top-full left-0 h-3 w-full" />

                  {/* Dropdown */}
                  <div className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                    <div className="bg-white rounded-xl shadow-lg border py-2 min-w-[220px]">
                      {productSubLinks.map((sub) => {
                        const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/')
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              'block px-5 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-blue',
                              isSubActive ? 'text-blue font-semibold' : 'text-primary'
                            )}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </li>
              )
            }

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
              href="https://wa.me/628170297297?text=Halo%20Milkysil%2C%20saya%20mengunjungi%20website%20Milkysil%20dan%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20produk%20yang%20tersedia.%20Mohon%20bantuannya.%20Terima%20kasih."
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
                if (href === '/product') {
                  return (
                    <div key={href}>
                      <button
                        onClick={() => setProductExpanded(!productExpanded)}
                        className={cn(
                          'w-full flex items-center justify-between py-3 text-lg text-primary transition-colors hover:text-blue border-b border-gray-100 cursor-pointer',
                          isProductActive && 'font-semibold text-blue'
                        )}
                      >
                        {label}
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 transition-transform duration-200',
                            productExpanded && 'rotate-180'
                          )}
                        />
                      </button>
                      {productExpanded && (
                        <div className="pl-4 flex flex-col">
                          {productSubLinks.map((sub) => {
                            const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/')
                            return (
                              <SheetClose asChild key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className={cn(
                                    'py-2.5 text-base text-primary transition-colors hover:text-blue border-b border-gray-50',
                                    isSubActive && 'font-semibold text-blue'
                                  )}
                                >
                                  {sub.label}
                                </Link>
                              </SheetClose>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

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
                  href="https://wa.me/628170297297?text=Halo%20Milkysil%2C%20saya%20mengunjungi%20website%20Milkysil%20dan%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20produk%20yang%20tersedia.%20Mohon%20bantuannya.%20Terima%20kasih."
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
