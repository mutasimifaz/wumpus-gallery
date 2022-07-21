import React from "react";

const SignLottie = () => {
  return (
    <div className="flex justify-center items-center my-auto mx-auto">
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_pghdouhq.json"
        background="transparent"
        speed="1"
        style={{ width: "400px", height: "400px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};

export default SignLottie;
