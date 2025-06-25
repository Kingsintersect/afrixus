'use client';
import { UseFormReturn } from "react-hook-form";
import { CategoryFormValues } from "@/schemas/category-schema";
import React from "react";
import { TextInput } from "@/components/iu-forms/TextInput";

interface Props {
    form: UseFormReturn<CategoryFormValues>;
}

export default function CategoryFields({ form }: Props) {
    const { register, formState: { errors } } = form;


    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="cols-span-full">
                <TextInput
                    label="Category Name"
                    id="name"
                    {...register("name")}
                    error={errors.name}
                />
            </div>
        </div>
    );
}
