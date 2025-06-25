import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const AddressFields = ({ prefix }: { prefix: 'shipping' | 'billing' }) => (
    <>
        <FormField
            data-description={`${prefix}`}
            name={`address`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
                name={`city`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                            <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name={`state`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>State *</FormLabel>
                        <FormControl>
                            <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* <FormField
                name={`${prefix}Zip`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>ZIP Code *</FormLabel>
                        <FormControl>
                            <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
        </div>
    </>
);