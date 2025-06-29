import Link from 'next/link';
import AcmeLogo from '@/components/ui/acme-logo';
import NavLinks from './nav-links';
import { SignOutButton } from '@/components/SignOutButton';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-full text-white text-wrap">
                    <AcmeLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <div className="w-full">
                    <SignOutButton
                        revealIcon={true}
                        className='flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 text-black p-3 text-sm font-semibold hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
                    />
                </div>
            </div>
        </div>
    );
}
