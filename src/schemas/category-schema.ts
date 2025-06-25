import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from "@/types/api-types";
import { z } from "zod";


export type Category = {
	id: number;
	name: string;
};

export type SingleCategoryResponse = GetOneResponse<Category>;
export type AllCategorysResponse = GetAllResponse<Category[]>;
export type CreateCategoryResponse = CreateResponse<Category>;
export type UpdateCategoryResponse = UpdateResponse<Category>;
export type DeleteCategoryResponse = DeleteResponse;

export type CategoryResponse = {
	status: boolean;
	data: {
		current_page: number;
		data: Category[];
	};
};
export const categorySchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Name is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
