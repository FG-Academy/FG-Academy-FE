import { Footer } from "@/3.widgets/footer";
import { Header } from "@/3.widgets/header";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
};
