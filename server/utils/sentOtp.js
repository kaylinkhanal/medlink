import axios from "axios";

const sendOtp = async (phone, otp) => {
  await axios.get(
    `https://sms.aakashsms.com/sms/v3/send?auth_token=${process.env.AAKASH_TOKEN}&to=${phone}&text=Your MedLink OTP is ${otp}`
  );
};

export default sendOtp;