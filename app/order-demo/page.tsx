import ProductOrderForm from '@/components/product-order-form';

// Mock product data for demo
const mockProduct = {
  id: "demo-1",
  name: "Hồng Pastel Ngọt Ngào",
  slug: "hong-pastel-ngot-ngao",
  price: 450000,
  images: ["/placeholder.svg?height=600&width=600"],
  description: "Bó hoa hồng pastel nhẹ nhàng, thích hợp làm quà tặng sinh nhật hoặc bày tỏ tình cảm.",
  categoryIds: ["bo-hoa"],
  occasionIds: ["sinh-nhat", "tinh-yeu"],
  rating: 4.9,
  sold: 127,
  badge: "Hot",
  isActive: true
};

export default function OrderDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Demo Form Đặt Hoa Chi Tiết
          </h1>
          <p className="text-gray-600">
            Test chức năng đặt hoa trực tiếp từ sản phẩm với thông tin đầy đủ
          </p>
        </div>
        
        <ProductOrderForm product={mockProduct} />
        
        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thông tin gửi Discord:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>👤 Tên khách hàng</li>
            <li>📱 Số điện thoại</li>
            <li>🌺 Tên sản phẩm: {mockProduct.name}</li>
            <li>💰 Đơn giá: {mockProduct.price.toLocaleString('vi-VN')}đ</li>
            <li>🔢 Số lượng</li>
            <li>💵 Tổng tiền (bao gồm dịch vụ thêm)</li>
            <li>📍 Địa chỉ gửi & nhận</li>
            <li>⏰ Thời gian giao hàng</li>
            <li>🎁 Dịch vụ thêm (nếu có)</li>
            <li>📝 Ghi chú</li>
          </ul>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Hướng dẫn:</h3>
            <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
              <li>Cập nhật DISCORD_WEBHOOK_URL trong .env</li>
              <li>Điền form đặt hoa ở trên</li>
              <li>Chọn số lượng và dịch vụ thêm</li>
              <li>Nhấn "Đặt Hoa Ngay"</li>
              <li>Kiểm tra Discord channel</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}