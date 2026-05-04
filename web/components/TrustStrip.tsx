export function TrustStrip() {
  const items = [
    { title: 'Hand-picked', body: 'We test it. We stand behind it.' },
    { title: 'Ships in 2 days', body: 'Anywhere in South Africa.' },
    { title: '7-day returns', body: "We cover the courier." },
    { title: 'PayFast secure', body: '3D Secure on every order.' },
  ];

  return (
    <section className="border-y border-line bg-bg">
      <div className="container-page py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((it) => (
          <div key={it.title}>
            <p className="font-medium mb-1">{it.title}</p>
            <p className="text-sm text-muted">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
