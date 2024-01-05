import React from "react";
import { TypeAnimation } from "react-type-animation";

function TypingAnim() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Get your answers from AI",
        1500,
        "Built with OpenAI 🤖🗯",
        1000,
        "Your personal AI",
        1500,
        "Let's step into new world",
        2000,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
}

export default TypingAnim;
