export default function ProductFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <div className="flex justify-between max-sm:flex-col max-sm:gap-3">
          <div>
            <h2 className="uppercase font-extrabold text-2xl">Join the Familia!</h2>
            <div className="flex gap-3">
              <span>&copy;{currentYear} 405</span>
              <span className="uppercase">terms and policies</span>
            </div>
          </div>
          <form action="">
            <input type="email" placeholder="Email address" />
          </form>
        </div>
      </footer>
    </>
  );
}
