import type { ReactNode } from "react";
import Footer from "./Footer";
import TerminalHeader from "./TerminalHeader";

export default function PageContainer({
  children,
  className = "",
  customHeader,
}: {
  children: ReactNode;
  className?: string;
  customHeader?: ReactNode;
}) {
  return (
    <div className={`terminal ${className}`.trim()}>
      {customHeader !== undefined ? customHeader : <TerminalHeader />}
      {children}
      <Footer />
    </div>
  );
}
