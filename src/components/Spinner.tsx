import { type FC } from "react";

type Props = {
  color?: string;
};

const Spinner: FC<Props> = ({ color = "border-blue-500" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-16 w-16 animate-spin rounded-full border-t-4 border-solid ${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
