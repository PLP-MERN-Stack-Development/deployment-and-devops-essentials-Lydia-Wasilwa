import Navbar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">{children}</main>
    </>
  );
}
