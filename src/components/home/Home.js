import React from "react";
import Carousel from "./Carousel";
import Book from "./Book";
import About from "./About";
import Services from "./Service";
import Rooms from "./Rooms";
import Sliders from "./Slider";
import Teams from "./Team";

export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <section style={{ marginBottom: '2.5rem' }}>
        <Carousel />
      </section>
      <section style={{ marginBottom: '2.5rem' }}>
        <Book />
      </section>
      <section style={{ marginBottom: '2.5rem' }}>
        <About />
      </section>
      <section style={{ marginBottom: '2.5rem' }}>
        <Rooms limit={8} />
      </section>
      <section style={{ marginBottom: '2.5rem' }}>
        <Services />
      </section>
      <section style={{ marginBottom: '2.5rem' }}>
        <Sliders />
      </section>
      <section>
        <Teams />
      </section>
    </main>
  );
}
