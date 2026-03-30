"use client"

import { MessageCircle } from "lucide-react"

interface WhatsAppCTAProps {
  productName: string
  sticky?: boolean
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281221aborneot"

export default function WhatsAppCTA({ productName, sticky = false }: WhatsAppCTAProps) {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER

  const button = (
    <a
      href={`https://wa.me/${waNumber}?text=Halo%20Milkysil%2C%20saya%20mengunjungi%20website%20Milkysil%20dan%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20produk%20yang%20tersedia.%20Mohon%20bantuannya.%20Terima%20kasih.`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-3 px-6 rounded-xl transition w-full shadow-lg"
    >
      <MessageCircle size={20} />
      Minta Penawaran
    </a>
  )

  if (sticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/90 backdrop-blur border-t md:hidden">
        {button}
      </div>
    )
  }

  return button
}
