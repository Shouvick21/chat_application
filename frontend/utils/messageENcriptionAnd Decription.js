import CryptoJS from "crypto-js";

const code = import.meta.env.VITE_ENCRIPTION_CODE;

export const encriptMessage = (message) => {
  let encrypmessage = CryptoJS.AES.encrypt(message, code).toString();
  // console.log(encrypmessage)
  return encrypmessage;
};

export const decryptMessage = (message) => {
  let decryptmessage = CryptoJS.AES.decrypt(message, code).toString(
    CryptoJS.enc.Utf8
  );
  // console.log(decryptmessage)
  return decryptmessage;
};
