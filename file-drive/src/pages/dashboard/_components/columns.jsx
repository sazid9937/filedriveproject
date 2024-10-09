/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { formatRelative } from "date-fns";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";
import { useOrganization, useUser } from "@clerk/clerk-react";

function UserCell({ userId }) {
  // const userProfile = useQuery(api.users.getUserProfile, { userId });

  
  const { user } = useUser();
  const { firstName, fullName, imageUrl } = user;

  if (!userId) {
    return (
      <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
        <Avatar className="w-6 h-6">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
      <Avatar className="w-6 h-6">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{firstName || "CN"}</AvatarFallback>
      </Avatar>
      {fullName}
    </div>
  );
}

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    },
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div>
          {/* {formatRelative(new Date(fileData.uploadedAt), new Date())} */}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <FileCardActions
          file={row.original}
          isFavorited={row.original.isFavorited}
        />
      );
    },
  },
];
