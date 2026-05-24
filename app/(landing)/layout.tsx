export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
