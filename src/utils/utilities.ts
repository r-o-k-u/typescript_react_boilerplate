export default {
  server: "http://localhost:3000/api",
  verifyPhoneNumber(n: any): Number {
    n = n + "";
    if (n[0] + n[1] + n[2] === "254") {
      return parseInt(n);
    } else {
      return parseInt("254" + parseInt(n));
    }
  },
};
