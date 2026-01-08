import * as yup from 'yup';

// Dịch vụ thêm
export const extraServices = [
  { id: "gift-wrap", name: "Gói quà cao cấp", price: 50000 },
  { id: "card", name: "Thiệp chúc mừng", price: 20000 },
  { id: "delivery-express", name: "Giao hàng nhanh 2h", price: 100000 },
  { id: "setup", name: "Trang trí tại chỗ", price: 200000 },
];

// Khu vực giao hàng
export const deliveryAreas = [
  { id: "da-nang", name: "Đà Nẵng" },
  { id: "quang-nam", name: "Quảng Nam" },
];

// Phương thức thanh toán
export const paymentMethods = [
  { id: "qr-code", name: "Quét mã QR" },
  { id: "cash-on-delivery", name: "Trả tiền mặt khi nhận hàng" },
];

// Validation schema cho form đặt hàng
export const orderFormValidationSchema = yup.object({
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
  productId: yup.string().when('$isQuickOrder', {
    is: true,
    then: (schema) => schema.required('Vui lòng chọn sản phẩm'),
    otherwise: (schema) => schema.optional()
  }),
  quantity: yup
    .number()
    .required('Số lượng là bắt buộc')
    .min(1, 'Số lượng không được là số âm')
    .integer('Số lượng phải là số nguyên'),
  extraServices: yup.array().of(yup.string()).optional(),
  deliveryDateTime: yup.string().required('Thời gian giao hàng là bắt buộc'),
  deliveryArea: yup.string().required('Khu vực giao hàng là bắt buộc'),
  
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
  receiverAddress: yup
    .string()
    .required('Địa chỉ cụ thể là bắt buộc')
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  cardMessage: yup.string().optional(),
  
  // 2.4. Ghi chú
  note: yup.string().optional(),
  
  // 2.5. Thanh toán
  paymentMethod: yup.string().required('Phương thức thanh toán là bắt buộc'),
});