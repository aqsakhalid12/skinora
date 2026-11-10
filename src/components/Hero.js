import Image from 'next/image';
import Link from 'next/link';

// Home hero: headline, buttons, badges and the product photo
export default function Hero() {
  return (
    <div className="wrap pt-3">
      <div className="glass fx hs-wrap relative overflow-hidden p-[clamp(24px,5vw,64px)] flex flex-wrap gap-8 items-center bg-[linear-gradient(135deg,rgba(255,255,255,.6),rgba(244,222,205,.55))]">
        <div className="blob w-[320px] h-[320px] bg-[#f0b894] top-[-80px] right-[-60px] opacity-70" />
        <div className="blob w-[260px] h-[260px] bg-[#cfe3d4] bottom-[-90px] left-[30%] opacity-70 [animation-delay:-5s]" />

        <div className="flex-[1_1_340px] relative">
          <div className="eye fx d1">New · The Luminous Edit</div>
          <h1 className="hh fx d2 text-[76px] leading-none my-4">
            Skin, softly<br /><i className="shim">illuminated.</i>
          </h1>
          <p className="mut fx d3 max-w-[440px] text-[17px]">
            Considered formulas and quiet rituals, made in small batches and designed to feel as good as they look.
          </p>
          <div className="fx d3 flex gap-3 mt-7 flex-wrap">
            <Link href="/shop" className="btn">Shop the collection</Link>
            <Link href="/quiz" className="btn2">Find your routine</Link>
          </div>
          <div className="fx d3 hero-chips flex gap-[10px] flex-wrap mt-7 text-[13px]">
            <span className="glass px-[14px] py-2 !rounded-full">★ 4.8 average rating</span>
            <span className="glass px-[14px] py-2 !rounded-full">Free shipping over $75</span>
          </div>
        </div>

        <div className="hw flex-[1_1_300px] min-w-0 relative min-h-[440px] flex items-end justify-center">
          <div className="absolute w-[min(400px,95%)] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,rgba(255,255,255,.25)_60%,transparent_71%)] border border-[rgba(255,255,255,.9)] bottom-[34px]" />
          <div className="spin absolute w-[min(450px,100%)] aspect-square border border-dashed border-[rgba(138,90,69,.45)] rounded-full bottom-[10px]" />
          <div className="fl fade relative w-[min(440px,100%)] aspect-square mb-2">
            <Image src="/images/hero-main.jpg" alt="SKINORA cleanser, serum and sunscreen" fill priority sizes="(max-width: 600px) 90vw, 440px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
