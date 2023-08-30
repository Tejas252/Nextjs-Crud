import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

const page = () => {
  const recaptchaRef = useRef(null);
  const [isVerified, setIsverified] = useState(false);

  async function handleCaptchaSubmission(token) {
    // console.log("🚀 ~ file: captcha.jsx:11 ~ handleCaptchaSubmission ~ token:", token)
    const res = await axios.post(`/api/users/captcha`, {
      token,
    });

    // console.log("🚀 ~ file: captcha.jsx:14 ~ handleCaptchaSubmission ~ res:", res)
    if (res.data.success) {
      setIsverified(true);
    } else {
      setIsverified(false);
      toast("Enter Vaild Captcha");
    }
  }
  return (
    <>
      <ReCAPTCHA
        sitekey="6LcJOM4nAAAAAEGqOseujsnS_uVBJXZidiToyVAP"
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />
      <div className="d-grid gap-2">
        <Link className="color-text" href="/login">
          {" "}
          Already have an account
        </Link>
        <Button color="primary" className="my-3" disabled={!isVerified}>
          Signup
        </Button>
      </div>
    </>
  );
};
export default page;
