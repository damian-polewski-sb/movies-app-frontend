/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-card-image': "url('img/login-card-image.jpg')",
        'register-card-image': "url('img/register-card-image.jpg')",
      }
    },
  },
  plugins: [],
}

