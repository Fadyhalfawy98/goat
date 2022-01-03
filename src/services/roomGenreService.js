export const genres = [
    { _id: "0", name: "Free" },
    { _id: "1", name: "Busy" },
    { _id: "2", name: "Reserved" }
];

export function getGenres() {
    return genres.filter(g => g);
}
