export function SeoContent() {
  return (
    <section
      className="py-16 bg-white"
      style={{ padding: "var(--spacing-xxl) 0" }}
    >
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2
          className="font-display text-[var(--text-primary)] text-center mb-8"
          style={{ fontSize: "28px", fontWeight: 600 }}
        >
          Đa dạng mẫu hoa – cho mọi dịp đặc biệt
        </h2>

        <div className="space-y-6 font-body text-[var(--text-secondary)]" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          <p>
            <strong className="text-[var(--text-primary)]">Hoa Tươi Đà Nẵng</strong> tự hào mang đến bộ sưu tập hoa tươi
            đa dạng và phong phú nhất miền Trung. Từ những bó hoa hồng pastel ngọt ngào cho ngày sinh nhật,
            đến những lẵng hoa hoành tráng cho dịp khai trương – chúng tôi đều có thể đáp ứng mọi nhu cầu
            của quý khách hàng.
          </p>

          <p>
            Mỗi sản phẩm hoa tại shop đều được các nghệ nhân cắm hoa lành nghề chăm chút tỉ mỉ,
            sử dụng nguồn hoa tươi nhập khẩu và nội địa chất lượng cao. Chúng tôi cam kết mang đến
            những bó hoa <strong className="text-[var(--text-primary)]">tươi lâu nhất</strong>,
            <strong className="text-[var(--text-primary)]"> đẹp nhất</strong> với giá cả hợp lý.
          </p>

          <p>
            Với dịch vụ <strong className="text-[var(--primary)]">giao hoa miễn phí</strong> trong nội thành
            Đà Nẵng và hỗ trợ giao hoa toàn quốc, Hoa Tươi Đà Nẵng luôn sẵn sàng đồng hành cùng bạn
            trong mọi khoảnh khắc đặc biệt. Đặt hoa ngay hôm nay để nhận ưu đãi hấp dẫn!
          </p>
        </div>

        {/* Trust badges */}
        <div
          className="mt-10 pt-8 border-t border-[var(--border-soft)] grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "1000+", label: "Mẫu hoa đa dạng" },
            { number: "5000+", label: "Khách hàng tin tưởng" },
            { number: "4.9★", label: "Đánh giá trung bình" },
            { number: "2h", label: "Giao hoa nhanh nhất" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p
                className="font-display text-[var(--primary)]"
                style={{ fontSize: "28px", fontWeight: 600 }}
              >
                {stat.number}
              </p>
              <p
                className="font-body text-[var(--text-secondary)]"
                style={{ fontSize: "13px" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
