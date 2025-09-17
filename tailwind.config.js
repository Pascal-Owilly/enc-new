// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-1000px) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        float: "float 15s linear infinite",
      },
    },
  },
};
