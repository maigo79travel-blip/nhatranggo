import "server-only";

// All public product queries use the `p` alias. Route codes are literal prefixes.
export const publicProductWhere =
  "p.active=true AND NOT EXISTS(SELECT 1 FROM transfer_routes r WHERE starts_with(p.id,'transfer-'||r.code||'-') AND r.active=false)";
