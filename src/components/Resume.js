import React from "react";
import styled from "@emotion/styled";
import { primeraMayuscula } from "../helper";
import PropTypes from "prop-types";

const ContenedorResume = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resume = ({ datos }) => {
  const { marca, year, plan } = datos;

  if (marca === "" || year === "" || plan === "") return null;
  return (
    <ContenedorResume>
      <h1>Resumen de cotización</h1>
      <ul>
        <li>Marca: {primeraMayuscula(marca)}</li>
        <li>Plan: {primeraMayuscula(plan)}</li>
        <li>Año del coche: {year}</li>
      </ul>
    </ContenedorResume>
  );
};

Resume.propTypes = {
  datos: PropTypes.object.isRequired,
};

export default Resume;
