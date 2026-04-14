declare global {
  interface Window {
    dataLayer?: any[]
  }
}

if (typeof window !== "undefined" && !window.dataLayer) {
  window.dataLayer = []
}

export const dataLayer = {
  push: (data: Record<string, any>) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(data)
    }
  },

  viewProduct: (data: {
    product_id: string | number
    product_name: string
    product_category: string
    product_slug: string
    stock_status: string
  }) => {
    dataLayer.push({ event: "view_product", ...data })
  },

  contactFormSubmit: (data: {
    has_message: boolean
  }) => {
    dataLayer.push({ event: "contact_form_submit", form_name: "contact_form", ...data })
  },

  whatsappCtaClick: (data: {
    product_name: string
    placement: "inline" | "sticky"
  }) => {
    dataLayer.push({ event: "whatsapp_cta_click", ...data })
  },
}
