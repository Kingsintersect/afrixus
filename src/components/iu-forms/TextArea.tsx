import { FieldError } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    cols?: number;
    rows?: number;
    error?: FieldError;
}

export const TextArea = ({ label, rows, cols, error, ...props }: TextInputProps) => {
    return (
        <div className="w-full space-y-1">
            <label htmlFor={props.id} className="block font-semibold text-lg">
                {label}
            </label>
            <Textarea
                rows={rows}
                cols={cols}
                {...props}
                placeholder="Enter category description"
                className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full border rounded-md px-4 py-3 text-lg tracking-widest text-gray-700"
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
};
