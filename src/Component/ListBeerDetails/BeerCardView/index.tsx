import React from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { beerImg } from "../../../Images";
import { Beers, IngredientsDetails } from "../../../Types/beers";

interface IProps {
  beerData: Beers[];
}

const BeerCardView = (props: IProps) => {
  const { beerData } = props;

  const getIngredientsDetails = (beer: Beers) => {
    const ingredientsList: any = {};

    if (beer && beer.ingredients) {
      for (const ingredientType in beer.ingredients) {
        if (beer.ingredients.hasOwnProperty(ingredientType)) {
          const ingredientsType = beer.ingredients[ingredientType];
          if (Array.isArray(ingredientsType)) {
            ingredientsType.forEach((e: IngredientsDetails) => {
              if (!ingredientsList[ingredientType]) {
                ingredientsList[ingredientType] = [];
              }
              if (!ingredientsList[ingredientType].includes(e.name)) {
                ingredientsList[ingredientType].push(e.name);
              }
            });
          } else {
            // for string
            if (!ingredientsList[ingredientType]) {
              ingredientsList[ingredientType] = [];
            }
            ingredientsList[ingredientType].push(ingredientsType);
          }
        }
      }
    }
    return ingredientsList;
  };

  const showIngredientDetails = (ingredients: any) => {
    let data: string = "";

    for (const ingredientType in ingredients) {
      if (ingredients.hasOwnProperty(ingredientType)) {
        data = `${data}\n"${ingredientType}": ${ingredients[ingredientType].toString()}`;
      }
    }

    return (
      <>
        Ingredients: <br /> {data}
      </>
    );
  };

  const cardImgContent = (beer: Beers) => {
    return (
      <LazyLoadImage
        alt={beer.name}
        effect="blur"
        className={`beers-img ${beer.ingredients && "cursor-pointer"}`}
        src={beer.image_url ? beer.image_url : beerImg}
        data-testid="lazy-load-image"
      />
    );
  };

  const toolTipContent = (beer: Beers) => {
    const ingredients = getIngredientsDetails(beer);
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id={`tooltip-top`}>
            {ingredients && showIngredientDetails(ingredients)}
          </Tooltip>
        }
      >
        {cardImgContent(beer)}
      </OverlayTrigger>
    );
  };

  return (
    <div className="beer-list-wrapper">
      {beerData &&
        beerData.map((beer: Beers, index: number) => {
          return (
            <Card className="beer-card m-2" key={beer.id ? beer.id : index}>
              <Row>
                <Col xs={3} sm={3} md={2} lg={2} className="card-img-section">
                  {beer.ingredients
                    ? toolTipContent(beer)
                    : cardImgContent(beer)}
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
    </div>
  );
};

export default BeerCardView;
