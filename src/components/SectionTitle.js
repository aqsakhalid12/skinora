// Eyebrow + H2 used on the home page sections
export default function SectionTitle({ eyebrow, children }) {
  return (
    <>
      <div className="eye">{eyebrow}</div>
      <h2 className="text-[44px] mt-2 mb-7">{children}</h2>
    </>
  );
}
