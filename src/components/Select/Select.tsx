import { ForwardedRef, forwardRef } from "react";
import { SelectProps } from "./Select.props";

export const Select = forwardRef(function Select(
  { className, items, defaultValue, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
): JSX.Element {
  return (
    <select
      className={`${className} select select-bordered select-md flex-1`}
      {...props}
      ref={ref}
    >
      <option disabled>{defaultValue}</option>
      {items.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
});
