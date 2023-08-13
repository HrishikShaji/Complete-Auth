import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <QueryProvider>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </QueryProvider>
      </ReduxProvider>
    </html>
  );
}
