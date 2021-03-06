import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calculaMarca, calculaPlan } from "../helper";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease-in;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = ({ setResumen, setCargando }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  const { marca, year, plan } = datos;

  const obtenerInformación = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    //Una base de 2000 para calcular el precio
    let resultado = 2000;

    //Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(year);

    //Por cada año hay que restar 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    //Americano 15%
    //Europeo 30%
    //Asiatico 5%
    resultado = calculaMarca(marca) * resultado;

    //Basico aumenta 20%
    //Completo 50%
    const incrementoPlan = calculaPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      //Total
      setResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformación}>
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformación}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          onChange={obtenerInformación}
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
        />
        Básico
        <InputRadio
          onChange={obtenerInformación}
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
        />
        Completo
      </Campo>
      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Form.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};

export default Form;
