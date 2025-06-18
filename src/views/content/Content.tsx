import { useContext, useEffect, useState } from "react";
import type { Meal } from "../../models/Imeals";

import "./content.css";
import { MealContext } from "../../context/MealContext";

interface Bookmark {
    name: string;
    id: string;
    img: string;
}

export function Content() {
    const { currentMeal, bookmarks, setBookmarks, setIsBookmarked, isBookmarked } =
        useContext(MealContext);
    // const currentMeal = context.currentMeal as Meal;
    // const bookmarks = context.bookmarks;
    // const setBookmarks = context.setBookmarks;

    // const bookmarks: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks" || "[]"));

    // const [isBookmarked, setIsBookmarked] = useState<boolean>(
    //     bookmarks?.some((recipe) => recipe.id === currentMeal.idMeal),
    // );

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarks(storedBookmarks);
        setIsBookmarked(
            storedBookmarks?.some((recipe: Bookmark) => recipe.id === currentMeal?.idMeal),
        );
    }, [currentMeal?.idMeal, setBookmarks, setIsBookmarked]);

    const allIngredients = Object.entries(currentMeal).filter(([key]) =>
        key.includes("strIngredient"),
    );

    const allMeasures = Object.entries(currentMeal).filter(([key]) => key.includes("strMeasure"));

    const allIngredientsAndMeasures = Array.from({ length: allIngredients.length }, (_, i) => [
        allIngredients[i][1],
        allMeasures[i][1] || "1",
    ]).filter(([key]) => key);

    const preparation = currentMeal?.strInstructions?.split(".")?.filter((step) => step);

    function bookmarkRecipe() {
        const currentBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const existingIndex = currentBookmarks.findIndex(
            (recipe) => recipe.id === currentMeal.idMeal,
        );

        let updatedBookmarks;
        if (existingIndex === -1) {
            updatedBookmarks = [
                ...currentBookmarks,
                {
                    id: currentMeal?.idMeal,
                    img: currentMeal?.strMealThumb,
                    name: currentMeal?.strMeal,
                },
            ];
        } else {
            updatedBookmarks = currentBookmarks.filter(
                (recipe) => recipe.id !== currentMeal?.idMeal,
            );
        }

        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
        setIsBookmarked(!isBookmarked);
    }

    if (!Object.keys(currentMeal).length) {
        return (
            <section className="content">
                <h2 className="no-content">Start by searching for a Meal 🧑‍🍳</h2>
            </section>
        );
    }

    return (
        <section className="content">
            <div
                className="content--image"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(141, 135, 65, 0.802), rgba(141, 135, 65, 0.704)), 
                        url(${currentMeal.strMealThumb})
                    `,
                }}
            >
                <h3>{currentMeal.strMeal}</h3>
                <i
                    className="bookmark"
                    onClick={() => {
                        setIsBookmarked((prev) => !prev);
                        bookmarkRecipe();
                    }}
                >
                    {isBookmarked ? <BookmarkActive /> : <Bookmark />}
                </i>
            </div>

            <div className="ingredients__section">
                <h3>Recipe Ingredients</h3>

                <ul className="ingredients">
                    {allIngredientsAndMeasures?.map(([ingredient, measure]) => {
                        return (
                            <li>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="#000000"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                    </svg>
                                    {measure}
                                </span>
                                <span>{ingredient}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="preparation__section">
                <h3>How to cook it</h3>
                <ol>
                    {preparation?.map((step, i) => (
                        <li>
                            <span>{i + 1}. </span>
                            <span>{step.trim()}.</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function Bookmark() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
        </svg>
    );
}

function BookmarkActive() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
        >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
        </svg>
    );
}
