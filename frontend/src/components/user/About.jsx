const AboutSection = () => {
  const aboutData = {
    image: "https://images.pexels.com/photos/6937428/pexels-photo-6937428.jpeg",
    alt: "Interior Nusa Bistro",
    title: "Berawal dari Mimpi, Disajikan dengan Hati.",
    description:
      "Nusa Bistro lahir dari kecintaan kami terhadap kekayaan kuliner Indonesia dan keinginan untuk memperkenalkannya dengan sentuhan modern. Lebih dari sekedar makanan, kami menyajikan sebuah pengalaman...",
    buttonLink: "tentang.html",
    buttonText: "Baca Cerita Kami",
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutData.image}
              alt={aboutData.alt}
              className="rounded-lg shadow-lg h-[450px] w-fit object-cover"
            />
          </div>
          <div>
            <h2 className="font-[playfair] font-semibold text-4xl md:text-5xl leading-12">
              {aboutData.title.split(",")[0]},<br />
              {aboutData.title.split(",")[1]}
            </h2>
            <p className="mt-6 mb-8 text-lg text-gray-600">
              {aboutData.description}
            </p>
            <a
              href={aboutData.buttonLink}
              className="inline-block border-2 border-[#0D6A5D] text-[#0D6A5D] font-bold py-3 px-8 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              {aboutData.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
