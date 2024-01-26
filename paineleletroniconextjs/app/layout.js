import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Painel Eletrônico Plenário - SAPL",
  description: "Processo Eletrônico Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
      
    </html>
  );
}
