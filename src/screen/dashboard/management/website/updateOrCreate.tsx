import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import useAuthStore from "@/store/feature/authStand";
import { useNavigate, useParams } from "react-router";
import { WEB_TYPE } from "@/constant/webType";
import { getAllWebRoute } from "@/services/webRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWebsiteSection, getWebsiteSectionById, updateWebsiteSection } from "@/services/website";
import LoadingSolder from "@/components/loading-solder";

// Schema for form validation
const formSchema = z.object({
  show: z.boolean().optional(),
  url: z.string().min(1, "URL is required"),
  type: z.number().min(1),
  content: z.array(
    z.object({
      column1: z.string().min(1, "Column 1 is required"),
      column2: z.string().optional(), // Changed to optional string, we'll handle files separately
      items: z
        .array(
          z.object({
            title: z.string().min(1, "Title is required"),
            value: z.string().min(1, "Value is required"),
          })
        )
        .optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateOrCreateWebsite({actionType}: {actionType: "create" | "update"}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { websiteId } = useParams();
  const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});
  const { accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  const form = useForm<FormValues>({
    defaultValues: {
      type: 1,
      show: true,
      url: "",
      content: [
        {
          column1: "",
          column2: "",
          items: [],
        },
      ],
    },
  });
  
  const { data: urlData, isLoading: urlLoading, error: urlError } = useQuery({
    queryKey: ["url"],
    queryFn: async () => {
      try {
        const response = await getAllWebRoute(accessToken || '');
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.error || "Failed to fetch URLs");
        }
      } catch (error) {
        throw error;
      }
    },
  });
  
  // Query for getting website section data when updating
  useQuery({
    queryKey: ["website", websiteId],
    queryFn: async () => {
      const response = await getWebsiteSectionById(accessToken || '', websiteId || '');
      
      if (response.success && response.data) {
        const { type, show, routeId, content } = response.data;
        
        // Reset form with the basic common values
        form.reset({
          type,
          show,
          url: routeId,
          content: [{ column1: "", column2: "", items: [] }] // Start with default structure
        });
        
        // Now handle the type-specific content
        switch (type) {
          case 1:
          case 2:
          case 3: {
            const titleObj = content.find((c: any) => c.type === 'text');
            const imageObj = content.find((c: any) => c.type === 'image');
            
            // Update the first content item
            form.setValue("content.0.column1", titleObj?.value || '');
            form.setValue("content.0.column2", imageObj?.image || '');
            break;
          }
          
          case 4: {
            const header = content.find((c: any) => c.type === 'header');
            const description = content.find((c: any) => c.type === 'description');
            
            // For type 4, we set the title and description in column1 and column2
            form.setValue("content.0.column1", header?.value || '');
            form.setValue("content.0.column2", description?.value || '');
            form.setValue("content.0.items", undefined);
            break;
          }
          
          case 5:
          case 6: {
            const header = content.find((c: any) => c.type === 'header');
            const description = content.find((c: any) => c.type === 'description');
            const itemsData = content.find((c: any) => c.type === 'item')?.children || [];
            
            // Set the section title and description
            form.setValue("content.0.column1", header?.value || '');
            form.setValue("content.0.column2", description?.value || '');
            
            // Set the items data
            if (itemsData.length > 0) {
              const formattedItems = itemsData.map((item: any) => ({
                title: item.title || '',
                value: item.value || ''
              }));
              
              form.setValue("content.0.items", formattedItems);
            }
            break;
          }
          
          default:
            console.warn("Unknown type", type);
            break;
        }
      }
      
      return response.data;
    },
    enabled: !!websiteId && actionType === "update",
    staleTime: 0,
  });
  
  const { mutate: handleUpdateWebsiteSection, isPending: isUpdating } = useMutation({
    mutationFn: async (data: any) => {
      const response = await updateWebsiteSection(accessToken || '', websiteId || '', data);
      if (response.success) {
        toast.success("Website section updated successfully");
        queryClient.invalidateQueries({ queryKey: ["website-sections"] });
        navigate("/apps/management/website");
      } else {
        toast.error(response.error);
      }
    }
  });

  const { mutate: handleCreateWebsiteSection, isPending: isCreating } = useMutation({
    mutationFn: async (data: any) => {
      const response = await createWebsiteSection(accessToken || '', data);
      if (response.success) {
        toast.success("Website section created successfully");
        queryClient.invalidateQueries({ queryKey: ["website-sections"] });
        navigate("/apps/management/website");
      } else {
        toast.error(response.error);
      }
    }
  });

  const isPending = isCreating || isUpdating || isLoading;

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const currentType = form.watch("type");

  useEffect(() => {
    const currentContent = form.getValues("content");

    if (currentType <= 4) {
      if (currentContent.length > 1) {
        for (let i = currentContent.length - 1; i > 0; i--) {
          remove(i);
        }
      }
      setItemCount(1);
    }

    if (currentType === 4) {
      form.setValue("content.0.items", undefined);
    }
  }, [currentType, form, remove]);


  const removeContentItem = (index: number) => {
    if ((currentType === 5 || currentType === 6) && itemCount > 1) {
      remove(index);
      setItemCount(prev => prev - 1);
    }
  };

  const addItem = (contentIndex: number) => {
    const currentContent = form.getValues("content");
    const currentItems = currentContent[contentIndex].items || [];

    const updatedItems = [
      ...currentItems,
      { title: "", value: "" }
    ];

    form.setValue(`content.${contentIndex}.items`, updatedItems);
  };

  const removeItem = (contentIndex: number, itemIndex: number) => {
    const currentContent = form.getValues("content");
    const currentItems = [...(currentContent[contentIndex].items || [])];

    currentItems.splice(itemIndex, 1);
    form.setValue(`content.${contentIndex}.items`, currentItems);
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("type", values.type.toString());
    formData.append("show", values.show ? "true" : "false");
    formData.append("url", values.url);
  
    values.content.forEach((c, index) => {
      formData.append(`content[${index}][column1]`, c.column1);
      
      if (c.column2) {
        formData.append(`content[${index}][column2]`, c.column2);
      }
  
      // Handle file inputs for column2
      const file = fileInputs[`content.${index}.column2`];
      if (file) {
        formData.append(`files[${index}]`, file);
      }
  
      if (c.items && c.items.length > 0) {
        c.items.forEach((item, itemIndex) => {
          formData.append(`content[${index}][items][${itemIndex}][title]`, item.title);
          
          // Handle file inputs for type 5 items value
          if (currentType === 5) {
            const itemFile = fileInputs[`content.${index}.items.${itemIndex}.value`];
            if (itemFile) {
              formData.append(`itemFiles[${index}][${itemIndex}]`, itemFile);
              formData.append(`content[${index}][items][${itemIndex}][value]`, itemFile.name);
            } else {
              formData.append(`content[${index}][items][${itemIndex}][value]`, item.value);
            }
          } else {
            formData.append(`content[${index}][items][${itemIndex}][value]`, item.value);
          }
        });
      }
    });
  
    setIsLoading(true);
    try {
      if (actionType === "create") {
        handleCreateWebsiteSection(formData);
      } else {
        handleUpdateWebsiteSection(formData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };
  

    if (urlLoading || isPending || isUpdating) {
    return <LoadingSolder />;
  }

  if (urlError) {
    return (
      <div className="container py-6 text-red-500">
        <p>Error loading URLs: {urlError instanceof Error ? urlError.message : "Unknown error"}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">
        {actionType === "create" ? "Create Website Section" : "Update Website Section"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 shadow rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {
              actionType === "create" && (
                <FormField
                  control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Reset form to initial state
                      form.reset({
                        type: parseInt(value),
                        show: true,
                        url: form.getValues("url"), // Keep the current URL
                        content: [
                          {
                            column1: "",
                            column2: "",
                            items: [],
                          },
                        ],
                      });
                      field.onChange(parseInt(value));
                    }}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(WEB_TYPE).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
                  )}
                />
              )
            }

            {/* URL */}
            {
              actionType === "create" && (
                <FormField
                  control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>URL</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select URL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {urlData && urlData.map((url: any) => (
                        <SelectItem key={url.id} value={url.id}>
                          {url.path}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
              )
            }
            
            {/* Status */}
            <FormField
              control={form.control}
              name="show"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dynamic Content Section */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {currentType <= 4 ? "Content" : `Content Item ${index + 1}`}
                  </h3>
                  {currentType > 4 && index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeContentItem(index)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                {/* Column 1 */}
                <FormField
                  control={form.control}
                  name={`content.${index}.column1`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {currentType <= 3
                          ? "Text Content"
                          : currentType === 4
                            ? "Title"
                            : "Section Title"}
                      </FormLabel>
                      <FormControl>
                        {currentType === 4 ? (
                          <Input {...field} placeholder="Enter title" />
                        ) : (
                          <Textarea {...field} rows={4} placeholder="Enter content" />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Column 2 */}
                <FormField
                  control={form.control}
                  name={`content.${index}.column2`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {currentType <= 3
                          ? "Image"
                          : currentType === 4
                            ? "Description"
                            : "Section Description"}
                      </FormLabel>
                      <FormControl>
                        {currentType <= 3 ? (
                          <div>
                            <Input
                              type="file"
                              id={`file-${index}`}
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setFileInputs((prev) => ({ ...prev, [`content.${index}.column2`]: file }));
                                // Store file name in form data for validation
                                field.onChange(file ? file.name : "");
                              }}
                              accept="image/*"
                              className="cursor-pointer"
                            />
                            {fileInputs[`content.${index}.column2`] && (
                              <p className="text-sm text-green-600 mt-1">
                                File selected: {fileInputs[`content.${index}.column2`]?.name}
                              </p>
                            )}
                            {
                              field.value && (
                                <img src={field.value} alt="Image" className="w-32 h-32 rounded-md" />
                              )
                            }
                          </div>
                        ) : (
                          <Textarea {...field} rows={4} placeholder="Enter description" />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Items */}
                {(currentType === 5 || currentType === 6) && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Items</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addItem(index)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </Button>
                    </div>

                    {form.watch(`content.${index}.items`)?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} id={JSON.stringify(item)} className="border-t pt-4 flex gap-4 items-start">
                        <div className="flex-1 space-y-2">
                          <FormField
                            control={form.control}
                            name={`content.${index}.items.${itemIndex}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Title</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Item title" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`content.${index}.items.${itemIndex}.value`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  {currentType === 5 ? "Image" : "Value"}
                                </FormLabel>
                                <FormControl>
                                  {currentType === 5 ? (
                                    <div>
                                      <Input
                                        type="file"
                                        id={`file-item-${index}-${itemIndex}`}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0] || null;
                                          setFileInputs((prev) => ({ ...prev, [`content.${index}.items.${itemIndex}.value`]: file }));
                                          // Store file name in form data for validation
                                          field.onChange(file ? file.name : "");
                                        }}
                                        accept="image/*"
                                        className="cursor-pointer"
                                      />
                                      {fileInputs[`content.${index}.items.${itemIndex}.value`] && (
                                        <p className="text-sm text-green-600 mt-1">
                                          File selected: {fileInputs[`content.${index}.items.${itemIndex}.value`]?.name}
                                        </p>
                                      )}
                                   {
                                    item.value && (
                                      <img src={item.value} alt="Item" className="w-32 h-32 rounded-md" />
                                    )
                                   }
                                    </div>
                                  ) : (
                                    <Input {...field} placeholder="Enter value" />
                                  )}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mt-8"
                          onClick={() => removeItem(index, itemIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-6 flex gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}