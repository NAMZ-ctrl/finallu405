import {email, z} from "zod";

export const  insertProductSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    slug: z.string().min(3, "Product slug must be at least 3 characters long"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    description: z.number().min(3, "Description must be at least 3 characters long"),
    discount: z.number().min(0, "Discount must be at least 0").max(1, "Discount cannot be more than 1"),
    price: z.number().min(0, "Price must be at least 0"),
    images: z.array(z.url()).min(1, "at least one image URL is required")
})

export type ProductInterface = z.infer<typeof insertProductSchema>;

export const signInFormSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters")
})
export type SignInInput = z.infer<typeof signInFormSchema>
export type signInError = z.core.$ZodFlattenedError<SignInInput>["fieldErrors"]