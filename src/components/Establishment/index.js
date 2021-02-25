import React, { useState, useEffect } from "react";
import EstablishmentService from "../../services/establishment_service";
import styled from "styled-components";

const LeftBar = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 250px;
  position: absolute;
  color: white;
  background-color: rgba(10, 10, 10, 0.9);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  color: rgba(220, 110, 50, 0.7);
`;

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`;

const Image = styled.img`
  height: 150px;
  width: 100%;
`;

const Establishment = (props) => {
  const [establishment, setEstablishment] = useState([]);

  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    getEstablishmentInformations();
  }, [props.place]);

  async function getEstablishmentInformations() {
    try {
      const response = await EstablishmentService.index(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment([]);
    }
  }

  return (
    <LeftBar>
      {establishment.photos ? (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&> photoreference=${establishment.photos[0].photo_reference}&sensor=false& key=${REACT_APP_GOOGLE_API_KEY}`}
          alt="Store perfil"
        />
      ) : (
        <Image src="/images/no_photo.jpg" alt="No perfil" />
      )}
      <Title>{establishment.name}</Title>
      {establishment.opening_hours ? (
        <div>
          {establishment.opening_hours.open_now === true ? "Aberto" : "Fechado"}

          <hr />

          {establishment.opening_hours.weekday_text.map((schedule, index) => {
            return <Paragraph key={index}>{schedule}</Paragraph>;
          })}
        </div>
      ) : (
        "Não há cadastros de horário de funcionamento."
      )}
      <hr />

      <Paragraph>{establishment.formatted_address}</Paragraph>
    </LeftBar>
  );
};

export default Establishment;
