const Footer = () => {
  const footerData = {
    company: {
      name: "Nusa Bistro",
      address: "Jl. Sudirman No. 123, Bandung, Jawa Barat."
    },
    hours: {
      title: "Jam Buka",
      schedule: "Senin - Minggu<br>11:00 - 22:00 WIB"
    },
    quickLinks: [
      { name: "Menu", href: "menu.html" },
      { name: "Reservasi", href: "reservasi.html" },
      { name: "Kontak", href: "kontak.html" }
    ],
    socialMedia: [  
      { name: "Instagram", href: "#" },
      { name: "Facebook", href: "#" }
    ],
    copyright: "© 2025 Naisham"
  };

  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-[playfair] font-semibold text-2xl mb-4">{footerData.company.name}</h3>
            <p className="text-gray-400">{footerData.company.address}</p>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4">{footerData.hours.title}</h4>
            <p 
              className="text-gray-400" 
              dangerouslySetInnerHTML={{ __html: footerData.hours.schedule }}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index} className="text-gray-400 hover:text-[#C09553]">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {footerData.socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-[#C09553]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;