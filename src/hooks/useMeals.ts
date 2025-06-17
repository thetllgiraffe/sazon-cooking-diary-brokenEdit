import { useState } from "react";
import type { Meal } from "../models/Imeals";

export function useMeals() {
    const [meals, setMeals] = useState<Meal[]>([] as Meal[]);
    const [currentMeal, setCurrentMeal] = useState<Meal>({} as Meal);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function selectMeal(id: string) {
        const curMeal = meals?.find((meal) => meal.idMeal === id);
        setCurrentMeal(curMeal as Meal);
    }

    function handleSearchInput(str: string) {
        setSearchTerm(str);
        if (error) setError("");
    }

    async function searchMeals(random = false) {
        if (!random) {
            if (!searchTerm.trim()) {
                setError("Please enter a search term");
                return;
            }
        }

        setIsLoading(true);
        setError("");

        const res = await fetch(
            !random
                ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
                : "https://www.themealdb.com/api/json/v1/1/random.php",
        );

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
    };
}
