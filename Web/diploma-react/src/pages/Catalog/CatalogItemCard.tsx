import { FC, ReactElement } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CatalogItemDto } from "../../models/dtos/catalogItemsDto";

const CatalogItemCard: FC<CatalogItemDto> = (props): ReactElement => {

  const navigation = useNavigate();
  return (
    <div className="col">
      <Card className="mt-1 ms-4 h-100">
        <Card.Img
          variant="top"
          src={props.pictureUrl}
          alt={props.title}
          onClick={() => {
            navigation(`/product/${props.id}`);
          }}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.price} ₴</Card.Text>
            <Button
            className="btn-info d-flex"
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CatalogItemCard
