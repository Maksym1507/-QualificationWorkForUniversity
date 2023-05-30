import { FC, ReactElement } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CatalogItemDto } from "../../models/dtos/catalogItemsDto";
import { basketStore } from "../../App";
import BasketItemModel from "../../models/basketItemModel";

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
            onClick={async () =>
              await basketStore.addItem({
                id: props.id,
                product: { id: props.id, title: props.title, price: props.price, pictureUrl: props.pictureUrl },
                price: props.price,
                count: 1,
              } as BasketItemModel)
            }
          >
            Add to basket
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CatalogItemCard
