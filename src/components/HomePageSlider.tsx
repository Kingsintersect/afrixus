"use client";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { slideImages } from "@/lib/placeholder-data";

export function HomePageSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="home-page-slider rounded-none w-full h-[60vh] relative overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="h-full">
                {slideImages.map((slide, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className="p-1 h-full">
                            <Card className="h-full overflow-hidden">
                                <CardContent className="relative p-0 h-full">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                        <div className="text-center text-white">
                                            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                                            <p className="text-xl">{slide.subtitle}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}