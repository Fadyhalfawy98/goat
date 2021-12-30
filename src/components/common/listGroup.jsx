import React from "react";

export const ListGroup = ({ genres, selectedGenre, onSelectedGenre }) => {
    return(
        <ul className="list-group clickable">
            {genres.map(genre =>
                <li
                    href="#"
                    key={genre._id}
                    className={selectedGenre === genre ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                    onClick={() => onSelectedGenre(genre)}
                >
                    { genre.name }
                </li>)}
        </ul>
    );};