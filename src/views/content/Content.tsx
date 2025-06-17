import type { Meal } from "../../models/Imeals";

import "./content.css";

export function Content({ currentMeal }: { currentMeal: Meal }) {
    const allIngredients = Object.entries(currentMeal).filter(([key]) =>
        key.includes("strIngredient"),
    );

    const allMeasures = Object.entries(currentMeal).filter(([key]) => key.includes("strMeasure"));

    const allIngredientsAndMeasures = Array.from({ length: allIngredients.length }, (_, i) => [
        allIngredients[i][1],
        allMeasures[i][1] || "1",
    ]).filter(([key]) => key);

    const preparation = currentMeal?.strInstructions?.split(".")?.filter((step) => step);

    if (!Object.keys(currentMeal).length) {
        return (
            <section className="content">
                <h2 className="no-content">Start by searching for an ingredient 🧑‍🍳</h2>
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
