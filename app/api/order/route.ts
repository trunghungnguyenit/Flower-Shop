import { NextRequest, NextResponse } from 'next/server';
import * as yup from 'yup';
import { OrderFormData } from '@/api/api.type';

// Validation schema
const validationSchema = yup.object({
  // 2.1. Thông tin người đặt
  senderName: yup
    .string()
    .required('Tên người gửi là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự'),
  senderPhone: yup
    .string()
    .required('Số điện thoại người gửi là bắt buộc')
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .length(10, 'Số điện thoại phải có đúng 10 số'),
  
  // 2.2. Thông tin đơn hoa
  product: yup.string().required('Sản phẩm là bắt buộc'),
  quantity: yup.number().required('Số lượng là bắt buộc').min(1, 'Số lượng phải lớn hơn 0').integer('Số lượng phải là số nguyên'),
  productPrice: yup.number().required('Đơn giá là bắt buộc').min(0, 'Đơn giá không được âm'),
  extraServices: yup.array().of(yup.string()).optional(),
  deliveryDate: yup.string().required('Ngày giao hàng là bắt buộc'),
  deliveryTimeSlot: yup.string().optional(),
  deliveryArea: yup.string().required('Khu vực giao hàng là bắt buộc').oneOf(['da-nang', 'quang-nam'], 'Chỉ nhận giao hàng khu vực Đà Nẵng & Quảng Nam'),
  totalAmount: yup.number().required('Tổng tiền là bắt buộc').min(0, 'Tổng tiền không được âm'),
  
  // 2.3. Thông tin người nhận
  receiverName: yup
    .string()
    .required('Tên người nhận là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự'),
  receiverPhone: yup
    .string()
    .required('Số điện thoại người nhận là bắt buộc')
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .length(10, 'Số điện thoại phải có đúng 10 số'),
  receiverAddress: yup.string().required('Địa chỉ cụ thể là bắt buộc').min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  cardMessage: yup.string().optional(),
  
  // 2.4. Ghi chú
  note: yup.string().optional(),
  
  // 2.5. Thanh toán
  paymentMethod: yup.string().required('Phương thức thanh toán là bắt buộc').oneOf(['qr-code', 'cash-on-delivery'], 'Phương thức thanh toán không hợp lệ'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: OrderFormData = await request.json();
    
    // Validate with Yup
    await validationSchema.validate(body, { abortEarly: false });

    // Get Discord webhook URL from environment
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, message: 'Cấu hình webhook không tồn tại' },
        { status: 500 }
      );
    }

    // Format order message
    const servicesText = body.extraServices && body.extraServices.length > 0 
      ? body.extraServices.join(', ') 
      : 'Không có dịch vụ thêm';

    const deliveryAreaText = body.deliveryArea === 'da-nang' ? 'Đà Nẵng' : 'Quảng Nam';
    const paymentMethodText = body.paymentMethod === 'qr-code' ? 'Quét mã QR' : 'Trả tiền mặt khi nhận hàng';
    
    // Format delivery time - xử lý cả deliveryTimeSlot và deliveryDate
    let deliveryTime = 'Chưa xác định';
    if (body.deliveryDate) {
      const formattedDate = body.deliveryDate.split('-').reverse().join('/');
      if (body.deliveryTimeSlot) {
        deliveryTime = `${body.deliveryTimeSlot} ${formattedDate}`;
      } else {
        deliveryTime = formattedDate;
      }
    }

    const discordMessage = `🌸 **ĐƠN ĐẶT HOA MỚI** 🌸

**👤 THÔNG TIN NGƯỜI ĐẶT:**
• Tên: ${body.senderName}
• SĐT: ${body.senderPhone}

**🌺 THÔNG TIN ĐƠN HOA:**
• Sản phẩm: ${body.product}
• Số lượng: ${body.quantity}
• Đơn giá: ${body.productPrice?.toLocaleString('vi-VN')}đ
• Dịch vụ thêm: ${servicesText}
• Thời gian giao: ${deliveryTime}
• Khu vực: ${deliveryAreaText}
• **Tổng tiền: ${body.totalAmount?.toLocaleString('vi-VN')}đ**

**📍 THÔNG TIN NGƯỜI NHẬN:**
• Tên: ${body.receiverName}
• SĐT: ${body.receiverPhone}
• Địa chỉ: ${body.receiverAddress}
• Lời nhắn thiệp: ${body.cardMessage || 'Không có'}

**💳 THANH TOÁN:** ${paymentMethodText}

**📝 GHI CHÚ:** ${body.note || 'Không có ghi chú'}

⏰ **Thời gian đặt:** ${new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})}`;

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
    
    if (error instanceof yup.ValidationError) {
      // Return validation errors
      const validationErrors = error.inner.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dữ liệu không hợp lệ',
          errors: validationErrors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra khi xử lý đơn hàng' },
      { status: 500 }
    );
  }

}
