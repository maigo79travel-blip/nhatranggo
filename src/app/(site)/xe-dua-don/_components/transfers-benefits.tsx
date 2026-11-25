import { ContentLink, ContentText } from "@/components/content";
import brand from "@/config/brand.json";
import { quoteAnchor } from "./transfer-options";
import {
  TransferCallout,
  TransferHeading,
  TransferIcon,
  TransferZaloLink,
} from "./transfers-ui";

const benefits = [
  { id: "149", body: "150", icon: "flight_takeoff" },
  { id: "151", body: "152", icon: "cancel" },
  { id: "153", body: "154", icon: "sentiment_satisfied" },
  { id: "155", body: "156", icon: "call" },
] as const;

export function TransfersBenefits() {
  return (
    <section className="transfer-section bg-surface">
      <div className="site-container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <TransferHeading
              eyebrow="transfers.text-146"
              titleKey="transfers.text-147"
              accent={brand.name}
              className="transfer-benefits-heading"
              underline
            >
              <p className="mt-3 text-sm text-on-surface-variant sm:text-base">
                <ContentText contentKey="transfers.text-148" />
              </p>
            </TransferHeading>
            <ul className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:mt-8 lg:gap-y-9">
              {benefits.map(({ id, body, icon }) => (
                <li key={id} className="flex items-start gap-3">
                  <TransferIcon className="transfer-feature-icon transfer-benefit-icon">
                    {icon}
                  </TransferIcon>
                  <div>
                    <h3 className="font-bold">
                      <ContentText contentKey={`transfers.text-${id}`} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                      <ContentText contentKey={`transfers.text-${body}`} />
                      {id === "155" && (
                        <strong>
                          {" "}
                          <ContentText contentKey="transfers.text-157" />
                        </strong>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="transfer-airport-banner flex items-center rounded-[22px] bg-primary px-6 py-9 text-on-primary sm:px-10">
            <div className="relative max-w-[34ch]">
              <h3 className="text-2xl font-extrabold leading-tight sm:text-[32px]">
                Đón xe sân bay
                <br />
                nhanh chóng – tiện lợi
              </h3>
              <p className="mb-4 mt-2 text-sm sm:text-base">
                Đội xe luôn túc trực tại sân bay Cam Ranh và trung tâm Nha
                Trang.
              </p>
              <a
                href={quoteAnchor}
                className="transfer-pill transfer-pill-white"
              >
                Đặt xe ngay{" "}
                <TransferIcon className="text-lg">arrow_forward</TransferIcon>
              </a>
            </div>
          </div>
        </div>

        <TransferCallout
          className="mt-10 lg:mt-[84px]"
          title={<ContentText contentKey="transfers.text-159" />}
          actions={
            <>
              <ContentLink
                contentKey="transfers.attributes-023"
                className="transfer-pill transfer-pill-amber"
              >
                <ContentText contentKey="transfers.text-161" />
              </ContentLink>
              <TransferZaloLink contentKey="transfers.attributes-024">
                <ContentText contentKey="transfers.text-162" />
              </TransferZaloLink>
            </>
          }
        >
          <ContentText contentKey="transfers.text-160" />
        </TransferCallout>
      </div>
    </section>
  );
}
