import AuthProvider from "@/components/content-manager/AuthProvider";
import { ConditionalLayout } from "@/components/content-manager/ConditionalLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ConditionalLayout>{children}</ConditionalLayout>
    </AuthProvider>
  );
}
