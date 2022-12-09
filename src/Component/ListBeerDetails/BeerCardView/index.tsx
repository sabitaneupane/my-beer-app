import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import beerImg from "../../../Images/beer-img.png";

interface IPros {
  beerData: any;
}

const BeerCardView = (props: IPros) => {
  const { beerData } = props;

  return (
    <>
      {beerData &&
        beerData.map((beer: any, index: number) => {
          return (
            <Card className="beer-card m-2" key={beer.id ? beer.id : index}>
              <Row>
                <Col xs={2}>
                  <Card.Img
                    variant="bottom"
                    src={beer.image_url ? beer.image_url : beerImg}
                    className="beers-img"
                  />
                </Col>
                <Col className="beer-card-text-content">
                  <Card.Body>
                    <Card.Title>{beer.name}</Card.Title>
                    <Card.Text className="beer-text-content">
                      <span className="beer-tagline">
                        {beer.tagline}
                        {beer.genre}
                      </span>
                      <span className="beer-description">
                        {beer.description}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          );
        })}
    </>
  );
};

export default BeerCardView;
