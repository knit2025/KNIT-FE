// // tailwind.config.ts
// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         gosran: ['"GabiaGosran"', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;

// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gosran: ['"GabiaGosran"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
