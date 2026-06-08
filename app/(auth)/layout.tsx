export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="self-center justify-self-center h-100 border-2 border-red-400">{children}</section>
    </>
  );
}
