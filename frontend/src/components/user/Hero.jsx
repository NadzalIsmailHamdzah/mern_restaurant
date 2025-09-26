import { Link } from "react-router-dom";

function Hero() {
  return (
 <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="relative z-10 px-4">
        <h1 className="font-[playfair] text-5xl md:text-7xl font-bold mb-4">
          Cita Rasa Nusantara, Sentuhan Dunia.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Nikmati perpaduan kuliner otentik dalam suasana modern yang hangat dan tak terlupakan.
        </p>
        <a 
          href="reservasi.html" 
          className="bg-[#CC994E] text-white font-bold text-lg py-3 px-8 rounded-md hover:bg-yellow-700 transition-all duration-300 transform hover:-translate-y-1"
        >
          Reservasi Meja Anda
        </a>
        <Link to="/Reservasi" >
        
        </Link>
      </div>
    </section>
  );
}

export default Hero;
