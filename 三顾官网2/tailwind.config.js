/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#002147',
                    light: '#003875',
                    dark: '#001529'
                },
                secondary: {
                    DEFAULT: '#007bff',
                    light: '#3395ff',
                    dark: '#0056b3'
                },
                accent: {
                    DEFAULT: '#ff6b00',
                    light: '#ff8533',
                    dark: '#cc5500'
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                mono: ['Consolas', 'Monaco', 'Courier New', 'monospace']
            },
            spacing: {
                '18': '4.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem'
            },
            height: {
                'screen-90': '90vh'
            },
            maxWidth: {
                '8xl': '88rem'
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100'
            }
        }
    },
    plugins: []
}