import "dotenv/config";
import {hashSync} from "bcrypt-ts-edge"

export const sampleData = {
  users: [
    {
      name: "ayo",
      email: "adewoyenifemi8@gmail.com",
      password: hashSync("password", 10),
      role: "admin"
    },
    {
      name: "Nifemi",
      email: "oadewoye.2200315@stu.cu.edu.ng",
      password: hashSync("password", 10),
      role: "user"
    }
  ],
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
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1780353148/photo_2026-06-01_23.31.18_mqrc1i.jpg",
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1780353148/photo_2026-06-01_23.31.15_hgwdrb.jpg"
      ],
      guide:
        "https://res.cloudinary.com/dzbxigocr/image/upload/v1779525387/photo_2026-05-23_09.34.46_ixxhxq.jpg",
      category: "sweatpants",
      sizes: [
        { name: "XS", quantity: 500 },
        { name: "S", quantity: 500 },
        { name: "M", quantity: 500 },
        { name: "L", quantity: 500 },
        { name: "XL", quantity: 500 },
      ],
      colors: [
        {hexCode: "#000000", color: 'black', image:["https://res.cloudinary.com/dzbxigocr/image/upload/v1779525386/photo_2026-05-23_09.34.38_ceyqup.jpg"]},
        {hexCode:"#D3D3D3", color: 'light gray', image:["https://res.cloudinary.com/dzbxigocr/image/upload/v1779525315/photo_2026-05-23_09.34.33_e7j5ww.jpg"]}
      ]
    },
  ],
};
