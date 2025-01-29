"use client";
import { cn } from "@/lib/utils";
import {
  ArrowLeftToLine,
  Bolt,
  ChevronsUpDown,
  History,
  House,
  Package,
  PanelsTopLeft,
  ScanBarcode,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Dispatch, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teko } from "@/lib/fonts";
import { logout } from "@/actions/auth";
import { User } from "@/types/user";
import { useUserStore } from "@/providers/UserProvider";

const menuList = [
  {
    name: "Dashboard",
    href: "/",
    icon: <House size={20} />,
  },
  {
    name: "Cashier",
    href: "/cashier",
    icon: <ScanBarcode size={20} />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <Package size={20} />,
  },
  {
    name: "History",
    href: "/history",
    icon: <History size={20} />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Bolt size={20} />,
  },
];

const authPaths = ["/login", "/register", "/forgot-password"];

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const { user, setUser } = useUserStore((state) => state);
  const pathname = usePathname();

  const isPathStartWithAuthPaths = authPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPathStartWithAuthPaths) {
    return null;
  }

  return (
    <nav
      className={cn(
        "bg-card max-w-[55%] px-3 py-5 rounded-lg shadow h-screen md:relative flex flex-col",
        open
          ? "w-full absolute left-0 top-0 bottom-0 z-50 md:relative md:w-[250px]"
          : "w-fit"
      )}
    >
      <Header open={open} setOpen={setOpen} />
      <MenuList open={open} pathname={pathname} />
      <AvatarMenu open={open} user={user} setUser={setUser} />
    </nav>
  );
}

function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<boolean>;
}) {
  return (
    <div
      className={cn(
        open ? "px-3 justify-between" : "px-0 justify-center",
        "flex items-center"
      )}
    >
      {open && (
        <Link href="/" className={cn("text-2xl font-medium", teko.className)}>
          ZenPOS
        </Link>
      )}
      <Button
        variant={open ? "outline" : "default"}
        onClick={() => setOpen(!open)}
      >
        {open ? <ArrowLeftToLine size={20} /> : <PanelsTopLeft size={20} />}
      </Button>
    </div>
  );
}

function MenuList({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <ul className="mt-10 space-y-1">
      {menuList.map((menu) => (
        <li key={menu.name}>
          <Link
            href={menu.href}
            className={cn(
              "flex items-center gap-2 py-3 transition rounded-md hover:bg-muted text-sm",
              open ? "justify-start px-4" : "justify-center",
              pathname === menu.href && "bg-muted"
            )}
          >
            {menu.icon}
            {open && menu.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AvatarMenu({
  open,
  user,
  setUser,
}: {
  open: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();

    if (!res.success) {
      console.error(res.data);
    }

    setUser(null);

    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-3 mt-auto mb-5 hover:bg-muted transition rounded-md py-2 px-3"
        )}
      >
        <Avatar className="rounded-lg">
          <AvatarImage src={user.photo_url ?? ""} alt="picture" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        {open && (
          <div className="w-full flex justify-between items-center">
            <div className="text-sm flex flex-col text-start">
              <span className="font-semibold capitalize">
                {user.first_name} {user.last_name}
              </span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
            <ChevronsUpDown size={18} />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
