import React from "react";

const Reservation = () => {
  return (
    <section id="reservation" className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Make a Reservation</h2>
      <form className="max-w-lg mx-auto flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border p-3 rounded-lg" />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" />
        <input type="date" className="border p-3 rounded-lg" />
        <input type="time" className="border p-3 rounded-lg" />
        <button className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600 text-white">
          Reserve Now
        </button>
      </form>
    </section>
  );
};

export default Reservation;
