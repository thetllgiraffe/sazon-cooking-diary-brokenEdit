import { useEffect, useState } from "react";
import type { Meal } from "../models/Imeals";

interface Bookmark {
    name: string;
    id: string;
    img: string;
}

export function useMeals() {
    const [meals, setMeals] = useState<Meal[]>([] as Meal[]);
    const [currentMeal, setCurrentMeal] = useState<Meal>({} as Meal);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    function selectMeal(id: string) {
        const curMeal = meals?.find((meal) => meal.idMeal === id);
        setCurrentMeal(curMeal as Meal);
    }

    function handleSearchInput(str: string) {
        setSearchTerm(str);
        if (error) setError("");
    }

    type Fetch = "random" | "search" | "id";

    async function searchMeals(type: Fetch = "search", id?: string) {
        if (type === "search") {
            if (!searchTerm.trim()) {
                setError("Please enter a search term");
                return;
            }
        }

        setIsLoading(true);
        setError("");

        const url = {
            random: "https://www.themealdb.com/api/json/v1/1/random.php",
            id: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            search: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
        };

        const res = await fetch(url[type]);

        try {
            const data = await res.json();
            const meals = data.meals;

            if (res.status === 200 && meals === null) {
                setError("No meals found");
                setMeals([]);
                return;
            }

            setError("");
            setMeals(meals);
            if (type === "id" || type === "random") setCurrentMeal(meals[0]);
        } catch (error) {
            console.error("Error fetching meals: ", error);
            setMeals([]);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        meals,
        currentMeal,
        searchTerm,
        error,
        isLoading,
        selectMeal,
        handleSearchInput,
        searchMeals,
        bookmarks,
        setBookmarks,
        isBookmarked,
        setIsBookmarked,
    };
}
