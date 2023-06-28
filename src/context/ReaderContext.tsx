import React, { PropsWithChildren, useState } from "react";

interface IReaderContext {
  currentPage: number;
  goNext: (max: number) => void;
  goBack: () => void;
}
export const ReaderContext = React.createContext<IReaderContext>({
  currentPage: 1,
  goNext: () => {},
  goBack: () => {},
});

export const ReaderProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const goNext = (max: number) => {
    setCurrentPage(currentPage + 1);
  };
  const goBack = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <ReaderContext.Provider
      value={{
        currentPage,
        goBack,
        goNext,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};
