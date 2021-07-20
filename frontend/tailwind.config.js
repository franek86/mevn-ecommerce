module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      body: ["Poppins"],
    },
    colors: {
      orangeColor: "#e09270",
      orangeLight: "#f1ccbb",
      greenColor: "#9aa084",
      yellowColor: "#ffcb38",
      yellowLight: "#FFEBB8",
      darkColor: "#242424",
      whiteColor: "#ffffff",
      greyColor: "#f4f4f4",
      redColor: "#EF4444",
    },

    container: {
      padding: "20px",
      center: true,
    },
    gridTemplateRows: {
      rowsMax: "max-content",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
