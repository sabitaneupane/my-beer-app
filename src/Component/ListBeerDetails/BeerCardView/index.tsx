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
            <Card className="m-2">
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
                    <Card.Text>
                      <h3 className="beer-tagline">{beer.tagline}</h3>
                      <p>{beer.description}</p>
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
