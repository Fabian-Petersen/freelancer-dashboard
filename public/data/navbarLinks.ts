import {
  DollarSign,
  File,
  FileText,
  Home,
  Info,
  LogOut,
  LucideIcon,
  Settings,
  User2,
  Users,
} from "lucide-react";

export type NavItemProps = {
  name: string;
  icon: LucideIcon;
  url: string;
};

export type PreferencesLinksProps = {
  name: string;
  icon: LucideIcon;
  url: string;
};

export type AuthLinks = {
  name: string;
  icon: LucideIcon;
};

export const navbarLinks: NavItemProps[] = [
  { name: "dashboard", icon: Home, url: "/dashboard" },
  { name: "Contact Info", icon: Info, url: "/info" },
  { name: "Customer List", icon: Users, url: "/customers" },
  { name: "Tax Report", icon: FileText, url: "/tax" },
  { name: "Billing", icon: DollarSign, url: "/billing" },
  { name: "Services", icon: File, url: "/services" },
] as const;

export const PreferencesLinks: PreferencesLinksProps[] = [
  { name: "Settings", icon: Settings, url: "/settings" },
  { name: "Profile", icon: User2, url: "profile" },
];

export const AuthLinks: AuthLinks[] = [{ name: "Logout", icon: LogOut }];
