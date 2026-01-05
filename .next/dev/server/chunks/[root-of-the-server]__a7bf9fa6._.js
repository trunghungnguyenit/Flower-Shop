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
;
// Type guard to check if it's a detailed order
function isDetailedOrder(data) {
    return 'productName' in data && 'productPrice' in data;
}
async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();
        // Validate required fields for both types
        if (!body.name || !body.phone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Thiếu thông tin bắt buộc'
            }, {
                status: 400
            });
        }
        // Additional validation for detailed orders
        if (isDetailedOrder(body) && (!body.productName || !body.receiverAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Thiếu thông tin sản phẩm hoặc địa chỉ nhận'
            }, {
                status: 400
            });
        }
        // Additional validation for simple orders
        if (!isDetailedOrder(body) && !body.flowerType) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$opentelemetry$2b$_ab12fbf9041281d71cca4574e50b85ac$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Thiếu thông tin loại hoa'
            }, {
                status: 400
            });
        }
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
        let discordMessage;
        if (isDetailedOrder(body)) {
            // Format detailed order message
            const servicesText = body.additionalServices.length > 0 ? body.additionalServices.join(', ') : 'Không có dịch vụ thêm';
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