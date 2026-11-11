require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoMerchant = {
  id: "1",
  name: "Piece & Parcel",
  description: "A thoughtful collection of jigsaw puzzles for every kind of puzzler.",
  phone: "",
  address: "",
  status: "ACTIVE",
};

const demoCategories = [
  { id: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e", name: "500-piece-puzzles" },
  { id: "659a91b9-3ff6-47d5-9830-5e7ac905b961", name: "1000-piece-puzzles" },
  { id: "6c3b8591-b01e-4842-bce1-2f5585bf3a28", name: "kids-puzzles" },
  { id: "d30b85e2-e544-4f48-8434-33fe0b591579", name: "nature-puzzles" },
  { id: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24", name: "british-scenes" },
  { id: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b", name: "family-puzzles" },
];

const retiredDemoCategoryIds = [
  "7a241318-624f-48f7-9921-1818f6c20d85",
  "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb",
  "782e7829-806b-489f-8c3a-2689548d7153",
  "a6896b67-197c-4b2a-b5e2-93954474d8b4",
  "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
  "8d2a091c-4b90-4d60-b191-114b895f3e54",
  "da6413b4-22fd-4fbb-9741-d77580dfdcd5",
  "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
  "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
];

const demoProducts = [
  {
    id: "1",
    title: "Hillside Cottage",
    price: 18,
    rating: 5,
    description: "A stone cottage tucked among rolling green hills in a relaxing 500-piece jigsaw.",
    mainImage: "puzzle-dales.svg",
    slug: "hillside-cottage-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[0].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "2",
    title: "Wildflower Meadow",
    price: 22,
    rating: 5,
    description: "Gather up the colours of a summer meadow in this cheerful 500-piece jigsaw.",
    mainImage: "puzzle-garden.svg",
    slug: "wildflower-meadow-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[0].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "3",
    title: "Cottage in the Dales",
    price: 25,
    rating: 5,
    description: "A stone cottage tucked among rolling green hills in a detailed 1000-piece jigsaw.",
    mainImage: "puzzle-dales.svg",
    slug: "cottage-in-the-dales-1000-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[1].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "4",
    title: "The Garden in Bloom",
    price: 28,
    rating: 4,
    description: "A peaceful garden filled with colour, ready to come together one piece at a time.",
    mainImage: "puzzle-garden.svg",
    slug: "the-garden-in-bloom-1000-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[1].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "5",
    title: "Dinosaur Discovery",
    price: 12,
    rating: 5,
    description: "Friendly dinosaurs and big, bright shapes make this a fun first jigsaw for little puzzlers.",
    mainImage: "puzzle-kids.svg",
    slug: "dinosaur-discovery-kids-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[2].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "6",
    title: "A Day Under the Sea",
    price: 16,
    rating: 4,
    description: "Dive into a colourful underwater scene made for curious young minds.",
    mainImage: "puzzle-kids.svg",
    slug: "a-day-under-the-sea-kids-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[2].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "7",
    title: "Among the Pine Trees",
    price: 24,
    rating: 5,
    description: "Follow woodland paths and meet a friendly fox in this nature-inspired jigsaw.",
    mainImage: "puzzle-woodland.svg",
    slug: "among-the-pine-trees-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[3].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "8",
    title: "The Quiet Coast",
    price: 28,
    rating: 5,
    description: "A little lighthouse watches over the sea in this calming 1000-piece puzzle.",
    mainImage: "puzzle-coast.svg",
    slug: "the-quiet-coast-1000-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[3].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "9",
    title: "Postcards from the Coast",
    price: 21,
    rating: 4,
    description: "A bright coastal scene that brings a little seaside air to the puzzle table.",
    mainImage: "puzzle-coast.svg",
    slug: "postcards-from-the-coast-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[4].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "10",
    title: "Village Green",
    price: 27,
    rating: 5,
    description: "An inviting village scene full of small details to discover as the picture takes shape.",
    mainImage: "puzzle-dales.svg",
    slug: "village-green-1000-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[4].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "11",
    title: "Sunday at Home",
    price: 19,
    rating: 5,
    description: "A cosy, colourful scene to share around the table with family and friends.",
    mainImage: "puzzle-garden.svg",
    slug: "sunday-at-home-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[5].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
  {
    id: "12",
    title: "A Walk in the Woods",
    price: 23,
    rating: 4,
    description: "Take a peaceful woodland wander together with this family-friendly jigsaw.",
    mainImage: "puzzle-woodland.svg",
    slug: "a-walk-in-the-woods-500-piece-jigsaw",
    manufacturer: "Piece & Parcel",
    categoryId: demoCategories[5].id,
    inStock: 1,
    merchantId: demoMerchant.id,
  },
];

async function insertDemoData() {
  await prisma.$transaction(async (transaction) => {
    await transaction.merchant.upsert({
      where: { id: demoMerchant.id },
      create: demoMerchant,
      update: {
        name: demoMerchant.name,
        description: demoMerchant.description,
        status: demoMerchant.status,
      },
    });

    for (const category of demoCategories) {
      await transaction.category.upsert({
        where: { id: category.id },
        create: category,
        update: { name: category.name },
      });
    }

    for (const product of demoProducts) {
      await transaction.product.upsert({
        where: { id: product.id },
        create: product,
        update: product,
      });
    }

    await transaction.category.deleteMany({
      where: {
        id: { in: retiredDemoCategoryIds },
        products: { none: {} },
      },
    });
  });

  console.log("Piece & Parcel puzzle catalog inserted successfully.");
}

insertDemoData()
  .catch((error) => {
    console.error("Failed to seed the puzzle catalog:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
