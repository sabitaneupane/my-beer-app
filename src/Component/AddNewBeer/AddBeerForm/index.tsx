import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import beerImg from "../../../Images/beer-img.png";

interface IProps {
  handleFormData: any;
}

const AddBeerForm = (props: IProps) => {
  const { handleFormData } = props;

  const [beerName, setBeerName] = useState<string>("");
  const [beerGenre, setBeerGenre] = useState<string>("");
  const [beerDescription, setBeerDescription] = useState<string>("");

  const handleBeerName = (evt: any) => {
    setBeerName(evt.target.value);
    sentFormData("beerName", evt.target.value);
  };
  const handleGenre = (evt: any) => {
    setBeerGenre(evt.target.value);
    sentFormData("beerGenre", evt.target.value);
  };
  const handleDescription = (evt: any) => {
    setBeerDescription(evt.target.value);
    sentFormData("beerDescription", evt.target.value);
  };

  const sentFormData = (fieldName: string, fieldValue: string) => {
    handleFormData({
      beerName: fieldName === "beerName" ? fieldValue : beerName,
      beerGenre: fieldName === "beerGenre" ? fieldValue : beerGenre,
      beerDescription:
        fieldName === "beerDescription" ? fieldValue : beerDescription,
    });
  };

  return (
    <Form>
      <Card.Img variant="bottom" src={beerImg} className="form-beers-img" />
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Beer Name*"
          value={beerName}
          onChange={(evt) => handleBeerName(evt)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Genre*"
          value={beerGenre}
          onChange={(evt) => handleGenre(evt)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description*"
          value={beerDescription}
          onChange={(evt) => handleDescription(evt)}
          rows={3}
        />
      </Form.Group>
    </Form>
  );
};

export default AddBeerForm;
