"use client";
// import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Image from "next/image";
import { useUser } from "@/lib/UserContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/",
    alt: "logo",
    title: "Events",
  },
  menu = [
    // { title: "Home", url: "#" },
    // {
    //   title: "Pricing",
    //   url: "#",
    // },
    // {
    //   title: "Blog",
    //   url: "#",
    // },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  const { user } = useUser();
  return (
    <section className="p-4">
      <div className="">
        {/* Desktop Menu */}
        <nav className=" justify-between items-center flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {user ? (
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>{user.name && user.name[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button asChild size="sm">
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {/* <div className="block lg:hidden">
          <div className="flex items-center justify-between">
          
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                height={32}
                width={32}
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image
                        height={32}
                        width={32}
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div> */}
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export { Navbar };
