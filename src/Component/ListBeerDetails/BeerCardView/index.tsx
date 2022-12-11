import React from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { beerImg } from "../../../Images";

interface IPros {
  beerData: any;
}

const BeerCardView = (props: IPros) => {
  const { beerData } = props;

  const getIngredientsDetails = (beer: any) => {
    let ingredientsDetails: any;
    let ingredientsList: any = {};

    if (beer && beer.ingredients) {
      ingredientsDetails = Object.keys(beer.ingredients);
      for (let i = 0; i <= ingredientsDetails.length - 1; i++) {
        ingredientsList = {
          ...ingredientsList,
          [ingredientsDetails[i]]: [],
        };

        const ingredientsType = beer.ingredients[ingredientsDetails[i]];
        if (Array.isArray(ingredientsType)) {
          ingredientsType.map((e: any) => {
            if (!ingredientsList[ingredientsDetails[i]].includes(e.name)) {
              ingredientsList[ingredientsDetails[i]].push(e.name);
            }
          });
        } else {
          // for string
          ingredientsList[ingredientsDetails[i]].push(ingredientsType);
        }
      }
    }
    return ingredientsList;
  };

  const showIngredientDetails = (ingredients: any) => {
    let list = ingredients && Object.keys(ingredients);
    let data: string = "";

    if (list) {
      for (let i = 0; i <= list.length - 1; i++) {
        data = data + "\n" + `"${list[i]}": ${ingredients[list[i]].toString()}`;
      }
    }

    return (
      <>
        Ingredients: <br /> {data}
      </>
    );
  };

  const cardImgContent = (beer: any) => {
    return (
      <LazyLoadImage
        alt=""
        effect="blur"
        className={`beers-img ${beer.ingredients && "cursor-pointer"}`}
        src={beer.image_url ? beer.image_url : beerImg}
      />
    );
  };
  const toolTipContent = (beer: any) => {
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
        beerData.map((beer: any, index: number) => {
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
