import "dotenv/config";

export const sampleData = {
  products: [
    {
      slug: "genesis-sweatpants",
      name: "Genesis Sweatpants",
      description: "RELAxXED, STRAIGHT LEG FIT COTTON FLEECE FLOCK PRINT",
      price: 35000,
      discount: 0.0,
      images: [
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1779525386/photo_2026-05-23_09.34.38_ceyqup.jpg",
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1779525315/photo_2026-05-23_09.34.33_e7j5ww.jpg",
      ],
      guide:
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1779525387/photo_2026-05-23_09.34.46_ixxhxq.jpg",
      category: "sweatpants",
    },
  ],
};

console.log(process.env.DATABASE_URL);