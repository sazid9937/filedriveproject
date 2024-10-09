/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useOrganization, useUser } from "@clerk/clerk-react";
// import { useQuery } from "convex/react";
import { UploadButton } from "./dashboard/_components/upload-button";
import { FileCard } from "./dashboard/_components/file-card";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { SearchBar } from "./dashboard/_components/search-bar";
import { useState, useEffect } from "react";
import { DataTable } from "./dashboard/_components/file-table";
import { formatRelative } from "date-fns";
import { columns } from "./dashboard/_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from '@/pages/Dashboard/_components/file-actions'

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <img
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <div className="text-2xl">You have no files, upload one now</div>

    </div>
  );
}

export function Dashboard({
  title,
  favoritesOnly,
  deletedOnly,
}) {
  const organization = useOrganization();
  const user = useUser();
  const userId = user.user?.id

  const [query, setQuery] = useState("");
  const [type, setType] = useState('all');
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState([]);




  let orgId = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  //   const favorites = useQuery(
  //     api.files.getAllFavorites,
  //     orgId ? { orgId } : "skip"
  //   );

  //   const files = useQuery(
  //     api.files.getFiles,
  //     orgId
  //       ? {
  //           orgId,
  //           type: type === "all" ? undefined : type,
  //           query,
  //           favorites: favoritesOnly,
  //           deletedOnly,
  //         }
  //       : "skip"
  //   );
  //   const isLoading = files === undefined;

  //   const modifiedFiles =
  //     files?.map((file) => ({
  //       ...file,
  //       isFavorited: (favorites ?? []).some(
  //         (favorite) => favorite.fileId === file._id
  //       ),
  //     })) ?? [];

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/getfiles/';
    const fetchFileData = async () => {
      const userId = user.user?.id
      try {
        setIsLoading(true)
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFileData(data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching files:', error);
        setIsLoading(false)
      }
    };

    fetchFileData();
  }, []);



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

  useEffect(() => {
    // Filter the files based on the dropdown filter and the search query
    const searchResults = fileData.filter(file => {
      const matchesType = type === 'all' || file.mimetype.includes(type);
      const matchesQuery = file?.title?.toLowerCase().includes(query.toLowerCase());

      return matchesType && matchesQuery;
    });

    setFilteredFiles(searchResults);
  }, [query, type, fileData]);



  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>

        <SearchBar query={query} setQuery={setQuery} />

        {deletedOnly || favoritesOnly ? '' : <UploadButton />}
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {favoritesOnly && (
          <>
            {filteredFiles?.length === 0 ? (
              <div className="flex flex-col gap-8 w-full items-center mt-24">
                <img
                  alt="an image of a picture and directory icon"
                  width="300"
                  height="300"
                  src="/empty.svg"
                />
                <div className="text-2xl">You have no favorites, add one now</div>
              </div>
            ) : (
              <>
                <TabsContent value="grid">
                  <div className="grid grid-cols-3 gap-4">
                    {filteredFiles
                      ?.filter(file => file.isFavorite && !file.isTrash) // Show only files with isFavorite === true
                      .map(file => (
                        <FileCard key={file._id} file={file} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="table">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        {columns.map(column => (
                          <th key={column.accessorKey} className="text-left p-4">{column.header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFiles?.filter(file => file.isFavorite && !file.isTrash).map(file => (
                        <tr key={file._id}>
                          <td className="p-4">{file.title}</td>
                          <td className="p-4">{file.mimetype}</td>
                          <td className="p-4">
                            <UserCell userId={file.userId} />
                          </td>
                          <td className="p-4">
                            {formatRelative(new Date(file.uploadedAt), new Date())}
                          </td>
                          <td className="p-4">
                            <FileCardActions file={file} isFavorited={file.isFavorite} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
              </>

            )}
          </>
        )}

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}
        {(!favoritesOnly && !deletedOnly) && (
          <>
          <TabsContent value="grid">
            <div className="grid grid-cols-3 gap-4">
              {filteredFiles
                ?.filter(file => !file.isFavorite && !file.isTrash)
                .map(file => (
                  <FileCard key={file._id} file={file} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
          <table className="min-w-full">
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.accessorKey} className="text-left p-4">{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredFiles?.filter(file => !file.isFavorite && !file.isTrash).map(file => (
                <tr key={file._id}>
                  <td className="p-4">{file.title}</td>
                  <td className="p-4">{file.mimetype}</td>
                  <td className="p-4">
                    <UserCell userId={file.userId} />
                  </td>
                  <td className="p-4">
                    {formatRelative(new Date(file.uploadedAt), new Date())}
                  </td>
                  <td className="p-4">
                    <FileCardActions file={file} isFavorited={file.isFavorite} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        </>
        )}

        {deletedOnly && (
          <>
          <TabsContent value="grid">
            <div className="grid grid-cols-3 gap-4">
              {filteredFiles
                ?.filter(file => file.isTrash && !file.isFavorite)
                .map(file => (
                  <FileCard key={file._id} file={file} />
                ))}
            </div>
          </TabsContent>
           <TabsContent value="table">
           <table className="min-w-full">
             <thead>
               <tr>
                 {columns.map(column => (
                   <th key={column.accessorKey} className="text-left p-4">{column.header}</th>
                 ))}
               </tr>
             </thead>
             <tbody>
               {filteredFiles?.filter(file => !file.isFavorite && file.isTrash).map(file => (
                 <tr key={file._id}>
                   <td className="p-4">{file.title}</td>
                   <td className="p-4">{file.mimetype}</td>
                   <td className="p-4">
                     <UserCell userId={file.userId} />
                   </td>
                   <td className="p-4">
                     {formatRelative(new Date(file.uploadedAt), new Date())}
                   </td>
                   <td className="p-4">
                     <FileCardActions file={file} isFavorited={file.isFavorite} />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </TabsContent>
         </>
        )}
      </Tabs>
      {fileData?.length === 0 && <Placeholder />}

    </div>
  );
}
