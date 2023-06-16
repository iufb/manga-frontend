import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const MultiSelect = ({
  items,
  title,
}: {
  items: string[];
  title: string;
}): JSX.Element => {
  const [values, setValues] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    const selectedOptions = items.find((item) => item == selectedValue);
    if (selectedOptions) {
      setValues([...values, selectedOptions]);
      e.target.value = "";
    }
  };
  const handleDisabled = (item: string) => {
    return values.findIndex((value) => value == item) !== -1;
  };
  const handleDelete = (item: string) => {
    setValues([...values.filter((value) => value !== item)]);
  };
  return (
    <div className="flex flex-col">
      <div
        className={`flex ${
          isFocus && "border"
        } border-indigoGrey p-2 rounded-md  `}
      >
        {values.length > 0 && (
          <div className="flex  gap-2 top-2 px-2   ">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-indigoGrey rounded-md text-customWhite cursor-pointer p-1 flex items-center  gap-2 "
              >
                {value}
                <AiOutlineClose onClick={() => handleDelete(value)} />
              </div>
            ))}
          </div>
        )}
        <input
          list="select"
          placeholder={title}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={`  flex-1 w-full pl-2 focus:outline-none py-2`}
        />
      </div>
      <datalist id="select">
        {items.map((item) => (
          <option key={item} disabled={handleDisabled(item)}>
            {item}
          </option>
        ))}
      </datalist>
    </div>
  );
};
