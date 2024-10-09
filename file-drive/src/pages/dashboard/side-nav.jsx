/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";

export function SideNav() {
  return (
    <div className="w-40 flex flex-col gap-4">
      <NavLink
        to="/dashboard/files"
        className={({ isActive }) =>
          clsx("flex gap-2", { "text-blue-500": isActive })
        }
      >
        <Button variant="link" className="flex gap-2">
          <FileIcon /> All Files
        </Button>
      </NavLink>

      <NavLink
        to="/dashboard/favorites"
        className={({ isActive }) =>
          clsx("flex gap-2", { "text-blue-500": isActive })
        }
      >
        <Button variant="link" className="flex gap-2">
          <StarIcon /> Favorites
        </Button>
      </NavLink>

      <NavLink
        to="/dashboard/trash"
        className={({ isActive }) =>
          clsx("flex gap-2", { "text-blue-500": isActive })
        }
      >
        <Button variant="link" className="flex gap-2">
          <TrashIcon /> Trash
        </Button>
      </NavLink>
    </div>
  );
}
