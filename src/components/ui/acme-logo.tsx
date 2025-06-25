// import { Globe } from 'lucide-react';
import { lusitana } from './fonts';
import { SITE_NAME } from '@/lib/config';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-3 leading-none text-white`}
    >
      {/* <Globe className="!h-24 !w-24 rotate-[15deg]" /> */}
      <div className="relative !h-24 !w-24">
        <Image
          alt='LOGO'
          src={"/af-logo-1.png"}
          fill
          className='object-contain'
        />
      </div>
      <p className="text-[34px]">{SITE_NAME}</p>
    </div>
  );
}
