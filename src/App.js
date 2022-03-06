import { useState } from "react";
import { toppings } from "./utils/toppings";
import "./styles.css";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function App() {
  const [total, setTotal] = useState(0);
  const [allToppings, setAllToppings] = useState(toppings);

  const updateTotal = (position) => {
    console.log(position);
    const updateChecked = allToppings.map(
      ({ name, price, checked }, index, array) => {
        if (position === index) {
          return { name, price, checked: !checked };
        } else {
          return { name, price, checked };
        }
      }
    );
    setAllToppings(updateChecked);

    const reducedPrice = updateChecked.reduce(
      (sum, { name, price, checked }) => {
        if (checked) {
          return sum + price;
        }
        return sum;
      },
      0
    );
    setTotal(reducedPrice);
  };

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {allToppings.map(({ name, price, checked }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checked}
                    onChange={() => updateTotal(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
