"use client";

import React, { useEffect, useRef, useState } from "react";
import { Upload, X, Star } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/schemas/product-schema";
import { deleteProductImage } from "@/actions/productAction";
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { convertImageUrlsToPictures, FormatImageUrl, ProductImage } from "@/lib/imageUrl";

interface ProductImageUploaderProps {
    productId: number;
    imagesUrlArray: string[] | undefined;
    form: UseFormReturn<ProductFormValues>;
}


const ProductImageUploader = ({ productId, imagesUrlArray, form }: ProductImageUploaderProps) => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { setValue, register } = form;

    useEffect(() => {
        const converted = convertImageUrlsToPictures(imagesUrlArray ?? []);
        setImages(converted);
        setValue("images", []);
    }, [imagesUrlArray, setValue]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        const newImageObjs: ProductImage[] = files.map((file, idx) => ({
            id: Date.now() + idx,
            url: URL.createObjectURL(file),
            alt: file.name,
            file,
            primary: false,
        }));

        setImages((prev) => {
            const updated = [...prev, ...newImageObjs];
            updateFormImagesField(updated);
            return updated;
        });
    };

    const setPrimaryImage = (imageId: number) => {
        setImages((prev) => {
            const updated = prev.map((img) => ({
                ...img,
                primary: img.id === imageId,
            }));
            updateFormImagesField(updated);
            return updated;
        });
    };

    const updateFormImagesField = (images: ProductImage[]) => {
        const fileImages = images.filter((img) => img.file).map((img) => img.file!);
        setValue("images", fileImages);
    };

    const deleteImageMutation = useMutation({
        mutationFn: async (imageUrl: string) => {
            await deleteProductImage(productId, [imageUrl]);
            return imageUrl;
        },
        onSuccess: (deletedUrl) => {
            setImages((prev) => {
                const updated = prev.filter((img) => img.url !== deletedUrl);
                updateFormImagesField(updated);
                return updated;
            });
        },
        onError: (err) => {
            console.error("Failed to delete image", err);
            toast.error("Error deleting image");
        },
    });


    const removeImage = (imageId: number) => {
        const image = images.find((img) => img.id === imageId);
        if (!image) return;

        if (image.file) {
            setImages((prev) => {
                const updated = prev.filter((img) => img.id !== imageId);
                updateFormImagesField(updated);
                return updated;
            });
        } else {
            deleteImageMutation.mutate(image.url);
        }
    };


    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group">
                            <div className="relative w-full aspect-[4/4]">
                                {image.url?.startsWith("blob:") ? (
                                    <Image
                                        src={image.url}
                                        alt="Image Preview"
                                        fill
                                        className={`object-contain rounded-lg border-2 cursor-pointer transition-all ${image.primary
                                            ? "border-blue-500 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                ) : (
                                    <Image
                                        src={FormatImageUrl(image.url)}
                                        alt={image.alt}
                                        fill
                                        className={`object-contain rounded-lg border-2 cursor-pointer transition-all ${image.primary
                                            ? "border-blue-500 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                )}
                            </div>

                            {image.primary && (
                                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    Primary
                                </div>
                            )}

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                {!image.primary && (
                                    <button
                                        onClick={() => setPrimaryImage(image.id)}
                                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                        title="Set as primary"
                                    >
                                        <Star className="w-3 h-3" />
                                    </button>
                                )}
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                    title="Remove image"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div
                        className="w-full aspect-[4/4] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="text-center">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <span className="text-sm text-gray-500">Add Image</span>
                        </div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>

            <input type="hidden" {...register("images")} />

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-[50vh] h-[50vh]">
                        <Image
                            src={FormatImageUrl(selectedImage.url)}
                            alt={selectedImage.alt}
                            fill
                            className="object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductImageUploader;
