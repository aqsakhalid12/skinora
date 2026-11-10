import Link from "next/link";

export default function Footer() {
  return (
    <footer className="wrap mt-10">
      {/* Border lives on the inner box so the line keeps the side margins */}
      <div className="ftr flex flex-wrap items-center justify-between gap-4 py-10 border-t border-[rgba(31,27,24,.1)]">
        <span className="font-serif font-medium text-[22px] tracking-[6px]">
          SKINORA
        </span>
        <span className="mut text-[13px]">
          Shipping · Returns · Privacy · © 2026 SKINORA. Skin finder results are
          product suggestions, not medical advice.
        </span>
        <Link href="/admin" className="nav">
          Admin
        </Link>
      </div>
    </footer>
  );
}
