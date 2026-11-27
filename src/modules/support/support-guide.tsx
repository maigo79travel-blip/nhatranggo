import brand from "@/config/brand.json";
import Link from "next/link";
import { PublicIcon } from "@/components/site/public-ui";

export function SupportGuide({
  lookup = false,
  visa = false,
}: {
  lookup?: boolean;
  visa?: boolean;
}) {
  const steps = lookup
    ? [
        [
          "receipt_long",
          "Tìm mã booking",
          "Mã booking được cung cấp khi bạn gửi yêu cầu đặt chỗ.",
        ],
        [
          "phone_in_talk",
          "Dùng số điện thoại đã đặt",
          "Nhập đúng số điện thoại bạn đã dùng trong yêu cầu.",
        ],
        [
          "update",
          "Theo dõi trạng thái",
          "Xem lịch trình và trạng thái xác nhận của booking.",
        ],
      ]
    : visa
      ? [
          [
            "edit_note",
            "Gửi thông tin chuyến đi",
            "Điền quốc tịch, sân bay và ngày dự kiến nhập cảnh.",
          ],
          [
            "support_agent",
            "Trao đổi về hồ sơ",
            "Nhân viên liên hệ để tư vấn giấy tờ phù hợp với chuyến đi.",
          ],
          [
            "check_circle",
            "Thống nhất bước tiếp theo",
            "Kiểm tra lại thông tin, chi phí và thời gian dự kiến với nhân viên.",
          ],
        ]
      : [
          [
            "edit_note",
            "Gửi thông tin",
            "Điền thông tin liên hệ và nội dung bạn cần hỗ trợ.",
          ],
          [
            "support_agent",
            "Nhận tư vấn",
            `Đội ngũ ${brand.name} sẽ liên hệ để kiểm tra thông tin.`,
          ],
          [
            "task_alt",
            "Xác nhận dịch vụ",
            "Lịch trình và chi phí được thống nhất trước khi xác nhận.",
          ],
        ];
  return (
    <aside className="public-support-card">
      <div className="public-support-heading">
        <PublicIcon
          name={
            lookup
              ? "travel_explore"
              : visa
                ? "contact_support"
                : "support_agent"
          }
        />
      </div>
      {!visa && (
        <p className="text-primary text-xs font-bold uppercase tracking-widest">
          {brand.name} đồng hành
        </p>
      )}
      <h2 className="text-2xl font-bold">
        {lookup
          ? "Thông tin chuyến đi trong tầm tay"
          : visa
            ? "Quy trình tư vấn E-Visa"
            : "An tâm cho hành trình của bạn"}
      </h2>
      <ol className="space-y-6">
        {steps.map(([icon, title, description]) => (
          <li key={icon} className="flex gap-3">
            <PublicIcon name={icon} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="border-t border-secondary/15 pt-5 text-sm text-on-surface-variant">
        Cần hỗ trợ thêm?{" "}
        <Link
          href="/lien-he"
          className="font-bold text-primary underline underline-offset-4"
        >
          Liên hệ với chúng tôi
        </Link>
      </div>
    </aside>
  );
}
