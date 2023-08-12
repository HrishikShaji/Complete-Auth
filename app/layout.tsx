import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </QueryProvider>
    </html>
  );
}
