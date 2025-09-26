const FeaturedMenuSection = () => {
  const menuItems = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg",
      alt: "Sate Maranggi",
      name: "Sate Maranggi",
      description: "Daging sapi pilihan dibumbui rempah khas, disajikan dengan sambal tomat segar.",
      price: "Rp 75.000"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
      alt: "Nasi Goreng Kambing",
      name: "Nasi Goreng Kambing",
      description: "Aroma rempah kari yang kuat dengan potongan daging kambing empuk tanpa bau prengus.",
      price: "Rp 85.000"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg",
      alt: "Lava Cake",
      name: "Chocolate Lava Cake",
      description: "Kue coklat hangat dengan lelehan premium di dalamnya, disajikan dengan es krim vanila.",
      price: "Rp 55.000"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <span className="font-bold text-[#C09553] uppercase tracking-widest text-sm">
          Cicipi Favorit Kami
        </span>
        <h2 className="font-[playfair] font-semibold text-4xl md:text-5xl mt-2 mb-12">
          Menu Andalan Nusa Bistro
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="font-[playfair] font-semibold text-2xl text-[#0D6A5D]">{item.name}</h3>
                <p className="text-gray-600 my-2 h-fit">{item.description}</p>
                <p className="font-bold text-[#0D6A5D] text-xl">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenuSection;