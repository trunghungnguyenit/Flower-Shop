import { NextRequest, NextResponse } from 'next/server';

// Interface for simple order (from quick-order-section)
interface SimpleOrderData {
  name: string;
  phone: string;
  flowerType: string;
  note?: string;
}

// Interface for detailed order (from product-order-form)
interface DetailedOrderData {
  // Thông tin khách hàng
  name: string;
  phone: string;
  note?: string;
  
  // Thông tin sản phẩm
  productName: string;
  productPrice: number;
  quantity: number;
  
  // Thông tin giao hàng
  senderAddress?: string;
  receiverAddress: string;
  deliveryTime?: string;
  
  // Dịch vụ thêm
  additionalServices: string[];
  
  // Tổng tiền
  totalAmount: number;
}

type OrderData = SimpleOrderData | DetailedOrderData;

// Type guard to check if it's a detailed order
function isDetailedOrder(data: OrderData): data is DetailedOrderData {
  return 'productName' in data && 'productPrice' in data;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: OrderData = await request.json();
    
    // Validate required fields for both types
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Additional validation for detailed orders
    if (isDetailedOrder(body) && (!body.productName || !body.receiverAddress)) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin sản phẩm hoặc địa chỉ nhận' },
        { status: 400 }
      );
    }

    // Additional validation for simple orders
    if (!isDetailedOrder(body) && !body.flowerType) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin loại hoa' },
        { status: 400 }
      );
    }

    // Get Discord webhook URL from environment
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, message: 'Cấu hình webhook không tồn tại' },
        { status: 500 }
      );
    }

    let discordMessage: string;

    if (isDetailedOrder(body)) {
      // Format detailed order message
      const servicesText = body.additionalServices.length > 0 
        ? body.additionalServices.join(', ') 
        : 'Không có dịch vụ thêm';

      discordMessage = `🌸 **ĐƠN ĐẶT HOA MỚI** 🌸

👤 **Tên khách:** ${body.name}
📱 **SĐT:** ${body.phone}
🌺 **Sản phẩm:** ${body.productName}
💰 **Đơn giá:** ${body.productPrice.toLocaleString('vi-VN')}đ
🔢 **Số lượng:** ${body.quantity}
💵 **Tổng tiền:** ${body.totalAmount.toLocaleString('vi-VN')}đ

📍 **Địa chỉ gửi:** ${body.senderAddress || 'Cửa hàng'}
📍 **Địa chỉ nhận:** ${body.receiverAddress}
⏰ **Thời gian giao:** ${body.deliveryTime || 'Theo lịch cửa hàng'}

🎁 **Dịch vụ thêm:** ${servicesText}
📝 **Ghi chú:** ${body.note || 'Không có ghi chú'}

⏰ **Thời gian đặt:** ${new Date().toLocaleString('vi-VN')}`;
    } else {
      // Format simple order message
      discordMessage = `🌸 **ĐƠN ĐẶT HOA MỚI** 🌸

👤 **Tên khách:** ${body.name}
📱 **SĐT:** ${body.phone}
🌺 **Loại hoa:** ${body.flowerType}
📝 **Ghi chú:** ${body.note || 'Không có ghi chú'}

⏰ **Thời gian đặt:** ${new Date().toLocaleString('vi-VN')}`;
    }

    // Send to Discord webhook
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: discordMessage,
      }),
    });

    if (!discordResponse.ok) {
      throw new Error('Không thể gửi thông báo Discord');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra khi xử lý đơn hàng' },
      { status: 500 }
    );
  }
}