import { IList } from "../components/List/types";
import uuid from "uuidv4";

export const ListData: IList[] = [
  {
    id: uuid(),
    name: "Knightly Attire",
    items: [
      { id: uuid(), name: "Helmet", quantity: 1, completed: false },
      { id: uuid(), name: "Breastplate", quantity: 1, completed: false },
      { id: uuid(), name: "Gauntlets", quantity: 1, completed: false },
      { id: uuid(), name: "Greaves", quantity: 1, completed: false },
      { id: uuid(), name: "Longsword", quantity: 1, completed: false },
      { id: uuid(), name: "Kite Shield", quantity: 1, completed: false },
      { id: uuid(), name: "Short Bow", quantity: 1, completed: false },
      { id: uuid(), name: "Arrows", quantity: 20, completed: false },
    ],
  },
  {
    id: uuid(),
    name: "Tavern Needs",
    items: [
      { id: uuid(), name: "Grog", quantity: 15, completed: false },
      { id: uuid(), name: "Mutton", quantity: 10, completed: false },
      { id: uuid(), name: "Water", quantity: 10, completed: false },
      { id: uuid(), name: "Bowls", quantity: 8, completed: false },
      { id: uuid(), name: "Spoons", quantity: 8, completed: false },
      { id: uuid(), name: "Bread", quantity: 20, completed: false },
    ],
  },
  {
    id: uuid(),
    name: "Hut Repairs",
    items: [
      { id: uuid(), name: "Nails", quantity: 20, completed: false },
      { id: uuid(), name: "Small Boards", quantity: 5, completed: false },
      { id: uuid(), name: "Clay Mortar", quantity: 10, completed: false },
    ],
  },
];
