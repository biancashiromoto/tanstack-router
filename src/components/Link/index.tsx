import useResponsive from "@/hooks/useResponsive";
import { Link as MUILink, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import { createContext, useContext } from "react";
import type {
  LinkContentProps,
  LinkContextType,
  LinkIconProps,
  LinkLabelProps,
  LinkRootProps,
} from "./index.types";

const LinkContext = createContext<LinkContextType | undefined>(undefined);

const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context)
    throw new Error("Link compound components must be used within Link.Root");
  return context;
};

const LinkRoot = ({ to, handleClick, children }: LinkRootProps) => {
  const { isMobile } = useResponsive();

  return (
    <LinkContext.Provider value={{ isMobile }}>
      <MUILink
        to={to}
        component={RouterLink}
        style={{
          textDecoration: "none",
          marginLeft: 0.75,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
        }}
        onClick={handleClick}
      >
        {children}
      </MUILink>
    </LinkContext.Provider>
  );
};

const LinkIcon = ({ icon }: LinkIconProps) => (
  <Box sx={{ fontSize: 20, lineHeight: 1 }}>{icon}</Box>
);

const LinkLabel = ({ children, hideOnMobile = true }: LinkLabelProps) => {
  const { isMobile } = useLinkContext();

  if (hideOnMobile && isMobile) return null;

  return <Typography variant="caption">{children}</Typography>;
};

const LinkContent = ({ children }: LinkContentProps) => {
  return <>{children}</>;
};

const Link = {
  Root: LinkRoot,
  Icon: LinkIcon,
  Label: LinkLabel,
  Content: LinkContent,
};

export default Link;
