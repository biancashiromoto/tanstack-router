export interface LinkContextType {
  isMobile: boolean;
}

export interface LinkRootProps {
  to: string;
  handleClick?: () => void;
  children: React.ReactNode;
}

export interface LinkIconProps {
  icon: React.ReactNode;
}

export interface LinkLabelProps {
  children: React.ReactNode;
  hideOnMobile?: boolean;
}

export interface LinkContentProps {
  children: React.ReactNode;
}