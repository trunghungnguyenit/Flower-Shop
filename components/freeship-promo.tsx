import { Truck, Gift, Clock, MapPin } from "lucide-react"

const promos = [
  {
    icon: Truck,
    title: "Freeship",
    description: "Miễn phí giao hàng trong bán kính 5km tại Đà Nẵng",
  },
  {
    icon: Clock,
    title: "Giao Nhanh",
    description: "Giao trong vòng 2 giờ với đơn hàng khu vực nội thành",
  },
  {
    icon: Gift,
    title: "Combo Ưu Đãi",
    description: "Giảm 10% khi mua combo Tết hoặc combo văn phòng",
  },
  {
    icon: MapPin,
    title: "Phủ Sóng Rộng",
    description: "Giao hàng toàn Đà Nẵng & Quảng Nam",
  },
]

export function FreeshipPromo() {
  return (
    <section className="py-16 bg-primary/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {promos.map((promo, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <promo.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{promo.title}</h3>
              <p className="text-sm text-muted-foreground">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
