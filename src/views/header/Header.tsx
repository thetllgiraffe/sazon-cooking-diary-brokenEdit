import { useContext, useRef, useState } from "react";
import "./header.css";
import { MealContext } from "../../context/MealContext";

export function Header({
    onChange,
    onClick,
    searchVal,
    onRandom,
}: {
    onChange: (str: string) => void;
    onClick: () => Promise<void>;
    onRandom: () => Promise<void>;
    searchVal: string;
}) {
    const context = useContext(MealContext);

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks" || "[]"));

    return (
        <header className="nav">
            <h1>Sazón</h1>
            <nav>
                <Searchbar onChange={onChange} onClick={onClick} searchVal={searchVal} />
                <div className="btns">
                    <Button label="Random" onClick={onRandom}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="#000000"
                            viewBox="0 0 256 256"
                        >
                            <path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path>
                        </svg>
                    </Button>

                    <Button label="Add Recipe">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="#000000"
                            viewBox="0 0 256 256"
                        >
                            <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-40-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"></path>
                        </svg>
                    </Button>

                    <Button label="Bookmarks" bookmarks={bookmarks}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="#000000"
                            viewBox="0 0 256 256"
                        >
                            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
                        </svg>
                    </Button>
                </div>
            </nav>
        </header>
    );
}

function Searchbar({
    onChange,
    onClick,
    searchVal,
}: {
    onChange: (str: string) => void;
    onClick: () => Promise<void>;
    searchVal: string;
}) {
    const inputRef = useRef(null);

    function onSearch() {
        onClick();
        inputRef?.current.focus();
        onChange("");
    }

    return (
        <div className="search">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search by recipe"
                name=""
                id=""
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                value={searchVal}
            />
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#fff"
                    viewBox="0 0 256 256"
                >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
                <span onClick={() => onSearch()}>Search</span>
            </button>
        </div>
    );
}

function Button({
    label,
    children,
    onClick,
    bookmarks,
}: {
    label: string;
    onClick?: () => Promise<void>;
    children: React.ReactNode;
    bookmarks?: Array<{
        name: string;
        id: string;
        img: string;
    }>;
}) {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <>
            <div
                className="btn"
                onClick={onClick}
                onMouseEnter={() => {
                    if (bookmarks?.length) {
                        setIsHover(true);
                    }

                    if (!bookmarks?.length) {
                        setIsHover(false);
                    }
                }}
            >
                {children}
                <span>{label}</span>
            </div>
            {bookmarks?.length && isHover && (
                <ul
                    className="bookmarks"
                    onMouseLeave={() => {
                        if (bookmarks?.length) {
                            setIsHover(false);
                        }
                    }}
                >
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id} onClick={() => console.log(bookmark.id)}>
                            <img src={bookmark.img} alt="bookmark" />
                            <h5>{bookmark.name}</h5>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
