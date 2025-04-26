// src\app\components\Navbar.tsx

"use client";

import Link from "next/link";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";

type NavbarMenuItem = MenuItem & {
  label?: string;
  badge?: number | string;
  shortcut?: string;
};

export default function Navbar() {
  const items: NavbarMenuItem[] = [];

  const start = (
    <Link href="/" passHref>
      <Button className="text-6xl" label="Streamia" text />
    </Link>
  );
  const end = (
    <div className="align-items-center flex gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Button icon="pi pi-user" rounded aria-label="User" />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
