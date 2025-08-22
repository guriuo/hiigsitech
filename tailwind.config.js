/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        animation: {
          'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          tilt: 'tilt 10s linear infinite',
          'gradient-flow': 'gradient-flow 20s ease infinite',
          dash: 'dash 3s forwards',
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'float-1': 'float 15s ease-in-out infinite',
          'float-2': 'float 20s ease-in-out infinite -5s',
          'float-3': 'float 18s ease-in-out infinite -10s',
        },
        keyframes: {
            'float': {
              '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
              '25%': { transform: 'translate(20px, 40px) rotate(90deg)' },
              '50%': { transform: 'translate(0px, 60px) rotate(180deg)' },
              '75%': { transform: 'translate(-20px, 40px) rotate(270deg)' },
              '100%': { transform: 'translate(0px, 0px) rotate(360deg)' },
            },
            tilt: {
                '0%, 50%, 100%': {
                    transform: 'rotate(0deg)'
                },
                '25%': {
                    transform: 'rotate(0.5deg)'
                },
                '75%': {
                    transform: 'rotate(-0.5deg)'
                }
            },
            'gradient-flow': {
                '0%': {
                    'background-position': '0% 50%'
                },
                '50%': {
                    'background-position': '100% 50%'
                },
                '100%': {
                    'background-position': '0% 50%'
                }
            },
            dash: {
                to: {
                    'stroke-dashoffset': 0
                }
            },
            'accordion-down': {
                from: {
                    height: '0'
                },
                to: {
                    height: 'var(--radix-accordion-content-height)'
                }
            },
            'accordion-up': {
                from: {
                    height: 'var(--radix-accordion-content-height)'
                },
                to: {
                    height: '0'
                }
            }
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          chart: {
            '1': 'hsl(var(--chart-1))',
            '2': 'hsl(var(--chart-2))',
            '3': 'hsl(var(--chart-3))',
            '4': 'hsl(var(--chart-4))',
            '5': 'hsl(var(--chart-5))'
          }
        }
    }
  },
  plugins: [
    // require('@tailwindcss/line-clamp'), // ✅ REMOVED this line
    require('@tailwindcss/typography'),
    require("tailwindcss-animate")
  ],
};