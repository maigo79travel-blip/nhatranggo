const { colors, colorVariables } = require("./src/theme/tailwind-colors.cjs");
module.exports = {
  darkMode: "class",
  theme: {
    colors,
    extend: {
      boxShadow: {
        header: "0 2px 16px rgb(var(--color-shadow-blue) / 0.06)",
        footer: "0 -1px 12px rgb(var(--color-shadow-blue) / 0.04)",
        card: "0 8px 28px rgb(var(--color-shadow-blue) / 0.08)",
        "card-hover": "0 14px 36px rgb(var(--color-shadow-blue) / 0.14)",
        floating: "0 12px 32px rgb(var(--color-shadow-blue) / 0.12)",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "space-sm": "0.5rem",
        "space-xl": "2.5rem",
        "gutter-mobile": "1rem",
        "margin-mobile": "1rem",
        "space-md": "1rem",
        gutter: "1.5rem",
        "space-xs": "0.25rem",
        margin: "2rem",
        "space-lg": "1.5rem",
      },
      fontFamily: {
        "label-lg": ["Plus Jakarta Sans"],
        "title-md": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        display: ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"],
        "headline-sm": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "display-mobile": ["Plus Jakarta Sans"],
      },
      fontSize: {
        "label-lg": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "600",
          },
        ],
        "title-md": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "700",
          },
        ],
        "headline-md": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        display: [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: "-0.03em",
            fontWeight: "800",
          },
        ],
        "body-sm": [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "14px",
          {
            lineHeight: "22px",
            fontWeight: "400",
          },
        ],
        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "body-lg": [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.02em",
            fontWeight: "600",
          },
        ],
        "headline-sm": [
          "20px",
          {
            lineHeight: "28px",
            fontWeight: "600",
          },
        ],
        "label-sm": [
          "11px",
          {
            lineHeight: "14px",
            letterSpacing: "0.04em",
            fontWeight: "700",
          },
        ],
        "headline-lg-mobile": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "display-mobile": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
      },
    },
  },
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [colorVariables],
};
