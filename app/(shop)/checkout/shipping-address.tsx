"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Cart, InsertCart, ShippingAddressSchema } from "@/libs/validators";
import { SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { startTransition } from "react";
import { updateUserAddress } from "@/actions/user.action";

type ShippingAddress = z.infer<typeof ShippingAddressSchema>;

// reusable floating-label field wrapper
function Field({
  label,
  error,
  children,
  icon,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <div
        className={`relative flex items-center border rounded-lg bg-background transition-colors focus-within:border-foreground
          ${error ? "border-destructive" : "border-input"}`}
      >
        <div className="flex-1 px-3 pt-2 pb-1.5">
          <span className="block text-[11px] text-muted-foreground leading-none mb-1">
            {label}
          </span>
          {children}
        </div>
        {icon && (
          <div className="pr-3 text-muted-foreground shrink-0">{icon}</div>
        )}
      </div>
      {error && <p className="text-xs text-destructive px-1">{error}</p>}
    </div>
  );
}

// floating-label select
function SelectField({
  label,
  error,
  children,
  ...props
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="grid gap-1">
      <div
        className={`relative border rounded-lg bg-background transition-colors focus-within:border-foreground
          ${error ? "border-destructive" : "border-input"}`}
      >
        <span className="block text-[11px] text-muted-foreground leading-none pt-2 px-3 mb-1">
          {label}
        </span>
        <select
          className="w-full bg-transparent border-none outline-none text-sm text-foreground px-3 pb-1.5 appearance-none pr-8 cursor-pointer"
          {...props}
        >
          {children}
        </select>
        {/* chevron */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-destructive px-1">{error}</p>}
    </div>
  );
}

export default function ShippingAddressForm() {
  const form = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      email: "",
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      suite: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ShippingAddressSchema>> = async (data: ShippingAddress) => {
   startTransition(async () => {
    const res = await updateUserAddress(data);
    if (!res.success){
      console.log('error')
      return;
    }
    router.push('/payment-methid')
   })
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-lg mx-auto py-8 px-4 grid gap-8"
    >
      {/* Contact */}
      <section className="grid gap-3">
        <h2 className="text-lg font-medium">Contact</h2>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label="Email"
              error={fieldState.error?.message}
              icon={<CircleHelp className="size-4" />}
            >
              <input
                {...field}
                placeholder="you@example.com"
                className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </Field>
          )}
        />
      </section>

      {/* Delivery */}
      <section className="grid gap-3">
        <h2 className="text-lg font-medium">Delivery</h2>

        {/* country */}
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <SelectField
              label="Country / Region"
              error={fieldState.error?.message}
              {...field}
            >
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="UK">United Kingdom</option>
              <option value="US">United States</option>
            </SelectField>
          )}
        />

        {/* first + last name */}
        <div className="grid grid-cols-2 gap-3">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field label="First name" error={fieldState.error?.message}>
                <input
                  {...field}
                  placeholder="John"
                  className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field label="Last name" error={fieldState.error?.message}>
                <input
                  {...field}
                  placeholder="Doe"
                  className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </Field>
            )}
          />
        </div>

        {/* address */}
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field label="Address" error={fieldState.error?.message}>
              <input
                {...field}
                placeholder="123 Main St"
                className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </Field>
          )}
        />

        {/* suite — optional */}
        <Controller
          name="suite"
          control={form.control}
          render={({ field }) => (
            <Field label="Apartment, suite, etc. (optional)">
              <input
                {...field}
                className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </Field>
          )}
        />

        {/* city + state + postal */}
        <div className="grid grid-cols-3 gap-3">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field label="City" error={fieldState.error?.message}>
                <input
                  {...field}
                  placeholder="Lagos"
                  className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </Field>
            )}
          />
          <Controller
            name="state"
            control={form.control}
            render={({ field, fieldState }) => (
              <SelectField
                label="State"
                error={fieldState.error?.message}
                {...field}
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
                <option value="Oyo">Oyo</option>
              </SelectField>
            )}
          />
          <Controller
            name="postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                label="Postal code (optional)"
                error={fieldState.error?.message}
              >
                <input
                  {...field}
                  placeholder="100001"
                  className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </Field>
            )}
          />
        </div>

        {/* phone */}
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label="Phone"
              error={fieldState.error?.message}
              icon={<CircleHelp className="size-4" />}
            >
              <input
                {...field}
                placeholder="+234 800 000 0000"
                className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </Field>
          )}
        />

        {/* save checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded accent-foreground cursor-pointer"
          />
          <span className="text-sm">Save this information for next time</span>
        </label>
      </section>

      <Button type="submit" className="w-full h-11">
        Continue to payment
      </Button>
    </form>
  );
}
