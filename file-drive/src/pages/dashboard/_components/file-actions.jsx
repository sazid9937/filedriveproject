/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import { toast } from 'react-toastify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
// import { Protect } from "@clerk/nextjs";

export function FileCardActions({ file, isFavorited , id }) {
  
  // const deleteFile = useMutation(api.files.deleteFile);
  // const restoreFile = useMutation(api.files.restoreFile);
  // const toggleFavorite = useMutation(api.files.toggleFavorite);
  const { toast } = useToast();
  // const me = useQuery(api.users.getMe);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmRestoreOpen, setIsConfirmRestoreOpen] = useState(false);

  const isTrash = file.isTrash

  const toggleFavorite = async(isFavorited) => {
    
    try {
      const response = await fetch(`http://localhost:8000/api/setfiles/${id}/favorite`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isFavorite: !isFavorited})
      });
      if (response.ok) {
          // Update the UI or state to reflect the change
          console.log('File marked as favorite');
          alert('File marked as favorite')
      } else {
          console.error('Failed to mark as favorite');
          alert('Failed to mark as favorite')
      }
  } catch (error) {
      console.error('Error:', error);
  }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isTrash: !isTrash }),
      });
      if (response.ok) {
        console.log('File successfully trashed')
        // toast({ title: 'File deleted successfully!', description: '', variant: 'success' });
        alert('File deleted successfully!')
      } else {
        console.error('Failed to trash');
        toast({ title: 'Failed to delete file', description: '', variant: 'error' });
        alert('Failed to delete file')
      }
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Error deleting file', description: '', variant: 'error' });
      alert('Error deleting file')
    } finally {
      setIsConfirmOpen(false);
    }
  };


  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isConfirmRestoreOpen} onOpenChange={setIsConfirmRestoreOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Retore</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to Retore this file?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmRestoreOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              if (!file.path) return;
              window.open(file.path, "_blank");
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <FileIcon className="w-4 h-4" /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              toggleFavorite(isFavorited);
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            {isFavorited ? (
              <div className="flex gap-1 items-center">
                <StarIcon className="w-4 h-4" /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <StarHalf className="w-4 h-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>

          {/* <Protect
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === 'me'
              );
            }}
            fallback={<></>}
          > */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-1 items-center cursor-pointer"
            >
              {file.isTrash ? (
                <div className="flex gap-1 text-green-600 items-center cursor-pointer"onClick={() =>setIsConfirmRestoreOpen(true)}>
                  <UndoIcon className="w-4 h-4" /> Restore
                </div>
              ) : (
                <div className="flex gap-1 text-red-600 items-center cursor-pointer" onClick={() =>setIsConfirmOpen(true)}>
                  <TrashIcon className="w-4 h-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          {/* </Protect>  */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
