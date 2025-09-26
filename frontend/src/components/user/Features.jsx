import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const items = [
    { id: 1, text: "Jelajahi Menu Kami", link: "/Menu", text_link: "Lihat Selengkapnya", img_url: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    { id: 2, text: "Pesan Tempat Anda", link: "/Reservation", text_link: "Reservasi Sekarang", img_url: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    { id: 3, text: "Cerita Dibalik Dapur", link: "/About", text_link: "Tentang Kami", img_url: "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
  ];

  return (
    <section id="features" className="py-24 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          // <div
          //   key={item.id}
          //   className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          // >
          //   <div className="bg-[url('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] w-full h-56 object-cover" alt="Foto Makanan Lezat" ></div>
          //   <p className="font-bold text-2xl text-[#0D6A77]">{item.text}</p>
          //   <Link to={item.link} className="font-bold text-[#C09553] text-accent hover:underline">
          //     {item.text_link}
          //   </Link>
          // </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img 
              src={item.img_url}
              alt="Foto Makanan Lezat" 
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-[playfair] font-bold text-[23px] text-[#0D6A77]">
                {item.text}
              </h3>
              <Link to={item.link} className="font-bold text-[#C09553] hover:underline">
                {item.text_link} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
