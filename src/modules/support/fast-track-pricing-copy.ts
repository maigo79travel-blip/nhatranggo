import type { Locale } from "@/lib/locale";
import type {
  FastTrackRateCode,
  FastTrackRateGroupKey,
} from "./fast-track-rates";

type FastTrackPricingCopy = {
  heading: string;
  viewRates: string;
  groups: Record<FastTrackRateGroupKey, string>;
  links: Record<FastTrackRateGroupKey, string>;
  rates: Record<FastTrackRateCode, [title: string, description: string]>;
};

export const fastTrackPricingCopy = {
  vi: {
    heading: "Bảng giá Fast-track tại Cam Ranh (CXR)",
    viewRates: "Xem bảng giá",
    links: {
      arrival: "Quốc tế đến",
      departure: "Quốc tế đi",
      extras: "Bổ sung",
      surcharges: "Phụ thu",
    },
    groups: {
      arrival: "Chuyến bay quốc tế đến",
      departure: "Chuyến bay quốc tế đi",
      extras: "Dịch vụ bổ sung",
      surcharges: "Phụ thu",
    },
    rates: {
      "passport-control": [
        "Kiểm soát hộ chiếu",
        "Làn ưu tiên dành cho hành khách có thị thực hoặc được miễn thị thực nhập cảnh.",
      ],
      "arrival-fast-track": [
        "Fast Track",
        "Hỗ trợ làm thủ tục thị thực khi đến.",
      ],
      "vip-b-passport": [
        "VIP B · Kiểm soát",
        "Nhân viên đón khách, hỗ trợ hộ chiếu và qua khu vực kiểm tra. Áp dụng cho khách có thị thực hoặc được miễn thị thực.",
      ],
      "vip-b-fast-track": [
        "VIP B · Fast Track",
        "Đón khách, hỗ trợ hộ chiếu và thị thực khi đến, đồng hành qua khu vực kiểm tra.",
      ],
      "vip-pro-passport": [
        "VIP Pro · Kiểm soát",
        "Gói VIP B · Kiểm soát, hỗ trợ nhận hành lý và đưa khách ra cửa nhà ga.",
      ],
      "vip-pro-fast-track": [
        "VIP Pro · Fast Track",
        "Gói VIP B · Fast Track, hỗ trợ nhận hành lý và đưa khách ra cửa nhà ga.",
      ],
      "departure-assistance": [
        "Tiễn khách",
        "Kiểm soát hộ chiếu theo làn ưu tiên, soi chiếu tại hàng chờ chung.",
      ],
      "departure-vip": [
        "VIP tiễn khách",
        "Làn ưu tiên tại khu vực kiểm soát hộ chiếu và soi chiếu.",
      ],
      "luggage-assistance": [
        "Hỗ trợ hành lý",
        "Hỗ trợ nhận hành lý và đưa khách ra cửa. Áp dụng cho các gói chiều đến và đã bao gồm trong VIP Pro.",
      ],
      "night-arrival": [
        "Đến ban đêm",
        "Áp dụng cho tất cả gói chiều đến khi máy bay hạ cánh từ 23:00 đến 06:00.",
      ],
    },
  },
  en: {
    heading: "Fast-track rates at Cam Ranh (CXR)",
    viewRates: "View rates",
    links: {
      arrival: "Arrivals",
      departure: "Departures",
      extras: "Add-ons",
      surcharges: "Surcharges",
    },
    groups: {
      arrival: "International arrivals",
      departure: "International departures",
      extras: "Add-on services",
      surcharges: "Surcharges",
    },
    rates: {
      "passport-control": [
        "Passport control",
        "Priority lane for passengers with a visa or an entry visa exemption.",
      ],
      "arrival-fast-track": [
        "Fast Track",
        "Assistance with visa-on-arrival procedures.",
      ],
      "vip-b-passport": [
        "VIP B · Passport control",
        "Meet-and-greet, passport assistance and help through inspection for passengers with a visa or an entry visa exemption.",
      ],
      "vip-b-fast-track": [
        "VIP B · Fast Track",
        "Meet-and-greet, passport and visa-on-arrival assistance, and an escort through inspection.",
      ],
      "vip-pro-passport": [
        "VIP Pro · Passport control",
        "VIP B · Passport control, with baggage claim assistance and an escort to the terminal exit.",
      ],
      "vip-pro-fast-track": [
        "VIP Pro · Fast Track",
        "VIP B · Fast Track, with baggage claim assistance and an escort to the terminal exit.",
      ],
      "departure-assistance": [
        "Departure assistance",
        "Priority passport control lane and standard security screening queue.",
      ],
      "departure-vip": [
        "VIP departure",
        "Priority lanes for passport control and security screening.",
      ],
      "luggage-assistance": [
        "Baggage assistance",
        "Baggage claim assistance and an escort to the exit. Available with arrival packages and included in VIP Pro.",
      ],
      "night-arrival": [
        "Night arrival",
        "Applies to all arrival packages for flights landing from 23:00 to 06:00.",
      ],
    },
  },
  ru: {
    heading: "Тарифы Fast-track в аэропорту Камрань (CXR)",
    viewRates: "Смотреть тарифы",
    links: {
      arrival: "Прилёт",
      departure: "Вылет",
      extras: "Доп. услуги",
      surcharges: "Доплаты",
    },
    groups: {
      arrival: "Международный прилёт",
      departure: "Международный вылет",
      extras: "Дополнительные услуги",
      surcharges: "Доплаты",
    },
    rates: {
      "passport-control": [
        "Паспортный контроль",
        "Приоритетная очередь для пассажиров с визой или правом на безвизовый въезд.",
      ],
      "arrival-fast-track": [
        "Fast Track",
        "Помощь с оформлением визы по прибытии.",
      ],
      "vip-b-passport": [
        "VIP B · Паспортный контроль",
        "Встреча, помощь с паспортом и сопровождение через зону контроля для пассажиров с визой или правом на безвизовый въезд.",
      ],
      "vip-b-fast-track": [
        "VIP B · Fast Track",
        "Встреча, помощь с паспортом и визой по прибытии, сопровождение через зону контроля.",
      ],
      "vip-pro-passport": [
        "VIP Pro · Паспортный контроль",
        "Пакет VIP B · Паспортный контроль, помощь с получением багажа и сопровождение к выходу из терминала.",
      ],
      "vip-pro-fast-track": [
        "VIP Pro · Fast Track",
        "Пакет VIP B · Fast Track, помощь с получением багажа и сопровождение к выходу из терминала.",
      ],
      "departure-assistance": [
        "Сопровождение на вылете",
        "Приоритетная очередь на паспортном контроле и общая очередь на досмотре.",
      ],
      "departure-vip": [
        "VIP на вылете",
        "Приоритетные очереди на паспортном контроле и досмотре.",
      ],
      "luggage-assistance": [
        "Помощь с багажом",
        "Помощь с получением багажа и сопровождение к выходу. Доступно для пакетов на прилёте и включено в VIP Pro.",
      ],
      "night-arrival": [
        "Ночной прилёт",
        "Применяется ко всем пакетам на прилёте для рейсов, прибывающих с 23:00 до 06:00.",
      ],
    },
  },
  ko: {
    heading: "깜라인 공항 (CXR) 패스트트랙 요금",
    viewRates: "요금 보기",
    links: {
      arrival: "도착",
      departure: "출발",
      extras: "추가 서비스",
      surcharges: "추가 요금",
    },
    groups: {
      arrival: "국제선 도착",
      departure: "국제선 출발",
      extras: "추가 서비스",
      surcharges: "추가 요금",
    },
    rates: {
      "passport-control": [
        "여권 심사",
        "비자 소지자 또는 비자 면제 대상자를 위한 우선 통로입니다.",
      ],
      "arrival-fast-track": ["Fast Track", "도착 비자 수속을 지원합니다."],
      "vip-b-passport": [
        "VIP B · 여권 심사",
        "비자 소지자 또는 비자 면제 대상자를 마중하고 여권 심사와 통과를 지원합니다.",
      ],
      "vip-b-fast-track": [
        "VIP B · Fast Track",
        "마중, 여권 및 도착 비자 수속 지원, 심사 구역 동행이 포함됩니다.",
      ],
      "vip-pro-passport": [
        "VIP Pro · 여권 심사",
        "VIP B · 여권 심사에 수하물 수취 지원과 터미널 출구까지의 동행이 추가됩니다.",
      ],
      "vip-pro-fast-track": [
        "VIP Pro · Fast Track",
        "VIP B · Fast Track에 수하물 수취 지원과 터미널 출구까지의 동행이 추가됩니다.",
      ],
      "departure-assistance": [
        "출발 지원",
        "여권 심사는 우선 통로, 보안 검색은 일반 대기열을 이용합니다.",
      ],
      "departure-vip": [
        "VIP 출발 지원",
        "여권 심사와 보안 검색 모두 우선 통로를 이용합니다.",
      ],
      "luggage-assistance": [
        "수하물 지원",
        "수하물 수취를 돕고 출구까지 안내합니다. 도착 상품에 추가할 수 있으며 VIP Pro에는 포함되어 있습니다.",
      ],
      "night-arrival": [
        "야간 도착",
        "23:00부터 06:00까지 착륙하는 항공편의 모든 도착 상품에 적용됩니다.",
      ],
    },
  },
  zh: {
    heading: "金兰机场 (CXR) 快速通道价目表",
    viewRates: "查看价格",
    links: {
      arrival: "抵达",
      departure: "出发",
      extras: "附加服务",
      surcharges: "附加费用",
    },
    groups: {
      arrival: "国际航班抵达",
      departure: "国际航班出发",
      extras: "附加服务",
      surcharges: "附加费用",
    },
    rates: {
      "passport-control": [
        "护照查验",
        "为持有签证或符合免签入境条件的旅客提供优先通道。",
      ],
      "arrival-fast-track": ["Fast Track", "协助办理落地签证手续。"],
      "vip-b-passport": [
        "VIP B · 护照查验",
        "迎接旅客、协助护照查验并陪同通过检查区。适用于持签证或符合免签条件的旅客。",
      ],
      "vip-b-fast-track": [
        "VIP B · Fast Track",
        "迎接旅客，协助办理护照查验及落地签证手续，并陪同通过检查区。",
      ],
      "vip-pro-passport": [
        "VIP Pro · 护照查验",
        "包含 VIP B · 护照查验服务、行李提取协助及航站楼出口陪同。",
      ],
      "vip-pro-fast-track": [
        "VIP Pro · Fast Track",
        "包含 VIP B · Fast Track 服务、行李提取协助及航站楼出口陪同。",
      ],
      "departure-assistance": [
        "出发协助",
        "护照查验走优先通道，安检走普通队列。",
      ],
      "departure-vip": ["VIP 出发协助", "护照查验和安检均可走优先通道。"],
      "luggage-assistance": [
        "行李协助",
        "协助提取行李并陪同至出口。可加购至抵达套餐，VIP Pro 已包含。",
      ],
      "night-arrival": [
        "夜间抵达",
        "适用于航班在 23:00 至 06:00 降落时的全部抵达套餐。",
      ],
    },
  },
} satisfies Record<Locale, FastTrackPricingCopy>;
