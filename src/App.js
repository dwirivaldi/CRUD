import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    }).then(function (response) {
      console.log(response);
      setData(response.data.data);
    });
  }, []);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.image}</td>
              <td>{item.price}</td>
              <td>
                <ButtonGroup aria-label="Action">
                  <Button variant="primary">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default App;
