/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";
import { useOrganization, useUser } from "@clerk/clerk-react";
// import { Doc } from "../../../../convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import Image from "next/image";
import { FileCardActions } from "./file-actions";

export function FileCard({
  file,
}) {
  // const userProfile = useQuery(api.users.getUserProfile, {
  //   userId: file.userId,
  // });

  // const { user } = useUser();
  // console.log('--------------------------------',user)
  // const { firstName, fullName, imageUrl } = user;
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  }

  const getIconForMimeType = (mimeType) => {
    if (mimeType.includes('image')) return typeIcons.image;
    if (mimeType.includes('pdf')) return typeIcons.pdf;
    if (mimeType.includes('csv')) return typeIcons.csv;
    return null; // or a default icon
  };

  const getTypeForMimeType = (mimeType) => {
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('csv')) return 'csv';
    return null; // or a default icon
  };
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{getIconForMimeType(file.mimetype)}</div>{" "}
          {file.title}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorite} file={file} id ={file._id}/>
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {getTypeForMimeType(file.mimetype) === "image" && file.path && (
          <img alt={file.title} width="200" height="100" src={file.path} />
        )}

        {getTypeForMimeType(file.mimetype) === "csv" && <GanttChartIcon className="w-20 h-20" />}
        {getTypeForMimeType(file.mimetype) === "pdf" && <FileTextIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user && imageUrl} />
            <AvatarFallback>{user && firstName}</AvatarFallback>
          </Avatar>
          {user && fullName}
        </div> */}
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file.uploadedAt), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
