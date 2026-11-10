import Image from 'next/image';
import Link from 'next/link';

// Brand mark + wordmark, links to home
export default function Logo({ onClick }) {
  return (
    <Link href="/" onClick={onClick} aria-label="SKINORA home" className="flex items-center gap-[10px] min-h-[44px]">
      <Image className="lm" src="/images/logo-mark.png" alt="" width={30} height={30} priority />
      <span className="lg">SKINORA</span>
    </Link>
  );
}
