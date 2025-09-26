const CtaSection = () => {
  const ctaData = {
    title: "Siap untuk Pengalaman Kuliner Terbaik?",
    description: "Amankan meja Anda sekarang dan biarkan kami memanjakan lidah Anda.",
    buttonText: "Reservasi Sekarang",
    buttonLink: "reservasi.html"
  };

  return (
    <section className="py-20 bg-[#0D6A5D] text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-[playfair] font-semibold text-4xl md:text-5xl">
          {ctaData.title}
        </h2>
        <p className="mt-4 mb-8 text-lg opacity-80">
          {ctaData.description}
        </p>
        <a 
          href={ctaData.buttonLink} 
          className="bg-[#C09553] text-white font-bold text-lg py-3 px-8 rounded-md hover:bg-yellow-700 transition-all duration-300 transform hover:-translate-y-1"
        >
          {ctaData.buttonText}
        </a>
      </div>
    </section>
  );
};

export default CtaSection;