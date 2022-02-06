import { fetchNui } from "../utils/fetchNui";

export interface itemInterface {
  item_name: string;
  item_price: number;
  item_image: string;
  item_description: string;
  category_name: string;
}

export interface categoryInterface {
  category_name: string;
}

export let items: itemInterface[] = [];

const fakerItems = [
  {
    item_name: "Shirt",
    item_price: 15,
    item_image: "shirt.png",
    item_description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "clothes",
  },
  {
    item_name: "Pants",
    item_price: 45,
    item_image: "pants.png",
    item_description: "Lorem adipisicing elit. Quisquam, quia.",
    category_name: "clothes",
  },
  {
    item_name: "Shoes",
    item_price: 25,
    item_image: "shoes.png",
    item_description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    category_name: "clothes",
  },
  {
    item_name: "Hat",
    item_price: 22,
    item_image: "hat.png",
    item_description: "Lorem ipsum sit amet consectetur.",
    category_name: "clothes",
  },
  {
    item_name: "Shirt",
    item_price: 15,
    item_image: "shirt.png",
    item_description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    category_name: "clothes",
  },
  {
    item_name: "Pants",
    item_price: 45,
    item_image: "pants.png",
    item_description: "Lorem adipisicing elit. Quisquam, quia.",
    category_name: "clothes",
  },
  {
    item_name: "Shoes",
    item_price: 25,
    item_image: "shoes.png",
    item_description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    category_name: "clothes",
  },
  {
    item_name: "Hat",
    item_price: 22,
    item_image: "hat.png",
    item_description: "Lorem ipsum sit amet consectetur.",
    category_name: "clothes",
  },
  {
    item_name: "Engine",
    item_price: 811,
    item_image: "engine.png",
    item_description:
      "Lorem dolor, sit amet consectetur adipisicing elit. Quisquam, quia.",
    category_name: "car",
  },
];

export const getItems = async (): Promise<itemInterface[]> => {
  console.log("1");

  return new Promise((resolve) => {
    fetchNui<itemInterface[]>("getItems")
      .then((data) => {
        items = data;
        resolve(data);
      })
      .catch((e) => {
        items = fakerItems;
        resolve(fakerItems);
      });
  });
};

export const getCategories = async (): Promise<categoryInterface[]> => {
  if (items.length === 0) {
    items = await getItems();
  }

  return new Promise((resolve) => {
    let categories = items.map((item) => {
      return {
        category_name:
          item.category_name.charAt(0).toUpperCase() +
          item.category_name.slice(1),
      } as categoryInterface;
    });

    // make sure there are no duplicates
    categories = categories.filter((category, index) => {
      return (
        categories.findIndex(
          (c) => c.category_name === category.category_name
        ) === index
      );
    });

    console.log("listing categories ============== \n");
    console.log(categories);

    resolve(categories);
  });
};

export const getItemsFromCategory = async (
  categoryName: string
): Promise<itemInterface[]> => {
  if (items.length === 0) {
    items = await getItems();
  }

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
