import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCH_SITE_KEY } from "../../utils/captchaContants";
import "./captcha.css";

const Captcha = ({ onChangeReCaptcha = () => {}, handleExpired = () => {}, className = '', style }, ref) => {
   return (
      <div className={`captcha-cn ${className}`} style={style}>
         <ReCAPTCHA
            ref={ref}
            type="image"
            hl="vi"
            sitekey={RECAPTCH_SITE_KEY}
            onChange={onChangeReCaptcha}
            onExpired={handleExpired}
         />
      </div>
   );
};

export default forwardRef(Captcha);
