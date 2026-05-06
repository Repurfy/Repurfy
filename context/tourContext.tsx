import { createContext, useContext, useState, ReactNode } from "react";

type TourContextType = {
  runTour: boolean;
  setRunTour: (value: boolean) => void;
  stepIndex: number;
  setStepIndex: (value: number) => void;
};

const TourContext = createContext<TourContextType | null>(null);

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  return (
    <TourContext.Provider value={{ runTour, setRunTour, stepIndex, setStepIndex }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used within TourProvider");
  return context;
};