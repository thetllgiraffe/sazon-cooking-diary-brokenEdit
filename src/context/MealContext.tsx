import { createContext } from "react";
import type { Meal } from "../models/Imeals";

interface Bookmark {
    name: string;
    id: string;
    img: string;
}

type MealContextType = {
    meals: Meal[];
    currentMeal: Meal | null;
    error: string;
    isLoading: boolean;
    searchTerm: string;
    handleSearchInput: (str: string) => void;
    searchMeals: (type: "search" | "random" | "id") => Promise<void>;
    selectMeal: (id: string) => void;
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<Bookmark[]>;
    isBookmarked: boolean;
    setIsBookmarked: React.Dispatch<boolean>;
};

export const MealContext = createContext<MealContextType>({} as MealContextType);
