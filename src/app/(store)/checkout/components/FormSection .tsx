import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FormSection = ({
    title,
    description,
    icon: Icon,
    children
}: {
    title: string;
    description?: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <Card className="w-full shadow-sm border-none">
        <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Icon className="w-5 h-5 text-blue-600" />
                {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
            {children}
        </CardContent>
    </Card>
);