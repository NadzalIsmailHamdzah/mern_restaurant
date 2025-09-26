const TestimonialCard = ({ quote, name, rating }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#0D6A5D]">
      <p className="italic text-gray-600 mb-6">{quote}</p>
      <h4 className="font-bold text-dark">{name}</h4>
      <span className="text-[#C09553]">{rating}</span>
    </div>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "\"Suasananya nyaman banget, cocok buat kumpul keluarga. Makanannya ajiib!\"",
      name: "Andini Putri",
      rating: "★★★★☆"
    },
    {
      id: 2,
      quote: "\"Tempatnya elegan tapi harganya masih make sense. Pelayanannya ramah.\"",
      name: "Budi Santoso",
      rating: "★★★★★"
    },
    {
      id: 3,
      quote: "\"Nasi Goreng Kambingnya juara! Bumbunya pas, dagingnya empuk. Recommended!\"",
      name: "Citra Lestari",
      rating: "★★★★★"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-[playfair] font-semibold text-4xl md:text-5xl mb-12">
          Apa Kata Mereka Tentang Kami?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;