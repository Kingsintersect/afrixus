import { Globe } from 'lucide-react';
import { lusitana } from './fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-3 leading-none text-white`}
    >
      <Globe className="h-24 w-24 rotate-[15deg]" />
      <p className="text-[44px]">afrixus</p>
    </div>
  );
}
