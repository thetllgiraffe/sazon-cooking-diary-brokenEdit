import "./aside.css";

interface SearchResult {
    img: string;
    name: string;
    tags: string | null;
    id: string;
}

export function SearchResults({
    results,
    current,
    onClick,
    isLoading,
    error,
}: {
    results: SearchResult[];
    current: string;
    onClick: (id: string) => void;
    isLoading: boolean;
    error: string;
}) {
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
                        className={`result ${current === meal.id ? "active" : ""}`}
                        onClick={() => onClick(meal.id)}
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
