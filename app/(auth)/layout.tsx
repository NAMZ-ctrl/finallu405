export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="relative self-center justify-self-center h-fit border-2 border-red-400 -top-1/2">{children}</section>
    </>
  );
}
