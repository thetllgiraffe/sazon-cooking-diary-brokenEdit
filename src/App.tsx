import { Content, Header, SearchResults } from "./views/";
import "./App.css";

import { useMeals } from "./hooks/useMeals";

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
        <>
            <main className="container">
                <Header
                    onChange={handleSearchInput}
                    onClick={searchMeals}
                    searchVal={searchTerm}
                    onRandom={() => searchMeals(true)}
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
        </>
    );
}

export default App;
