import axios from "axios";
import React, { useState } from "react";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const product = {
      product_desc: desc,
      product_name: name,
      product_price: price,
      category: category,
      imgLink: img,
    };

    try {
      const res = await axios.post("http://localhost:8080/add", product);
      if (res.status === 200 || res.status === 201) {
        setMsg(" Data Inserted Successfully");
        setName("");
        setDesc("");
        setPrice(0);
        setImg("")
      }
    } catch (err) {
      console.log(err);
      if (err.response) setMsg(` Server error ${err.response.status}`);
      else if (err.request) setMsg(" No response from server.");
      else setMsg(" Error: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image Link</label>
          <input
            type="text"
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option value="clothes">Clothes</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {msg && <p className="message">{msg}</p>}
    </div>
  );
};

export default ProductAdd;
