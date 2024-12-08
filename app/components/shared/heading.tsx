import React from "react";

interface Props {
  text: string;
  styles?: string; // If you want to pass additional styles
}

const Heading: React.FC<Props> = ({ text, styles }) => {
  return (
    <div>
      <h1 className={`md:text-[24px] font-semibold text-xl  ${styles}`}>
        {text}
      </h1>
    </div>
  );
};

export default Heading;
