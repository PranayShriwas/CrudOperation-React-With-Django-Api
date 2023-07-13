import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  const [data, updatedata] = useState([])
  const [product, updatepro] = useState({ id: '', name: '', price: '', cat: '', cmp: '' })
  useEffect(() => {
    async function show() {
      let res = await axios.get("https://ppvj.pythonanywhere.com/product/");
      updatedata(res.data)
    }
    show();
  }, [data])

  const change = (e) => {
    updatepro({ ...product, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container-fluid'>
        <h1 align="center">App component is running</h1>
        <input type='number' name='id' value={product.id} onChange={change} />
        <button className='btn btn-primary m-2' onClick={() => {
          async function search() {
            try {
              let res = await axios.get(`https://ppvj.pythonanywhere.com/product/${product.id}/`)
              //console.log(res.data)
              updatepro(res.data)
            } catch (error) {
              console.log(error)
            }
          }
          search()
        }}>Search</button>
        <h2 style={{ backgroundColor: 'red' }}>{product.name}{product.price}{product.cmp}</h2>
        <table className='table table-bordered text-center bg-warning text-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>COMPANY</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v, i) => {
              return (<tr key={i}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.price}</td>
                <td>{v.cat}</td>
                <td>{v.cmp}</td>
                <td><button className='btn btn-danger' onClick={() => {
                  async function delpro() {
                    let res = await axios.delete(`https://ppvj.pythonanywhere.com/product/${v.id}/`);
                    if (res.status === 204) {
                      alert("Product Deleted Sucessfully")

                    }
                  }
                  delpro()
                }}>Delete</button></td>
                <td><button className='btn btn-success' onClick={() => {
                  updatepro(v);
                }}>Update</button></td>
              </tr>)
            })}
          </tbody>
        </table>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (product.id === '') {
            async function addPro() {
              let res = await axios.post('https://ppvj.pythonanywhere.com/product/', product);
              if (res.status === 201) {
                alert('Product Added Sucessfully');
                updatepro({ id: '', name: '', price: 0, cat: '', cmp: '' })
              }
            }
            addPro();
          }
          else {
            async function updatePro() {
              let res = await axios.put(`https://ppvj.pythonanywhere.com/product/${product.id}/`, product);
              if (res.status === 200) {
                alert('product Updated Successfully');
                updatepro({ id: '', name: '', price: 0, cat: '', cmp: '' });
              }
            }
            updatePro();
          }
        }}>
          Name :- <input type='text' name='name' value={product.name} onChange={change} placeholder='Name' class="form-control" /><br />
          Price :- <input type='text' name='price' value={product.price} onChange={change} placeholder='Price' class="form-control" /><br />
          Category :- <input type='text' name='cat' value={product.cat} onChange={change} placeholder='Category' class="form-control" /><br />
          Company :- <input type='text' name='cmp' value={product.cmp} onChange={change} placeholder='Company' class="form-control" /><br />
          <button className='btn btn-danger'>{product.id === '' ? 'Add Product' : 'Update'}</button>
        </form>
      </div>
    </>
  )
}

export default App

