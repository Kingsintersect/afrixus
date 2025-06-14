'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrepareImageUrl, uploadProductImage } from '@/actions/productAction';
import LoadingCard from '@/components/LoadingCard';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '@/schemas/product-schema';

interface ImageUploaderProps {
    productId: number;
    imageUrl: string | undefined;
    onUploadSuccess?: (newUrl: string) => void;
    form: UseFormReturn<ProductFormValues>;
}

const ProductImageUploader: React.FC<ImageUploaderProps> = ({ form, productId, imageUrl, onUploadSuccess }) => {
    const [previewUrl, setPreviewUrl] = useState(imageUrl);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []);
        if (selectedFiles.length > 0) {
            const preview = URL.createObjectURL(selectedFiles[0]);
            setPreviewUrl(preview);
            setFile(selectedFiles[0]);

            const [imagePath] = await PrepareImageUrl(selectedFiles);
            form.setValue('picture', imagePath);
            form.setValue("images", selectedFiles, { shouldValidate: true });
        }
    };


    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!file) return;
        if (!productId) return;

        startTransition(async () => {
            const result = await uploadProductImage(file, productId);
            if (result.success && Array.isArray(result.url) && result.url.length > 0) {
                setPreviewUrl(result.url[0]);
                onUploadSuccess?.(result.url[0]);
            }
        });
    };

    useEffect(() => {
        if (imageUrl) {
            setPreviewUrl(imageUrl);
        } else {
            setPreviewUrl(undefined);
        }
    }, [imageUrl])

    return (
        <div className="space-y-4">
            <div className="relative h-64 py-10 w-full rounded overflow-hidden border">
                {previewUrl
                    ? <Image src={previewUrl} alt="Image Preview" fill className="object-contain" />
                    : <LoadingCard />
                }
            </div>
            <div className="flex justify-between items-center">
                <Button
                    type='button'
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                </Button>
                <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    {...form.register("images", {
                        onChange: handleFileChange,
                    })}
                    ref={fileInputRef}
                />

                {productId && <Button
                    // type="button"
                    onClick={handleUpload}
                    disabled={!file || isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        "Upload"
                    )}
                </Button>}
            </div>
            {form.formState.errors.picture && (
                <p className="w-full text-sm text-red-500 mt-2">
                    {form.formState.errors.picture.message}
                </p>
            )}
        </div>
    );
};

export default ProductImageUploader;
