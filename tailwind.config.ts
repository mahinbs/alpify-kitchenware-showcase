import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Alpify Brand Colors - Modern Steel Palette
				steel: {
					primary: 'hsl(var(--steel-primary))',
					light: 'hsl(var(--steel-light))',
					accent: 'hsl(var(--steel-accent))',
					dark: 'hsl(var(--steel-dark))',
				},
				brand: {
					navy: 'hsl(var(--brand-navy))',
					blue: 'hsl(var(--brand-blue))',
					light: 'hsl(var(--brand-light))',
				},
				metallic: 'hsl(var(--metallic))',
				
				// Vibrant Colors
				electric: 'hsl(var(--electric-blue))',
				vibrant: 'hsl(var(--vibrant-orange))',
				emerald: 'hsl(var(--emerald-green))',
				pink: 'hsl(var(--hot-pink))',
				golden: 'hsl(var(--golden-yellow))',
				neon: 'hsl(var(--neon-purple))',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'var(--radius-lg)',
				'2xl': 'var(--radius-xl)',
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'DEFAULT': 'var(--shadow)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				'inner': 'var(--shadow-inner)',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'slide-left': 'slideLeft 0.5s ease-out',
				'slide-right': 'slideRight 0.5s ease-out',
				'scale-in': 'scaleIn 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
				'morph': 'morph 8s ease-in-out infinite',
				'gradient-shift': 'gradientShift 3s ease infinite',
				'magnetic': 'magnetic 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'text-glow': 'textGlow 2s ease-in-out infinite alternate',
				'particle-float': 'particleFloat 6s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				slideLeft: {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideRight: {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
					'100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 20px hsl(195 100% 50% / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(195 100% 50% / 0.6), 0 0 60px hsl(330 100% 65% / 0.3)' },
				},
				morph: {
					'0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
					'25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
					'50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
					'75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
				},
				gradientShift: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				magnetic: {
					'0%': { transform: 'scale(1) translateY(0)' },
					'100%': { transform: 'scale(1.05) translateY(-2px)' },
				},
				textGlow: {
					'0%': { textShadow: '0 0 10px hsl(195 100% 50% / 0.5)' },
					'100%': { textShadow: '0 0 20px hsl(195 100% 50% / 0.8), 0 0 30px hsl(330 100% 65% / 0.5)' },
				},
				particleFloat: {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(120deg)' },
					'66%': { transform: 'translateY(10px) rotate(240deg)' },
				},
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'normal': 'var(--transition-normal)',
				'slow': 'var(--transition-slow)',
			},
			transitionTimingFunction: {
				'bounce': 'var(--transition-bounce)',
			},
			zIndex: {
				'nav': 'var(--z-nav)',
				'modal': 'var(--z-modal)',
				'tooltip': 'var(--z-tooltip)',
			},
			spacing: {
				'section': 'var(--section-padding)',
				'container': 'var(--container-padding)',
			},
			backdropBlur: {
				xs: '2px',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
