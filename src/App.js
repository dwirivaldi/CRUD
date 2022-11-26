import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const getData = () => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    }).then(function (response) {
      setData(response.data.data);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name: name,
        description: description,
        image: image,
        price: parseInt(price),
      },
    }).then(function (response) {
      setName("");
      setDescription("");
      setImage("");
      setPrice(0);
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Form onSubmit={handleAdd}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            name="image"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter Image"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            name="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
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
    </>
  );
}

export default App;
