module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb"],
  plugins: ["react"],
  rules: {
    "react/destructuring-assignment": [0, "never"],
    indent: [1],
    "react/prop-types": [0],
    "max-len": [1],
    "react/prefer-stateless-function":[0,"never"],
    "react/no-unused-state":[1],
    'no-unused-vars':[1]
  }
};
