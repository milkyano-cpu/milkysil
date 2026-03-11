import { CheckCircle } from "lucide-react"

const features = [
    "20+ Tahun Pengalaman",
    "Pasokan Partai & Eceran",
    "Distribusi Seluruh Indonesia",
    "Produk Terjamin Kualitasnya",
]

const Features = () => {
    return (
        <div className="relative -mt-25 md:-mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-12 z-10 w-full max-w-full md:max-w-[1100px]">

        <div className="mx-auto px-[36px] md:px-6">

            <div
                className="bg-white rounded-[22px] md:rounded-2xl border border-[#113163]/7 md:border-0 py-[37px] px-[43px] md:py-6 md:px-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-5 md:gap-0"
                style={{
                    boxShadow: "0 3.7px 3.86px rgba(0,0,0,0.0072), 0 8.4px 8.77px rgba(0,0,0,0.0105), 0 14px 16px rgba(0,0,0,0.013), 0 22px 28px rgba(0,0,0,0.016), 0 34px 46px rgba(0,0,0,0.02), 0 52px 80px rgba(0,0,0,0.025), 0 80px 140px rgba(0,0,0,0.03), 0 120px 220px rgba(0,0,0,0.04)"
                }}
            >

            {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm font-medium text-[#113163]">

                <CheckCircle size={16} className="text-[#1674D3] shrink-0" />

                {item}

                </div>
            ))}

            </div>

        </div>

        </div>
    )
}

export default Features