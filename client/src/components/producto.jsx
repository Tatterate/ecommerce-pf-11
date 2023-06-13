import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";
import styles from "../css/Producto.module.css";
import Swal from "sweetalert2";
function Producto({ id, name, image, price,  categories }) {
  const dispatch = useDispatch();

  const addToCart = (id) => {
    try{
    dispatch(actions.setCart(id));
    Swal.fire({
        text: "Se ha agregado el producto",
        icon: "success",
        timer: 1100,
      });
    } catch (error) {
      Swal.fire({
        text: "Error al agregar el producto",
        icon: "warning",
        timer: 2000,
      });
      throw error;
    }
  };

  const agregarAlWishlist = (id) => {
    dispatch(actions.addToWishlist(id));
  };

  return (
    <div className="w-full max-w-sm bg-#1F2937 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1 p-2">
      <Link to={`/detail/${id}`}>
        <img
          className={styles.productos}
          src={image}
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5 flex flex-col items-end justify-center">
        <Link to={`/detail/${id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Categoria: {categories[0].name}
          </h5>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $ {price}
          </span>
          <a
            onClick={() => addToCart(id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar al Carrito
          </a>
        </div>
      </div>
    </div>
  );
}
export default Producto;
