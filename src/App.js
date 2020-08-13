import React, { useState } from "react";
import Header from "./components/Header";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Resume from "./components/Resume";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 3rem;
`;

function App() {
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: "",
      year: "",
      plam: "",
    },
  });

  const [cargando, setCargando] = useState(false);

  const { datos, cotizacion } = resumen;

  return (
    <Container>
      <Header titulo="Cotizador de Seguros" />

      <FormContainer>
        <Form setResumen={setResumen} setCargando={setCargando} />
        {cargando ? <Spinner /> : null}
        <Resume datos={datos} />
        {!cargando ? <Result cotizacion={cotizacion} /> : null}
      </FormContainer>
    </Container>
  );
}

export default App;
