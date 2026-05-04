import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-prose py-24 text-center">
      <p className="text-sm uppercase tracking-widest text-muted mb-4">404</p>
      <h1 className="mb-6">Couldn't find that one.</h1>
      <p className="text-lg text-ink/85 mb-10">
        The page you're after doesn't exist (or moved). Either way, our
        whole catalog is one click away.
      </p>
      <Link href="/" className="btn-primary">
        Back to Nuvanta
      </Link>
    </section>
  );
}
