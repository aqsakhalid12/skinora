import FaqList from '@/components/FaqList';
import PageShell from '@/components/PageShell';
import { VALUES } from '@/data/site';

export const metadata = {
  title: 'About',
  description: 'SKINORA is an international skincare house built on restraint: fewer, better formulas, honest ingredient lists and packaging made to last.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell title="About SKINORA" titleClass="">
      <p className="mut max-w-[680px] text-[17px]">
        An international skincare house built on restraint: fewer, better formulas, honest ingredient lists, and packaging made to last.
      </p>
      <div className="g3 my-8">
        {VALUES.map(([title, text]) => (
          <div key={title} className="glass hov p-6">
            <h3 className="text-[26px]">{title}</h3>
            <p className="mut">{text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="glass flex-[1_1_320px] p-7 flex flex-col gap-[10px]">
          <h2 className="text-[34px]">Contact</h2>
          <label htmlFor="m1" className="mut">Name</label>
          <input id="m1" className="inp" />
          <label htmlFor="m2" className="mut">Email</label>
          <input id="m2" className="inp" />
          <label htmlFor="m3" className="mut">Message</label>
          <textarea id="m3" className="inp" rows={4} />
          <button className="btn">Send message</button>
        </div>
        <div className="glass flex-[1_1_320px] p-7">
          <h2 className="text-[34px] mb-[10px]">FAQ</h2>
          <FaqList />
        </div>
      </div>
    </PageShell>
  );
}
