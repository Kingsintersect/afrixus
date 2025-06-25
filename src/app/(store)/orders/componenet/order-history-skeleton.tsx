import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderHistorySkeleton() {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-4 w-24 mb-3" />
                                <div className="space-y-2">
                                    {[...Array(2)].map((_, j) => (
                                        <div key={j} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                                            <Skeleton className="w-12 h-12 rounded-md" />
                                            <div className="flex-1 space-y-1">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-3 w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <div className="text-right">
                                        <Skeleton className="h-6 w-20 ml-auto" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}