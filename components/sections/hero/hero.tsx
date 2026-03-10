import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative w-full h-[741px] bg-[#E8F0FC] overflow-hidden'>
      <div className='mx-auto flex items-center justify-between'>
        {/* left */}
        <div className='flex flex-col items-start justify-center max-w-[990px] gap-[50px] z-10 pl-[204px] pt-[94px] pb-[184px]'>
          <h1 className='text-primary text-[64px] font-bold leading-[65px] tracking-[-0.03em] max-w-[990px]'>
            Supplier Bahan Kimia Industri & Terpercaya di Indonesia
          </h1>

          <p className='text-primary text-2xl font-normal leading-normal max-w-[780px]'>
            Menyediakan solusi bahan kimia berkualitas tinggi untuk kebutuhan manufaktur, pengolahan air, dan berbagai aplikasi industri.
          </p>

          <Link
            href="/contact"
            className={`${cn(buttonVariants({ variant: 'blue', size: 'cta' }))} mt-[11px]`}
          >
            Lihat Produk
          </Link>
        </div>

      </div>

      {/* right - hero image */}
      <Image
        src="/hero-image.png"
        alt="Produk bahan kimia industri"
        width={800}
        height={741}
        className='absolute right-0 top-0 h-full w-auto object-cover'
        priority
      />
    </section>
  )
}

export default Hero
