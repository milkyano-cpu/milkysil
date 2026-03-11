import { CheckCircle } from "lucide-react"

const features = [
    "20+ Tahun Pengalaman",
    "Pasokan Partai & Eceran",
    "Distribusi Seluruh Indonesia",
    "Produk Terjamin Kualitasnya",
]

const Features = () => {
    return (
        <div className="bg-[#F7F9FC] relative -mt-12 z-10">

        <div className="max-w-[1100px] mx-auto px-6">

            <div className="bg-white rounded-2xl shadow-lg py-6 px-8 flex justify-between items-center">

            {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm font-medium text-[#1E3E6D]">

                <CheckCircle size={18} className="text-blue-600" />

                {item}

                </div>
            ))}

            </div>

        </div>

        </div>
    )
}

export default Features