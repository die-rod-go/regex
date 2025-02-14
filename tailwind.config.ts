import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1E1E1E",
        primary_text: "#E0E0E0",
        secondary_text: "#A0CFFF",
        accent: "#007BFF",
        input: "#252525",
      },
    },
  },
  plugins: [],
} satisfies Config;
