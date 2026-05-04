export function FounderNote() {
  const founder = process.env.NEXT_PUBLIC_FOUNDER_NAME ?? 'Baptista';

  return (
    <section className="container-page py-16 sm:py-20 border-t border-line">
      <div className="max-w-prose">
        <h2 className="mb-6">We picked this one. Here's why.</h2>
        <div className="space-y-4 text-ink/85">
          <p>
            I tested four power banks side-by-side over a long weekend in
            Sutherland — no power for 36 hours, four people, six devices.
            This was the only one that didn't quit on us before sunrise.
          </p>
          <p>
            It also charges itself fastest (back to full in about 4 hours
            from a wall plug). That's why it's the first thing on Nuvanta.
          </p>
          <p className="text-muted">
            — {founder}, Joburg
          </p>
        </div>

        <p className="mt-8 text-sm text-muted italic">
          Edit this note in <code>web/components/FounderNote.tsx</code> with
          your real test. The brand dies the day a customer screenshots a
          faked story.
        </p>
      </div>
    </section>
  );
}
