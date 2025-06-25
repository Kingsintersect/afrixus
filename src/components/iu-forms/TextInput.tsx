import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

export const TextInput = ({ label, error, ...props }: TextInputProps) => {
    return (
        <div className="w-full space-y-1">
            <label htmlFor={props.id} className="block font-semibold text-lg">
                {label}
            </label>
            <Input
                {...props}
                className="text-base px-4 py-3"
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
};
