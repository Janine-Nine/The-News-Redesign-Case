import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Button from "../components/Button";

import "../styles/travel.css";

export default function Travel() {

  return (

    <section className="travel">

      <h1>Travel</h1>

      <p className="page-subtitle">
        Inspire-se para sua próxima viagem.
      </p>

      <SectionTitle title="Destinos Populares" />

      <div className="travel-grid">

        <Card
          title="Paris"
          description="França"
        />

        <Card
          title="Tóquio"
          description="Japão"
        />

        <Card
          title="Nova York"
          description="Estados Unidos"
        />

        <Card
          title="Rio de Janeiro"
          description="Brasil"
        />

      </div>

      <SectionTitle title="Promoções" />

      <Card
        title="Passagens"
        description="Até 35% OFF"
      />

      <Card
        title="Hotéis"
        description="Diárias especiais"
      />

      <Button text="Explorar viagens" />

    </section>

  );

}
