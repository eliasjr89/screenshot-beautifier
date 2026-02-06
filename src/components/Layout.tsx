import { LayoutProps } from "../types/global";

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout-container">{children}</div>;
};

export default Layout;
