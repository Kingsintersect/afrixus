'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import CategoryFields from "./CategoryFields";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CategoryFormValues, categorySchema } from "@/schemas/category-schema";
import { createCategory, deleteCategory, getCategoryById, updateCategory } from "@/actions/categoriesAction";
import { toast } from "sonner";
import { Loader2Icon, Trash2Icon } from "lucide-react";

interface Props {
    categoryId: number;
    option: "edit" | "create";
}

export default function CategoryForm({ categoryId, option }: Props) {
    const router = useRouter();
    const categoryOption = (option === "edit") ? " updated " : " created ";
    const isEditMode = categoryId !== 0;

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "" },
    });

    const { data: category, isLoading } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: async () => {
            const category = await getCategoryById(categoryId);
            if (!category) throw new Error("Category not found");

            form.reset({
                id: category.id,
                name: category.name,
            });

            return category;
        },
        enabled: isEditMode && !!categoryId,
    });

    const mutation = useMutation({
        mutationFn: ({ data, id }: { data: CategoryFormValues; id?: number }) => {
            if (isEditMode && id !== undefined) return updateCategory(data, id);
            return createCategory(data);
        },
        onSuccess: () => {
            toast.success('Success!', {
                description: `${form.getValues("name")} was ${categoryOption} successfully!`,
            });
            router.push("/admin/categories");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Oops! Something went wrong.");
        },
    });
    const deleteMutation = useMutation({
        mutationFn: () => deleteCategory(categoryId),
        onSuccess: () => {
            toast.success("Success!", {
                description: `${category?.name} was deleted successfully!`,
            });
            router.push("/admin/categories");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error!", {
                description: `There was an error deleting ${category?.name}!`,
            });
        },
    });

    const onSubmit = (data: CategoryFormValues) => {
        if (isEditMode && !categoryId) {
            toast.error("Category ID is required for editing.");
            return;
        }
        mutation.mutate({ data, id: isEditMode ? categoryId : undefined });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="w-full">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  text-lg bg-white p-6 py-10 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-6">
                <CategoryFields form={form} />

                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-black text-white px-6 py-3 rounded-md text-lg"
                >
                    {mutation.isPending
                        ? isEditMode ? "Updating..." : "Creating..."
                        : isEditMode ? "Update Category" : "Create Category"
                    }
                </Button>


            </form>
            <div className="w-full mt-[45vh]">
                <Button
                    type="button"
                    variant="destructive"
                    className="w-full py-10 text-3xl font-semibold flex items-center justify-center gap-2"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? (
                        <Loader2Icon className="animate-spin h-6 w-6" style={{ width: "30px", height: "30px" }} />
                    ) : (
                        <Trash2Icon className="h-24 w-24" style={{ width: "30px", height: "30px" }} />
                    )}
                    Delete this Category
                </Button>
            </div>

        </div>
    );
}
