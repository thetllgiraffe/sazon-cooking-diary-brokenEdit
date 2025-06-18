import { Content, Header, SearchResults } from "./views/";
import "./App.css";

import { useMeals } from "./hooks/useMeals";
import { MealContext } from "./context/MealContext";
// import { createContext } from "react";

// const MealContext = createContext(null);

function App() {
    const {
        meals,
        currentMeal,
        error,
        handleSearchInput,
        isLoading,
        searchMeals,
        searchTerm,
        selectMeal,
    } = useMeals();

    return (
        <MealContext.Provider
            value={{
                meals,
                currentMeal,
                error,
                handleSearchInput,
                isLoading,
                searchMeals,
                searchTerm,
                selectMeal,
            }}
        >
            <main className="container">
                <Header
                    onChange={handleSearchInput}
                    onClick={() => searchMeals("search")}
                    searchVal={searchTerm}
                    onRandom={() => searchMeals("random")}
                />

                <SearchResults
                    onClick={selectMeal}
                    results={meals?.map((meal) => {
                        return {
                            img: meal.strMealThumb,
                            name: meal.strMeal,
                            id: meal.idMeal,
                            tags: meal.strTags,
                        };
                    })}
                    current={currentMeal?.idMeal}
                    isLoading={isLoading}
                    error={error}
                />

                <Content currentMeal={currentMeal} />

                <footer
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        paddingBottom: "1.5rem",
                    }}
                >
                    Made with love by edu
                </footer>
            </main>
        </MealContext.Provider>
    );
}

export default App;
