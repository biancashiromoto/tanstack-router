import useResponsive from "@/hooks/useResponsive";
import { Box, Link as MUILink, Typography } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import { createContext, memo, useContext } from "react";
import type {
  LinkContentProps,
  LinkContextType,
  LinkIconProps,
  LinkLabelProps,
  LinkRootProps,
} from "./index.types";

const LinkContext = createContext<LinkContextType | undefined>(undefined);

const LinkRoot = memo(({ to, handleClick, children }: LinkRootProps) => {
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
});

LinkRoot.displayName = "LinkRoot";

const LinkIcon = memo(({ icon }: LinkIconProps) => (
  <Box sx={{ fontSize: 20, lineHeight: 1 }}>{icon}</Box>
));

LinkIcon.displayName = "LinkIcon";

const LinkLabel = memo(({ children, hideOnMobile }: LinkLabelProps) => {
  const context = useContext(LinkContext);
  const isMobile = context?.isMobile || false;

  if (hideOnMobile && isMobile) {
    return null;
  }

  return <Typography variant="caption">{children}</Typography>;
});

LinkLabel.displayName = "LinkLabel";

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
