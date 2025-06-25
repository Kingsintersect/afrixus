'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FormatImageUrl } from '@/lib/imageUrl';

interface ImageGalleryWidgetProps {
    imageUrls: string[];
    alt?: string;
}

export default function ImageGalleryWidget({
    imageUrls,
    alt = 'Gallery image'
}: ImageGalleryWidgetProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!imageUrls || imageUrls.length === 0) {
        return (
            <div className="flex flex-col items-center space-y-4">
                <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">No images available</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full max-w-[500px] aspect-square border rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={FormatImageUrl(imageUrls[selectedImageIndex])}
                    alt={`${alt} - Main view`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {imageUrls.length > 1 && (
                <div className="w-full flex md:flex-wrap gap-2 justify-center max-w-[400px]">
                    {imageUrls.map((url, index) => (
                        <button
                            key={index}
                            onMouseOver={() => setSelectedImageIndex(index)}
                            className={`relative w-full max-w-[100px] aspect-square border-2 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${selectedImageIndex === index
                                ? 'border-blue-500 shadow-lg'
                                : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <Image
                                src={FormatImageUrl(url)}
                                alt={`${alt} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}