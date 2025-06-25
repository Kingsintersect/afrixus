import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

interface StatCardProps {
    title: string;
    value: string | number;
    // description?: string;
    badgeText?: string;
    badgeIcon?: ReactNode;
    footerPrimary?: ReactNode;
    footerSecondary?: ReactNode;
    isCurrency?: boolean;
}

export const StatCard = ({
    title,
    value,
    // description,
    badgeText,
    badgeIcon,
    footerPrimary,
    footerSecondary,
    isCurrency
}: StatCardProps) => {
    return (
        <Card className="@container/card">
            <CardHeader>
                {title && <CardDescription>{title}</CardDescription>}
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {(isCurrency) ? formatCurrency(Number(value)) : Number(value)}
                </CardTitle>
                {badgeText && (
                    <div className="mt-2">
                        <Badge variant="outline">
                            {badgeIcon}
                            {badgeText}
                        </Badge>
                    </div>
                )}
            </CardHeader>
            {(footerPrimary || footerSecondary) && (
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    {footerPrimary && (
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {footerPrimary}
                        </div>
                    )}
                    {footerSecondary && (
                        <div className="text-muted-foreground">
                            {footerSecondary}
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
};
