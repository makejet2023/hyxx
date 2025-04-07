import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { scenes } from "@/data/scenes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essential Chinese for Travelers",
  description: "Learn essential Chinese phrases for common travel situations in China",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex">
          {/* 左侧菜单 */}
          <div className="w-64 bg-white shadow-md fixed h-screen overflow-y-auto">
            <div className="p-4">
              <h1 className="text-xl font-bold mb-6">Learning Scenes</h1>
              <nav className="space-y-2">
                {scenes.map((scene) => (
                  <Link
                    key={scene.id}
                    href={`/scenes/${scene.id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{scene.icon}</span>
                      <span>{scene.titleEn}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="flex-1 ml-64">
            <main className="max-w-[1920px] mx-auto px-8 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
} 