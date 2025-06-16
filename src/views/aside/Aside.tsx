import "./aside.css";

interface SearchResult {
    img: string;
    name: string;
    tags: string | null;
    id: string;
}

export function SearchResults({
    results,
    onClick,
}: {
    results: SearchResult[];
    onClick: (id: string) => void;
}) {
    return (
        <aside className="aside">
            <ul className="results">
                {results?.map((meal) => (
                    <li key={meal.id} className="result" onClick={() => onClick(meal.id)}>
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
