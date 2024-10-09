/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";

export function UploadButton() {
  const { user } = useUser();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const userId = user?.id
  const fileRef = form.register("file");

  // async function onSubmit(values) {
  //   try {
  //     // Replace this with the actual endpoint to get the upload URL
  //     // const postUrl = await fetch('/api/generate-upload-url').then(res => res.text());

  //     const apiUrl = 'http://localhost:8000/api/files/upload'

  //     const fileType = values.file[0].type;
      
  //     // Upload file
  //     const result = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: { "Content-Type": fileType },
  //       body: values.file[0],
  //     });
      
  //     if (!result.ok) {
  //       throw new Error('File upload failed');
  //     }        

  //     const { storageId } = await result.json();

  //     // Replace with the actual method to create a file record
  //     // await fetch('/api/files/create', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   body: JSON.stringify({
  //     //     name: values.title,
  //     //     fileId: storageId,
  //     //   }),
  //     // });

  //     form.reset();
  //     setIsFileDialogOpen(false);

  //     // Display success message
  //     alert('File uploaded successfully');
  //   } catch (err) {
  //     // Display error message
  //     alert('Error uploading file: ' + err.message);
  //   }
  // }

  async function onSubmit(values) {
    try {
        const apiUrl = 'http://localhost:8000/api/files/upload';

        const formData = new FormData();
        formData.append('file', values.file[0]);
        formData.append('title', values.title);
        formData.append('userId',userId );

        
        const result = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!result.ok) {
            throw new Error('File upload failed');
        }

        const response = await result.json();

        // Optionally handle the response here if needed
        // const { storageId } = response;

        // Reset the form and close the dialog
        form.reset();
        setIsFileDialogOpen(false);

        // Display success message
        alert('File uploaded successfully');
        toast({
          variant: "success",
          title: "File Uploaded",
          description: "Now everyone can view your file",
        });
    } catch (err) {
        // Display error message
        alert('Error uploading file: ' + err.message);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Your file could not be uploaded, try again later",
        });
    }
}


  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>
            This file will be accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
