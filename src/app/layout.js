import "./globals.css";

export const metadata = {
  title: "The Chart",
  description: "from the gayest show on TV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
