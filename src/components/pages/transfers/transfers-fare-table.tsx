import { ContentText, ContentElement, FareValue } from "@/components/content";

export function TransfersFareTable() {
  return (
    <section className="w-full py-16 bg-surface-container-low/50">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              <ContentText contentKey="transfers.text-071" />
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              <ContentText contentKey="transfers.text-072" />
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 ">
              <ContentText contentKey="transfers.text-073" />
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-soft text-tertiary font-label-md text-label-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              {"verified_user"}
            </span>
            <span>
              <ContentText contentKey="transfers.text-074" />
            </span>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-3xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface font-label-lg text-label-lg">
                  <th className="py-4 px-6">
                    <ContentText contentKey="transfers.text-075" />
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <span>
                        <ContentText contentKey="transfers.text-076" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        <ContentText contentKey="transfers.text-077" />
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <span>
                        <ContentText contentKey="transfers.text-078" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        <ContentText contentKey="transfers.text-079" />
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <span>
                        <ContentText contentKey="transfers.text-080" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        <ContentText contentKey="transfers.text-081" />
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center bg-ocean-light/40">
                    <div className="flex flex-col items-center">
                      <span className="text-primary font-bold">
                        <ContentText contentKey="transfers.text-082" />
                      </span>
                      <span className="font-body-sm text-body-sm text-primary font-normal">
                        <ContentText contentKey="transfers.text-083" />
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <ContentText contentKey="transfers.text-084" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/50 font-body-md text-body-md">
                <tr className="hover:bg-surface-subtle transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        <ContentText contentKey="transfers.text-085" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        <ContentText contentKey="transfers.text-086" />
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_NT_CENTER" vehicle="4cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_NT_CENTER" vehicle="7cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_NT_CENTER" vehicle="16cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-extrabold text-sale-crimson bg-ocean-light/20">
                    <FareValue route="CXR_NT_CENTER" vehicle="limo9" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <ContentElement
                      contentKey="transfers.attributes-010"
                      tag="a"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md transition-all shadow-sm action-link"

                      rel="noopener"
                      target="_blank"
                    >
                      <span>
                        <ContentText contentKey="transfers.text-087" />
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        {"arrow_forward"}
                      </span>
                    </ContentElement>
                  </td>
                </tr>

                <tr className="hover:bg-surface-subtle transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        <ContentText contentKey="transfers.text-088" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        <ContentText contentKey="transfers.text-089" />
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_BAI_DAI" vehicle="4cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_BAI_DAI" vehicle="7cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="CXR_BAI_DAI" vehicle="16cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-extrabold text-sale-crimson bg-ocean-light/20">
                    <FareValue route="CXR_BAI_DAI" vehicle="limo9" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <ContentElement
                      contentKey="transfers.attributes-011"
                      tag="a"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md transition-all shadow-sm action-link"

                      rel="noopener"
                      target="_blank"
                    >
                      <span>
                        <ContentText contentKey="transfers.text-090" />
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        {"arrow_forward"}
                      </span>
                    </ContentElement>
                  </td>
                </tr>

                <tr className="hover:bg-surface-subtle transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        <ContentText contentKey="transfers.text-091" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        <ContentText contentKey="transfers.text-092" />
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DALAT" vehicle="4cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DALAT" vehicle="7cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DALAT" vehicle="16cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-extrabold text-sale-crimson bg-ocean-light/20">
                    <FareValue route="NT_CENTER_DALAT" vehicle="limo9" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <ContentElement
                      contentKey="transfers.attributes-012"
                      tag="a"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md transition-all shadow-sm action-link"

                      rel="noopener"
                      target="_blank"
                    >
                      <span>
                        <ContentText contentKey="transfers.text-093" />
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        {"arrow_forward"}
                      </span>
                    </ContentElement>
                  </td>
                </tr>

                <tr className="hover:bg-surface-subtle transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        <ContentText contentKey="transfers.text-094" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        <ContentText contentKey="transfers.text-095" />
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_TUY_HOA" vehicle="4cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_TUY_HOA" vehicle="7cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_TUY_HOA" vehicle="16cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-extrabold text-sale-crimson bg-ocean-light/20">
                    <FareValue route="NT_CENTER_TUY_HOA" vehicle="limo9" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <ContentElement
                      contentKey="transfers.attributes-013"
                      tag="a"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md transition-all shadow-sm action-link"

                      rel="noopener"
                      target="_blank"
                    >
                      <span>
                        <ContentText contentKey="transfers.text-096" />
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        {"arrow_forward"}
                      </span>
                    </ContentElement>
                  </td>
                </tr>

                <tr className="hover:bg-surface-subtle transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        <ContentText contentKey="transfers.text-097" />
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        <ContentText contentKey="transfers.text-098" />
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DOC_LET" vehicle="4cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DOC_LET" vehicle="7cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-on-surface">
                    <FareValue route="NT_CENTER_DOC_LET" vehicle="16cho" />
                  </td>
                  <td className="py-5 px-6 text-center font-extrabold text-sale-crimson bg-ocean-light/20">
                    <FareValue route="NT_CENTER_DOC_LET" vehicle="limo9" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <ContentElement
                      contentKey="transfers.attributes-014"
                      tag="a"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md transition-all shadow-sm action-link"

                      rel="noopener"
                      target="_blank"
                    >
                      <span>
                        <ContentText contentKey="transfers.text-099" />
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        {"arrow_forward"}
                      </span>
                    </ContentElement>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-surface-container px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-tertiary">
                {"info"}
              </span>
              <span>
                <strong>
                  <ContentText contentKey="transfers.text-100" />
                </strong>
                <ContentText contentKey="transfers.text-101" />
              </span>
            </div>
            <span className="text-secondary font-semibold shrink-0">
              <ContentText contentKey="transfers.text-102" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
