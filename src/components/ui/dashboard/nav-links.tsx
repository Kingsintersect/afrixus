'use client';
import {
    UsersIcon,
    HomeIcon,
    // Files,
    ListChecksIcon,
    ShoppingBasketIcon,
    // ShoppingBagIcon,
    HashIcon,
    ListIcon
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Home', href: '/admin', icon: HomeIcon },
    {
        name: 'Categories',
        href: '/admin/categories',
        icon: ListIcon,
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: ListChecksIcon,
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBasketIcon,
    },
    {
        name: 'Payments',
        href: '/admin/payments',
        icon: HashIcon,
    },
    // {
    //     name: 'Invoices',
    //     href: '/admin/invoices',
    //     icon: Files,
    // },
    {
        name: 'Customers', href: '/admin/customers', icon: UsersIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
