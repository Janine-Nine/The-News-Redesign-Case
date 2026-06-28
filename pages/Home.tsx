import SearchBar from "../components/SearchBar";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import NewsCard from "../components/NewsCard";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";

import "../styles/home.css";

export default function Home() {

  return (

    <section className="home">

      <section className="hero">

        <h1>Bom dia, Nine 👋</h1>

        <p>
          Continue sua leitura diária e mantenha sua sequência.
        </p>

      </section>

      <SearchBar />

      <section className="habit">

        <SectionTitle
          title="Seu Hábito"
          subtitle="12 dias consecutivos"
        />

        <ProgressBar progress={75} />

      </section>

      <section>

        <SectionTitle
          title="Principais Notícias"
          subtitle="Atualizado agora"
        />

        <NewsCard
          title="IA está mudando o mercado de tecnologia."
          category="Tecnologia"
          time="5 min"
        />

        <NewsCard
          title="Economia brasileira apresenta crescimento."
          category="Money"
          time="4 min"
        />

        <NewsCard
          title="Novos destinos internacionais em alta."
          category="Travel"
          time="6 min"
        />

      </section>

      <section>

        <SectionTitle
          title="Categorias"
        />

        <div className="cards">

          <Card
            title="Money"
            description="Mercado Financeiro"
          />

          <Card
            title="Travel"
            description="Viagens"
          />

          <Card
            title="Business"
            description="Empresas"
          />

        </div>

      </section>

      <Button text="Ver todas as notícias" />

    </section>

  );

}
