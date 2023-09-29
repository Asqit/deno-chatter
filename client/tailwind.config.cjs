/** @type {import('https://esm.sh/tailwindcss@3.1.8').Config} */
module.exports = {
  content: [
    "./routes/**/*.{tsx,ts}",
    "./islands/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        // Fade-In-Up
        fadeInUp: {
          from: {
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
          },

          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        // Fade-In-Down
        fadeInDown: {
          from: {
            opacity: 0,
            transform: "translate3d(0, -100%, 0)",
          },

          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        // Fade-In-Right
        fadeInRight: {
          from: {
            opacity: 0,
            transform: "translate3d(100%, 0, 0)",
          },

          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        // Fade-In-Left
        fadeInLeft: {
          from: {
            opacity: 0,
            transform: "translate3d(-100%, 0, 0)",
          },

          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 300ms cubic-bezier(0, 0, 0.2, 1)",
        "fade-in-down": "fadeInDown 300ms cubic-bezier(0, 0, 0.2, 1)",
        "fade-in-left": "fadeInLeft 300ms cubic-bezier(0, 0, 0.2, 1)",
        "fade-in-right": "fadeInRight 300ms cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
