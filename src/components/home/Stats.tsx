const stats = [
  { value: '500+', label: 'Events Planned', description: 'Across CNY since 2012' },
  { value: '$2M+', label: 'Events Managed', description: 'In total event value' },
  { value: '98%', label: 'Satisfaction Rate', description: 'Verified client reviews' },
  { value: '50+', label: 'Vendor Partners', description: 'Local CNY businesses' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gold-500">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, description }) => (
            <div key={label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-navy-950 mb-1">{value}</div>
              <div className="text-navy-950 font-semibold text-lg mb-1">{label}</div>
              <div className="text-navy-900/60 text-sm">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
