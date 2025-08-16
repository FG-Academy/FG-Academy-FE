import { Footer } from "@/3.Widgets/Footer";
import { Header } from "@/3.Widgets/Header";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col w-100 min-h-screen">
      <Header />
      <main className="flex-auto overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
};
