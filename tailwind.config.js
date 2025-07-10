/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // DM Sans fonts
        'dm-sans-thin': ['DMSans-Thin'],
        'dm-sans-light': ['DMSans-Light'],
        'dm-sans': ['DMSans-Regular'], // Regular as default
        'dm-sans-medium': ['DMSans-Medium'],
        'dm-sans-semibold': ['DMSans-SemiBold'],
        'dm-sans-bold': ['DMSans-Bold'],
        
        // Darker Grotesque fonts
        'darker-grotesque': ['DarkerGrotesque-Regular'], // Regular as default
        'darker-grotesque-medium': ['DarkerGrotesque-Medium'],
        'darker-grotesque-semibold': ['DarkerGrotesque-SemiBold'],
        'darker-grotesque-bold': ['DarkerGrotesque-Bold'],
        'darker-grotesque-extrabold': ['DarkerGrotesque-ExtraBold'],
        
        // Set DM Sans Regular as the default sans font
        'sans': ['DMSans-Regular', 'system'],
      },
    },
  },
  plugins: [],
}