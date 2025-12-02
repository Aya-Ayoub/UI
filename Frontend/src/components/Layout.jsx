import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}
