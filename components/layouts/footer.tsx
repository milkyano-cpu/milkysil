import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-[#1E3E6D] text-white pt-16 pb-8">

        <div className="mx-auto max-w-[1400px] px-8 grid grid-cols-4 gap-12">

            {/* Company Info */}
            <div className="space-y-7">
            <Image
                src="/logo-footer.png"
                alt="logo"
                width={500}
                height={300}
            />

                <div className="w-[500px]">
                    <p className="text-sm leading-relaxed text-white/90">
                        <span className="font-semibold">CV. Milky Makmur Sejahtera</span> adalah perusahaan trading dan manufaktur bahan kimia yang berdiri sejak 2003 dan berpusat di Bandung. Kami menyediakan bahan baku dan produk jadi untuk berbagai kebutuhan industri di Indonesia.
                    </p>
                </div>
                {/* Social */}
                <div className="flex gap-4">

                {/* Facebook */}
                <a
                    href="#"
                    className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1E3E6D] transition"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
                    </svg>
                </a>

                {/* X / Twitter */}
                <a
                    href="#"
                    className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1E3E6D] transition"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M18.9 2H21l-6.6 7.5L22 22h-6.8l-5.3-7-6.1 7H1.7l7-8L2 2h6.9l4.8 6.3L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z"/>
                    </svg>
                </a>

                {/* Instagram */}
                <a
                    href="#"
                    className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1E3E6D] transition"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                </a>

                </div>
            </div>

            {/* Company */}
            <div className="pl-70">
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-white/90 text-sm">
                <li><Link href="/" className="hover:text-blue transition whitespace-nowrap">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue transition whitespace-nowrap">About Us</Link></li>
                <li><Link href="/products" className="hover:text-blue transition whitespace-nowrap">Products</Link></li>
                <li><Link href="/industries" className="hover:text-blue transition whitespace-nowrap">Industries</Link></li>
                <li><Link href="/news" className="hover:text-blue transition whitespace-nowrap">Resources</Link></li>
            </ul>
            </div>

        {/* Products */}
        <div className="pl-25">
        <h4 className="font-semibold mb-6 text-lg">Our Products</h4>

        <ul className="space-y-4 text-white/90 text-sm">
            <li>
            <Link href="/products/general-chemicals" className="hover:text-blue transition">
                General Chemicals
            </Link>
            </li>

            <li>
            <Link href="/products/water-treatment" className="hover:text-blue transition whitespace-nowrap">
                Water Treatment Chemicals
            </Link>
            </li>

            <li>
            <Link href="/products/fiberglass-materials" className="hover:text-blue transition whitespace-nowrap">
                Fiberglass Materials
            </Link>
            </li>

            <li>
            <Link href="/products/silicone-emulsion" className="hover:text-blue transition whitespace-nowrap">
                Silicone Emulsion
            </Link>
            </li>

            <li>
            <Link href="/products/household-chemicals" className="hover:text-blue transition whitespace-nowrap">
                Household Chemicals
            </Link>
            </li>

            <li>
            <Link href="/products/food-flavouring" className="hover:text-blue transition whitespace-nowrap">
                Food & Flavouring Ingredients
            </Link>
            </li>
        </ul>
        </div>

        {/* Contact */}
        <div>
        <h4 className="font-semibold mb-6 text-lg">Contact Us</h4>

        <ul className="space-y-4 text-white/90 text-sm">

            <li>
            <a href="tel:0226026165" className="hover:text-blue transition">
                (022) 6026165
            </a>
            </li>

            <li>
            <a
                href="https://maps.google.com"
                target="_blank"
                className="hover:text-blue transition"
            >
                Jl. Babakan Ciparay No.72, Sukahaji, Kec. Babakan Ciparay,
                Kota Bandung, Jawa Barat 40221
            </a>
            </li>

            <li>
            <a
                href="mailto:milkymakmursejahtera@gmail.com"
                className="hover:text-blue transition"
            >
                milkymakmursejahtera@gmail.com
            </a>
            </li>

        </ul>
        </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/80">
            © 2026 CV Milky Makmur Sejahtera. All Rights Reserved.
        </div>

        </footer>
        )
    }

export default Footer