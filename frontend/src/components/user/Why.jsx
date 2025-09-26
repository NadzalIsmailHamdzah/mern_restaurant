const WhyUsSection = () => {
  const features = [
    {
      id: 1,
      icon: "fa-solid fa-leaf",
      title: "Bahan Baku Segar",
      description: "Kami bekerja sama dengan petani lokal untuk menyajikan bahan-bahan segar dan berkualitas tinggi setiap hari."
    },
    {
      id: 2,
      icon: "fa-solid fa-utensils",
      title: "Resep Otentik & Modern",
      description: "Menghormati resep warisan nusantara dengan sentuhan modern dari chef berpengalaman kami."
    },
    {
      id: 3,
      icon: "fa-solid fa-couch",
      title: "Suasana Nyaman",
      description: "Desain interior yang elegan namun tetap hangat, sempurna untuk setiap momen."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <span className="font-bold text-[#C09553] uppercase tracking-widest text-sm">
          Mengapa Naisham?
        </span>
        <h2 className="font-[playfair] font-semibold text-4xl md:text-5xl mt-2 mb-12">
          Pengalaman Kuliner Terbaik
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <i className={`${feature.icon} text-5xl text-[#C09553] mb-6`}></i>
              <h4 className="font-[playfair] text-2xl font-semibold text-dark mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;