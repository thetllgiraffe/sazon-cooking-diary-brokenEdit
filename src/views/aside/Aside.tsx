import { useContext } from "react";
import "./aside.css";
import { MealContext } from "../../context/MealContext";

interface SearchResult {
    img: string;
    name: string;
    tags: string | null;
    id: string;
}

export function SearchResults({ results }: { results: SearchResult[] }) {
    const { selectMeal, isLoading, error, currentMeal } = useContext(MealContext);

    if (isLoading) {
        return <div className="loading">🧑‍🍳 Loading...🍗</div>;
    }

    if (error) {
        return <div className="error">⚠️ {error} 🚫</div>;
    }

    return (
        <aside className="aside">
            <ul className="results">
                {results?.map((meal) => (
                    <li
                        key={meal.id}
                        className={`result ${currentMeal?.idMeal === meal.id ? "active" : ""}`}
                        onClick={() => selectMeal(meal.id)}
                    >
                        <img src={`${meal?.img}`} alt="meal thumbnail" />
                        <div>
                            <h4>{meal?.name}</h4>
                            <span>{meal?.tags}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
