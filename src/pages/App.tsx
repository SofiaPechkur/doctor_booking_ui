import type { FC } from "react";
import "./App.scss";
import { Card } from "../components/card";
import { doctors } from "../components/card/doctors";

const App: FC = () => {
  return (
    <>
      <h1 className="title">наши эксперты</h1>
      <section className="cards">
        {doctors.map((doc) => (
          <Card key={crypto.randomUUID()} {...doc} />
        ))}
      </section>
    </>
  );
};

export default App;
