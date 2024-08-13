import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        apricot: "hsl(var(--apricot))",
        exams: {
          DEFAULT: "hsl(var(--exams))",
          foreground: "hsl(var(--exams-foreground))",
        },
        tests: {
          DEFAULT: "hsl(var(--tests))",
          foreground: "hsl(var(--tests-foreground))",
        },
        stateExams: {
          DEFAULT: "hsl(var(--stateExams))",
          foreground: "hsl(var(--stateExams-foreground))",
        },
        diplomas: {
          DEFAULT: "hsl(var(--diplomas))",
          foreground: "hsl(var(--diplomas-foreground))",
        },
        eduPractices: {
          DEFAULT: "hsl(var(--eduPractices))",
          foreground: "hsl(var(--eduPractices-foreground))",
        },
        internships: {
          DEFAULT: "hsl(var(--internships))",
          foreground: "hsl(var(--internships-foreground))",
        },
        holidays: {
          DEFAULT: "hsl(var(--holidays))",
          foreground: "hsl(var(--holidays-foreground))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        Din: ["var(--Din)"],
        Cera: ["var(--Cera)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "accordion-open": {
          from: { width: "0" },
          to: { width: "var(--radix-accordion-content-height)" },
        },
        "accordion-close": {
          from: { width: "var(--radix-accordion-content-height)" },
          to: { width: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "accordion-open": "accordion-open 0.3s ease-out",
        "accordion-close": "accordion-close 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require('tailwindcss-animated')
  ],
} satisfies Config

export default config