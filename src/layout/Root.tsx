import { ToggleTheme } from "@/components/theme/ToggleTheme";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <ToggleTheme />
      <Outlet />
    </>
  );
};
export default Root;
