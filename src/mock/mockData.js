export const  categories =[
    { id: 1, name: "Clothes" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Furniture" },
    { id: 4, name: "Shoes" },
    { id: 4, name: "Food" },
    { id: 5, name: "Others" },
  ];


  export const mockProducts = [
    {
      id: 4,
      title: "Classic Grey Hooded Sweatshirt",
      slug: "classic-grey-hooded-sweatshirt",
      price: 90,
      description:
        "Elevate your casual wear with our Classic Grey Hooded Sweatshirt...",
      category: {
        id: 1,
        name: "Clothes",
        slug: "clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
      },
      images: [
        "https://i.imgur.com/R2PN9Wq.jpeg",
        "https://i.imgur.com/IvxMPFr.jpeg",
        "https://i.imgur.com/7eW9nXP.jpeg",
      ],
      stock: 150,
      sku: "PROD001",
      discountPercentage: 10,
      rating: 4.5,
      creationAt: "2025-12-21T10:10:21.000Z",
      updatedAt: "2025-12-21T10:10:21.000Z",
    },
    {
      id: 5,
      title: "Wireless Bluetooth Headphones",
      slug: "wireless-bluetooth-headphones",
      price: 199,
      description: "Premium wireless headphones with noise cancellation...",
      category: {
        id: 2,
        name: "Electronics",
        slug: "electronics",
      },
      images: ["https://i.imgur.com/xyz123.jpeg"],
      stock: 75,
      sku: "PROD002",
      discountPercentage: 15,
      rating: 4.8,
      creationAt: "2025-12-21T10:10:21.000Z",
      updatedAt: "2025-12-21T10:10:21.000Z",
    },
  ];