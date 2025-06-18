import { createContext } from "react";
import type { Meal } from "../models/Imeals";

type MealContextType = {
    meals: Meal[];
    currentMeal: Meal | null;
    error: string;
    isLoading: boolean;
    searchTerm: string;
    handleSearchInput: (str: string) => void;
    searchMeals: (type: "search" | "random" | "id") => Promise<void>;
    selectMeal: (id: string) => void;
};

export const MealContext = createContext<MealContextType>({} as MealContextType);
