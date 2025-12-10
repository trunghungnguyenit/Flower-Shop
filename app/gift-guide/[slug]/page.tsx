import { Metadata } from "next";
import { notFound } from "next/navigation";
import GiftGuideClient from "@/components/gift-guide/gift-guide-client";

// ================================================
// GIFT GUIDE DATA
// ================================================
const GIFT_GUIDES = {
  "cho-nguoi-yeu": {
    slug: "cho-nguoi-yeu",
    title: "Gợi ý hoa tặng người yêu",
    subtitle: "Những sắc hoa đại diện cho tình yêu sâu đậm và chân thành.",
    image: "/images/gift-guide/cho-nguoi-yeu.jpg",
    whenToGive: [
      { icon: "Heart", text: "Kỷ niệm tình yêu" },
      { icon: "Cake", text: "Sinh nhật người yêu" },
      { icon: "Sparkles", text: "Lễ Valentine, 20/10, 8/3" },
      { icon: "Gift", text: "Xin lỗi hoặc bày tỏ yêu thương" },
      { icon: "Star", text: "Chúc mừng thành công, khích lệ" },
    ],
    flowerTypes: {
      title: "Loại hoa & tông màu phù hợp",
      description: "Lựa chọn hoa phù hợp để bày tỏ tình cảm chân thành",
      items: [
        { name: "Hoa hồng đỏ", meaning: "Tình yêu nồng cháy, đam mê" },
        { name: "Hồng pastel", meaning: "Nhẹ nhàng, tinh tế, lãng mạn" },
        { name: "Baby's breath", meaning: "Dễ thương, trong trẻo" },
        { name: "Hoa tulip", meaning: "Tình yêu hoàn hảo" },
      ],
      colors: ["Đỏ rực rỡ", "Hồng pastel", "Trắng - hồng mix", "Cam đào"],
      image: "/images/gift-guide/flowers-love.jpg",
    },
    combos: [
      {
        id: 1,
        name: "Lãng mạn cổ điển",
        description: "Bó hoa hồng đỏ Ecuador cao cấp kết hợp baby's breath trắng",
        includes: ["24 hoa hồng đỏ Ecuador", "Baby's breath cao cấp", "Giấy gói sang trọng"],
        price: 890000,
        image: "/images/combos/romantic-classic.jpg",
      },
      {
        id: 2,
        name: "Ngọt ngào dễ thương",
        description: "Mix hồng pastel với tone hồng phấn, trắng kem nhẹ nhàng",
        includes: ["Hồng pastel, cẩm chướng", "Hoa lily nhí", "Giấy kraft vintage"],
        price: 650000,
        image: "/images/combos/sweet-pastel.jpg",
      },
      {
        id: 3,
        name: "Tối giản tinh tế",
        description: "Thiết kế hiện đại với hoa tulip và tone trắng xanh lá nhạt",
        includes: ["Tulip trắng/hồng nhạt", "Lá bạc xanh", "Giấy gói minimalist"],
        price: 720000,
        image: "/images/combos/minimal-elegant.jpg",
      },
    ],
    collectionLink: "/bo-suu-tap?scenario=tinh-yeu",
  },
  "cho-me": {
    slug: "cho-me",
    title: "Gợi ý hoa tặng mẹ",
    subtitle: "Hoa ly – cẩm chướng: gửi lời tri ân đến đấng sinh thành.",
    image: "/images/gift-guide/cho-me.jpg",
    whenToGive: [
      { icon: "Heart", text: "Ngày của mẹ (8/3, 20/10)" },
      { icon: "Cake", text: "Sinh nhật mẹ" },
      { icon: "Sparkles", text: "Tri ân công lao nuôi dưỡng" },
      { icon: "Gift", text: "Chúc mừng ngày lễ, Tết" },
    ],
    flowerTypes: {
      title: "Loại hoa & tông màu phù hợp",
      description: "Chọn hoa thể hiện lòng hiếu kính và yêu thương",
      items: [
        { name: "Hoa ly", meaning: "Thánh thiện, cao quý" },
        { name: "Cẩm chướng", meaning: "Tình mẫu tử, lòng biết ơn" },
        { name: "Hồng pastel", meaning: "Dịu dàng, ấm áp" },
        { name: "Hoa cúc", meaning: "Trường thọ, sức khỏe" },
      ],
      colors: ["Hồng pastel", "Trắng tinh khôi", "Vàng cam nhẹ nhàng"],
      image: "/images/gift-guide/flowers-mom.jpg",
    },
    combos: [
      {
        id: 1,
        name: "Tri ân thánh thiện",
        description: "Hoa ly trắng cao cấp mix cẩm chướng hồng pastel",
        includes: ["Lily trắng cao cấp", "Cẩm chướng hồng", "Lá bạc xanh"],
        price: 780000,
        image: "/images/combos/mom-gratitude.jpg",
      },
      {
        id: 2,
        name: "Ấm áp yêu thương",
        description: "Bó hoa mix pastel nhẹ nhàng với tone hồng - cam đào",
        includes: ["Hồng pastel, baby", "Cúc calimero", "Giấy gói vintage"],
        price: 590000,
        image: "/images/combos/mom-warm.jpg",
      },
      {
        id: 3,
        name: "Sức khỏe - trường thọ",
        description: "Giỏ hoa cúc vàng, hồng mix với hoa lily",
        includes: ["Cúc đồng tiền", "Lily vàng nhạt", "Giỏ mây tự nhiên"],
        price: 820000,
        image: "/images/combos/mom-health.jpg",
      },
    ],
    collectionLink: "/bo-suu-tap?scenario=tang-me",
  },
  "cho-ban-than": {
    slug: "cho-ban-than",
    title: "Gợi ý hoa tặng bạn thân",
    subtitle: "Tươi trẻ, năng động – gửi tặng tình bạn chân thành.",
    image: "/images/gift-guide/cho-ban-than.jpg",
    whenToGive: [
      { icon: "Cake", text: "Sinh nhật bạn thân" },
      { icon: "Sparkles", text: "Chúc mừng thành công, tốt nghiệp" },
      { icon: "Heart", text: "Động viên, khích lệ" },
      { icon: "Gift", text: "Dịp lễ, gặp gỡ sau lâu ngày" },
    ],
    flowerTypes: {
      title: "Loại hoa & tông màu phù hợp",
      description: "Hoa tươi vui, năng động thể hiện tình bạn đẹp",
      items: [
        { name: "Hướng dương", meaning: "Năng lượng tích cực" },
        { name: "Cúc họa mi", meaning: "Trong trẻo, chân thành" },
        { name: "Tulip mix", meaning: "Vui tươi, trẻ trung" },
        { name: "Baby mix pastel", meaning: "Dễ thương, gần gũi" },
      ],
      colors: ["Vàng tươi", "Pastel mix", "Trắng - tím nhạt"],
      image: "/images/gift-guide/flowers-friend.jpg",
    },
    combos: [
      {
        id: 1,
        name: "Năng lượng tích cực",
        description: "Hướng dương tươi vui mix với cúc vàng",
        includes: ["Hướng dương lớn", "Cúc calimero vàng", "Giấy gói kraft"],
        price: 520000,
        image: "/images/combos/friend-energy.jpg",
      },
      {
        id: 2,
        name: "Ngọt ngào đáng yêu",
        description: "Baby's breath mix pastel nhiều màu sắc",
        includes: ["Baby pastel mix", "Cúc họa mi", "Giấy gói hồng phấn"],
        price: 450000,
        image: "/images/combos/friend-sweet.jpg",
      },
      {
        id: 3,
        name: "Tươi trẻ hiện đại",
        description: "Tulip mix tone pastel tươi mới",
        includes: ["Tulip 3-4 màu", "Lá bạc", "Giấy gói minimalist"],
        price: 680000,
        image: "/images/combos/friend-modern.jpg",
      },
    ],
    collectionLink: "/bo-suu-tap?scenario=ban-be",
  },
  "cho-sep": {
    slug: "cho-sep",
    title: "Gợi ý hoa tặng sếp",
    subtitle: "Trang trọng, sang trọng – thể hiện sự tôn trọng và tri ân.",
    image: "/images/gift-guide/cho-sep.jpg",
    whenToGive: [
      { icon: "Sparkles", text: "Ngày lễ, Tết" },
      { icon: "Gift", text: "Sinh nhật sếp" },
      { icon: "Star", text: "Chúc mừng thăng chức, thành công" },
      { icon: "Heart", text: "Tri ân sự hỗ trợ, giúp đỡ" },
    ],
    flowerTypes: {
      title: "Loại hoa & tông màu phù hợp",
      description: "Hoa sang trọng, trang trọng thể hiện sự kính trọng",
      items: [
        { name: "Hoa lan", meaning: "Quý phái, cao sang" },
        { name: "Lily cao cấp", meaning: "Trang trọng, lịch lãm" },
        { name: "Hồng Ecuador", meaning: "Sang trọng, đẳng cấp" },
        { name: "Cẩm tú cầu", meaning: "Thành công, phú quý" },
      ],
      colors: ["Trắng tinh tế", "Vàng gold", "Tím royal", "Xanh lá nhạt"],
      image: "/images/gift-guide/flowers-boss.jpg",
    },
    combos: [
      {
        id: 1,
        name: "Đẳng cấp sang trọng",
        description: "Hoa lan hồ điệp trắng cao cấp trong chậu ceramic",
        includes: ["Lan hồ điệp 8-10 cành", "Chậu ceramic cao cấp", "Rêu trang trí"],
        price: 1500000,
        image: "/images/combos/boss-luxury.jpg",
      },
      {
        id: 2,
        name: "Trang trọng quý phái",
        description: "Giỏ hoa lily trắng mix hồng Ecuador",
        includes: ["Lily trắng cao cấp", "Hồng Ecuador", "Giỏ gỗ sang trọng"],
        price: 980000,
        image: "/images/combos/boss-elegant.jpg",
      },
      {
        id: 3,
        name: "Thành công rực rỡ",
        description: "Cẩm tú cầu tím royal mix với lá monstera",
        includes: ["Cẩm tú cầu tím", "Lá monstera", "Giấy gói vàng gold"],
        price: 850000,
        image: "/images/combos/boss-success.jpg",
      },
    ],
    collectionLink: "/bo-suu-tap?scenario=cong-viec",
  },
  "cho-vo-chong": {
    slug: "cho-vo-chong",
    title: "Gợi ý hoa tặng vợ/chồng",
    subtitle: "Gắn kết – trân trọng – ấm áp gia đình hạnh phúc.",
    image: "/images/gift-guide/cho-vo-chong.jpg",
    whenToGive: [
      { icon: "Heart", text: "Kỷ niệm ngày cưới" },
      { icon: "Cake", text: "Sinh nhật vợ/chồng" },
      { icon: "Sparkles", text: "Ngày lễ Valentine, 20/10, 8/3" },
      { icon: "Gift", text: "Xin lỗi, làm hòa" },
      { icon: "Star", text: "Bất ngờ không lý do" },
    ],
    flowerTypes: {
      title: "Loại hoa & tông màu phù hợp",
      description: "Hoa thể hiện sự gắn bó và yêu thương lâu dài",
      items: [
        { name: "Hồng pastel", meaning: "Tình yêu bền vững" },
        { name: "Lily mix hồng", meaning: "Hạnh phúc viên mãn" },
        { name: "Hoa tulip", meaning: "Tình yêu hoàn hảo" },
        { name: "Cẩm chướng", meaning: "Gắn kết, trường tồn" },
      ],
      colors: ["Hồng pastel", "Trắng - hồng", "Cam đào", "Tím lavender"],
      image: "/images/gift-guide/flowers-spouse.jpg",
    },
    combos: [
      {
        id: 1,
        name: "Hạnh phúc viên mãn",
        description: "Lily hồng pastel mix với hồng Ecuador",
        includes: ["Lily hồng cao cấp", "Hồng Ecuador pastel", "Baby's breath"],
        price: 920000,
        image: "/images/combos/spouse-happiness.jpg",
      },
      {
        id: 2,
        name: "Yêu thương bền vững",
        description: "Hồng pastel mix tone nhẹ nhàng ấm áp",
        includes: ["Hồng pastel mix", "Cẩm chướng hồng", "Giấy gói vintage"],
        price: 750000,
        image: "/images/combos/spouse-lasting.jpg",
      },
      {
        id: 3,
        name: "Bất ngờ ngọt ngào",
        description: "Tulip mix nhiều màu pastel trong giấy gói hiện đại",
        includes: ["Tulip 3-4 màu pastel", "Lá bạc xanh", "Giấy gói sang trọng"],
        price: 820000,
        image: "/images/combos/spouse-surprise.jpg",
      },
    ],
    collectionLink: "/bo-suu-tap?scenario=gia-dinh",
  },
};

type GiftGuideSlug = keyof typeof GIFT_GUIDES;

// ================================================
// METADATA
// ================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = GIFT_GUIDES[params.slug as GiftGuideSlug];

  if (!guide) {
    return {
      title: "Gift Guide Not Found",
    };
  }

  return {
    title: `${guide.title} | Hoa Tươi Đà Nẵng`,
    description: guide.subtitle,
  };
}

// ================================================
// GENERATE STATIC PARAMS
// ================================================
export async function generateStaticParams() {
  return Object.keys(GIFT_GUIDES).map((slug) => ({
    slug,
  }));
}

// ================================================
// PAGE COMPONENT
// ================================================
export default function GiftGuidePage({ params }: { params: { slug: string } }) {
  const guide = GIFT_GUIDES[params.slug as GiftGuideSlug];

  if (!guide) {
    notFound();
  }

  return <GiftGuideClient guide={guide} />;
}
