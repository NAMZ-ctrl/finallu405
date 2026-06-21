import { email, z } from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  slug: z.string().min(3, "Product slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  description: z
    .number()
    .min(3, "Description must be at least 3 characters long"),
  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(1, "Discount cannot be more than 1"),
  price: z.number().min(0, "Price must be at least 0"),
  images: z.array(z.url()).min(1, "at least one image URL is required"),
});

export type ProductInterface = z.infer<typeof insertProductSchema>;

export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

// cart schema
export const cartSchema = z.object({
  productId: z.string().min(1, "id is required"),
  name: z.string().min(1, "name is required"),
  slug: z.string().min(1, "slug is required"),
  qty: z.string(),
  size: z.string().min(1, "size is required"),
  color: z.string().min(1, "color is required"),
  image: z.string().min(1, "Image is required"),
  price: z.string(),
});

export const insertCartSchema = z.object({
  items: z.array(cartSchema),
  itemsPrice: z.number(),
  totalPrice: z.number(),
  shippingPrice: z.number(),
  taxPrice: z.number(),
  sessionCartId: z.string().min(1, "session cart Id is required"),
  userId: z.string().optional().nullable(),
});

export type SignInInput = z.infer<typeof signInFormSchema>;
export type SignInError = z.core.$ZodFlattenedError<SignInInput>["fieldErrors"];
export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartError = z.core.$ZodFlattenedError<Cart>["fieldErrors"]
