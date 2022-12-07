import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import EmptyState from "../../../Utils/EmptyState";
import beerImg from "../../../Images/beer-img.png";

interface IPros {
  beerData: any;
}

const BeerCardView = (props: IPros) => {
  const { beerData } = props;

  if (beerData.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {beerData &&
        beerData.map((beer: any) => {
          return (
            <Card className="m-2" key={beer.id}>
              <Row>
                <Col xs={2}>
                  <Card.Img
                    variant="bottom"
                    src={beerImg}
                    className="beers-img"
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>{beer.name}</Card.Title>
                    <Card.Text className="beer-text-content">
                      <span className="beer-tagline">{beer.tagline}</span>
                      <span className="beer-description">{beer.description}</span>
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
