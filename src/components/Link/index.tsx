import useResponsive from "@/hooks/useResponsive";
import { Link as MUILink, Typography } from "@mui/material";
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
        }}
        onClick={handleClick}
      >
        <Typography
          variant="body2"
          component="span"
          sx={{
            ml: 0.75,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {children}
        </Typography>
      </MUILink>
    </LinkContext.Provider>
  );
};

const LinkIcon = ({ icon }: LinkIconProps) => <>{icon}</>;

const LinkLabel = ({ children, hideOnMobile = true }: LinkLabelProps) => {
  const { isMobile } = useLinkContext();

  if (hideOnMobile && isMobile) return null;

  return <>{children}</>;
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
