import Image from 'next/image';

// Glass panel with halo, dashed ring and a floating product photo
export default function ProductPhotoPanel({ src, alt }) {
  return (
    <div className="glass relative overflow-hidden h-[clamp(380px,62vw,480px)] flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#fff,#eadcc9)]">
      <div className="absolute w-[min(380px,80%)] aspect-square rounded-full bg-[radial-gradient(circle,#fff,rgba(255,255,255,0)_70%)]" />
      <div className="spin absolute w-[min(430px,92%)] aspect-square border border-dashed border-[rgba(138,90,69,.45)] rounded-full" />
      <div className="fl fade relative w-[min(420px,96%)] aspect-square">
        <Image src={src} alt={alt} fill priority sizes="(max-width: 820px) 90vw, 420px" className="object-cover" />
      </div>
    </div>
  );
}