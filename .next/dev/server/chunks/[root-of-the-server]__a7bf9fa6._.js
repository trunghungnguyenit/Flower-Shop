module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/order/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@opentelemetry+_ab12fbf9041281d71cca4574e50b85ac/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/yup@1.7.1/node_modules/yup/index.esm.js [app-route] (ecmascript)");
;
;
// Validation schema
const validationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    // 2.1. Thông tin người đặt
    senderName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Tên người gửi là bắt buộc').min(2, 'Tên phải có ít nhất 2 ký tự').max(50, 'Tên không được quá 50 ký tự'),
    senderPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Số điện thoại người gửi là bắt buộc').matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số').length(10, 'Số điện thoại phải có đúng 10 số'),
    // 2.2. Thông tin đơn hoa
    product: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Sản phẩm là bắt buộc'),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"]().required('Số lượng là bắt buộc').min(1, 'Số lượng phải lớn hơn 0').integer('Số lượng phải là số nguyên'),
    productPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"]().required('Đơn giá là bắt buộc').min(0, 'Đơn giá không được âm'),
    extraServices: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]()).optional(),
    deliveryDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Ngày giao hàng là bắt buộc'),
    deliveryTimeSlot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    deliveryArea: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Khu vực giao hàng là bắt buộc').oneOf([
        'da-nang',
        'quang-nam'
    ], 'Chỉ nhận giao hàng khu vực Đà Nẵng & Quảng Nam'),
    totalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"]().required('Tổng tiền là bắt buộc').min(0, 'Tổng tiền không được âm'),
    // 2.3. Thông tin người nhận
    receiverName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Tên người nhận là bắt buộc').min(2, 'Tên phải có ít nhất 2 ký tự').max(50, 'Tên không được quá 50 ký tự'),
    receiverPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Số điện thoại người nhận là bắt buộc').matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số').length(10, 'Số điện thoại phải có đúng 10 số'),
    receiverAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Địa chỉ cụ thể là bắt buộc').min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
    cardMessage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    // 2.4. Ghi chú
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    // 2.5. Thanh toán
    paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().required('Phương thức thanh toán là bắt buộc').oneOf([
        'qr-code',
        'cash-on-delivery'
    ], 'Phương thức thanh toán không hợp lệ')
});
async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();
        // Validate with Yup
        await validationSchema.validate(body, {
            abortEarly: false
        });
        // Get Discord webhook URL from environment
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Cấu hình webhook không tồn tại'
            }, {
                status: 500
            });
        }
        // Format order message
        const servicesText = body.extraServices && body.extraServices.length > 0 ? body.extraServices.join(', ') : 'Không có dịch vụ thêm';
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

⏰ **Thời gian đặt:** ${new Date().toLocaleString('vi-VN')}`;
        // Send to Discord webhook
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: discordMessage
            })
        });
        if (!discordResponse.ok) {
            throw new Error('Không thể gửi thông báo Discord');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('Order API Error:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]) {
            // Return validation errors
            const validationErrors = error.inner.map((err)=>({
                    field: err.path,
                    message: err.message
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: validationErrors
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Có lỗi xảy ra khi xử lý đơn hàng'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a7bf9fa6._.js.map