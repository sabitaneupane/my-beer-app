import React from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import beerImg from "../../../Images/beer-img.png";

interface IPros {
  beerData: any;
}

const BeerCardView = (props: IPros) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 992;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

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
      <Card.Img
        variant="bottom"
        src={beer.image_url ? beer.image_url : beerImg}
        className={`beers-img ${beer.ingredients && "cursor-pointer"}`}
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

  const cardViewContent = (deviceViewType: string) => {
    const isMobileView = deviceViewType === "mobileView";
    return (
      <>
        <Row>
          {beerData &&
            beerData.map((beer: any, index: number) => {
              return (
                <Col key={index} xs={isMobileView ? 12 : 6}>
                  <Card
                    className="beer-card m-2"
                    key={beer.id ? beer.id : index}
                  >
                    <Row>
                      <Col
                        xs={isMobileView ? 3 : 4}
                        sm={3}
                        md={2}
                        lg={2}
                        className="card-img-section"
                      >
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
                </Col>
              );
            })}
        </Row>
      </>
    );
  };

  return (
    <>{cardViewContent(width < breakpoint ? "mobileView" : "desktopView")}</>
  );
};

export default BeerCardView;
