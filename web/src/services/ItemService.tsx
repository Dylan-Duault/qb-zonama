import { ICategory } from "../stores/Categories";
import { IItem } from "../stores/Items";
import { fetchNui } from "../utils/fetchNui";

const fakerItems: IItem[] = [
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Car",
  },
  {
    id: 2,
    name: "Pants",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Car",
  },
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 2,
    name: "Pants",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 2,
    name: "Pants",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 2,
    name: "Pants",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 2,
    name: "Pants",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 1,
    name: "Shirt",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Clothes",
  },
  {
    id: 2,
    name: "Mommy ?",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Technology",
  },
  {
    id: 1,
    name: "Thing",
    price: 15,
    image: "shirt.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Technology",
  },
  {
    id: 2,
    name: "Stuff",
    price: 24,
    image: "pants.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Technology",
  },
  {
    id: 3,
    name: "Macbook",
    price: 3,
    image: "macbook.png",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "Technology",
  },
];

export const getItems = async (): Promise<IItem[]> => {
  return new Promise((resolve) => {
    fetchNui<IItem[]>("getItems")
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        resolve(fakerItems);
      });
  });
};

export const getCategories = async (items: IItem[]): Promise<ICategory[]> => {
  return new Promise((resolve) => {
    let categories = items.map((item) => {
      return {
        name:
          item.category_name.charAt(0).toUpperCase() +
          item.category_name.slice(1),
      } as ICategory;
    });

    // make sure there are no duplicates
    categories = categories.filter((category, index) => {
      return categories.findIndex((c) => c.name === category.name) === index;
    });

    resolve(categories);
  });
};

export const getItemsFromCategory = async (
  categoryName: string,
  items: IItem[]
): Promise<IItem[]> => {
  return new Promise((resolve, reject) => {
    let itemsFromCategory = items.filter((item) => {
      return item.category_name.toLowerCase() === categoryName.toLowerCase();
    });

    if (itemsFromCategory.length === 0) {
      reject("No items found in category " + categoryName);
    } else {
      resolve(itemsFromCategory);
    }
  });
};
