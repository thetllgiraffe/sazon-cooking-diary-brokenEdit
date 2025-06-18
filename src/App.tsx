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
        bookmarks,
        setBookmarks,
        isBookmarked,
        setIsBookmarked,
    } = useMeals();

    // console.log("meals", meals);

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
                bookmarks,
                setBookmarks,
                isBookmarked,
                setIsBookmarked,
            }}
        >
            <main className="container">
                <Header />

                <SearchResults
                    results={meals?.map((meal) => {
                        return {
                            img: meal.strMealThumb,
                            name: meal.strMeal,
                            id: meal.idMeal,
                            tags: meal.strTags,
                        };
                    })}
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
