import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Button from "../components/Button";

import "../styles/money.css";

export default function Money() {

  return (

    <section className="money">

      <h1>Money</h1>

      <p className="page-subtitle">
        Acompanhe mercado financeiro em tempo real.
      </p>

      <SectionTitle title="Mercado Hoje" />

      <div className="money-grid">

        <Card
          title="Bitcoin"
          description="+4.8%"
        />

        <Card
          title="Dólar"
          description="R$ 5,31"
        />

        <Card
          title="Euro"
          description="R$ 6,18"
        />

        <Card
          title="Ibovespa"
          description="+1.22%"
        />

      </div>

      <SectionTitle title="Destaques" />

      <Card
        title="Investimentos"
        description="Como diversificar sua carteira em 2026."
      />

      <Card
        title="Economia"
        description="Inflação apresenta desaceleração."
      />

      <Button text="Ler mais" />

    </section>

  );

}
