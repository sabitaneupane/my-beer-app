import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { beerImg } from "../../../Images";

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
    sentFormData("name", evt.target.value);
  };
  const handleGenre = (evt: any) => {
    setBeerGenre(evt.target.value);
    sentFormData("genre", evt.target.value);
  };
  const handleDescription = (evt: any) => {
    setBeerDescription(evt.target.value);
    sentFormData("description", evt.target.value);
  };

  const sentFormData = (fieldName: string, fieldValue: string) => {
    handleFormData({
      name: fieldName === "name" ? fieldValue : beerName,
      genre: fieldName === "genre" ? fieldValue : beerGenre,
      description: fieldName === "description" ? fieldValue : beerDescription,
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
