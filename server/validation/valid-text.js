// const validText = str => {
//     return typeof str === "string" && str.trim().length > 0;
// };

const validText = str => (
  (typeof str === "string" && str.trim().length > 0) ? str : ""
);

module.exports = validText;