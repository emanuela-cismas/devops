import cat from "./resources/cats.png";
import dog from "./resources/dogs.png";
import rodent from "./resources/rodents.png";
import reptile from "./resources/reptiles.png";
export const categories = [
  {
    id: 1,
    url: cat,
    species: "Cats",
  },
  {
    id: 2,
    url: dog,
    species: "Dogs",
  },
  {
    id: 3,
    url: rodent,
    species: "Rodents",
  },
  {
    id: 4,
    url: reptile,
    species: "Reptiles",
  },
];
export const animals = [
  { id: 1, image: cat, description: "kitty" },
  { id: 2, image: dog, description: "dog" },
  { id: 3, image: rodent, description: "hamster" },
  { id: 4, image: reptile, description: "tortoise" },
  { id: 5, image: cat, description: "tortoise" },
  { id: 6, image: dog, description: "tortoise" },
  { id: 7, image: reptile, description: "tortoise" },
];
