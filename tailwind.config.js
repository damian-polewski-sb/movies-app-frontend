/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-card-image': "url('../public/img/login-card-image.jpg')",
        'register-card-image': "url('../public/img/register-card-image.jpg')",
      }
    },
  },
  plugins: [],
}

