import React from "react";
import { Card } from "antd";
import borobudur from "../assets/borobudur.jpg";
// import Bromo from "../assets/bomo.jpg";

export class CardBody extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <Card
          hoverable
          style={{ width: 400, marginTop: "20px" }}
          cover={<img alt="borobudur" src={borobudur} />}
        >
          <Card.Meta
            title="Europe Street beat"
            // description="www.instagram.com
          />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            maiores, quis, earum vel deleniti porro veritatis quas commodi autem
            delectus deserunt, architecto id error quo! Corporis labore vel
            adipisci asperiores...
            <span>
              <button>more</button>
            </span>
          </p>
        </Card>
      </div>
    );
  }
}
