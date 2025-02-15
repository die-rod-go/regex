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
        "bg-primary": "#1F2937", // the page background
        "bg-secondary": "#374151", // cheat sheet background
        "bg-card": "#2A3546", // slightly lighter card background for contrast
        "bg-input": "#374151", // input background
        "bg-sample": "#374151", // background of the puzzle text area
        "text-primary": "#F9FAFB", // general body text (puzzle description)
        "text-secondary": "#D1D5DB", // puzzle sample text
        "text-muted": "#D1D5DB", // cheat sheet text
        "border-input": "#4B5563", // input border
        "border-card": "#374151", // card border
        "hover-accent": "#3B82F6", // accent color on hover
        "border-accent": "#60A5FA", // input border on focus
        accent: "#60A5FA", // buttons/arrows/heading
      },
    },
  },
  plugins: [],
} satisfies Config;
