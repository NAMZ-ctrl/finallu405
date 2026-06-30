import { coerce, email, z } from "zod";

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
  qty: z.coerce.number(),
  size: z.string().min(1, "size is required"),
  color: z.string().min(1, "color is required"),
  image: z.string().min(1, "Image is required"),
  price: z.coerce.number(),
});

export const insertCartSchema = z.object({
  items: z.array(cartSchema),
  itemsPrice: z.coerce.number(),
  totalPrice: z.coerce.number(),
  shippingPrice: z.coerce.number(),
  taxPrice: z.coerce.number(),
  sessionCartId: z.string().min(1, "session cart Id is required"),
  userId: z.string().optional().nullable(),
});

// shipping address schema

export const ShippingAddressSchema = z.object({
  email: z.email('email is required'),
  country: z.string().min(1, 'country is required'),
  firstName: z.string().min(1, 'name must be at least one character'),
  lastName: z.string().min(1, 'country is required'),
  address: z.string().min(1, 'address is required'),
  suite: z.string().optional(),
  city: z.string().min(1, 'city must be at least one character'),
  state: z.string().min(1, 'state must be at least one character'),
  postalCode: z.string().min(2, "must at least be two characters"),
  phoneNumber: z.string().min(2, "must at least be two characters")
})

// signing up 
export const SignUpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('email is not valid'),
  password: z.string().min(3, 'password must be at least 6 characters'),
  confirmPassword: z.string().min(3, 'password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {message: 'password does not match', path: ['confirmPassword']});

export type SignInInput = z.infer<typeof signInFormSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignUpError = z.core.$ZodFlattenedError<SignUpInput>["fieldErrors"];
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type SignInError = z.core.$ZodFlattenedError<SignInInput>["fieldErrors"];
export type ShippingAddressError = z.core.$ZodFlattenedError<ShippingAddress>["fieldErrors"]
export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartError = z.core.$ZodFlattenedError<Cart>["fieldErrors"]
export type InsertCartError = z.core.$ZodFlattenedError<InsertCart>["fieldErrors"];
