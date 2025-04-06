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
  isActive?: boolean;
};

export type PreferencesLinksProps = {
  name: string;
  icon: LucideIcon;
};

export type AuthLinks = {
  name: string;
  icon: LucideIcon;
};

export const navbarLinks: NavItemProps[] = [
  { name: "dashboard", icon: Home, isActive: true },
  { name: "Contact Info", icon: Info, isActive: false },
  { name: "My Team", icon: Users, isActive: false },
  { name: "Tax Report", icon: FileText, isActive: false },
  { name: "Billing", icon: DollarSign, isActive: false },
  { name: "Connected Services", icon: File, isActive: false },
] as const;

export const PreferencesLinks: PreferencesLinksProps[] = [
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User2 },
];

export const AuthLinks: AuthLinks[] = [{ name: "Logout", icon: LogOut }];
