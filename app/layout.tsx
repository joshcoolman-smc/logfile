import "./globals.css";
import { Nunito_Sans, Zilla_Slab } from "next/font/google";
import { ThemeScript } from "./components/theme-script";
import { ThemeProvider } from "./components/theme-provider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

export const metadata = {
  title: "log file",
  description: "A markdown blog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${zillaSlab.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
