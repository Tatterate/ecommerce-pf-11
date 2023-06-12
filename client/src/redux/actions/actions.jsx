import {
	GET_CARTG,
	GET_PRODUCT,
	GET_ALL_PRODUCTS,
	// FILTER_PRODUCTS,
	RESET_FILTER,
	ADD_TO_CART,
	REMOVE_ONE_FROM_CART,
	REMOVE_ALL_FROM_CART,
	SET_CART,
	// SET_CURRENT_PAGE,
	// SET_PRODUCTS_PER_PAGE,
	// SET_COMBINED_FILTERS,
	// GET_CATEGORY_ROUTE,
	// GET_PLATFORMS_ROUTE,
	// GET_LICENSES_ROUTE,
  SET_PRODUCTS,
  SET_FILTERS,
  SET_CATEGORIES,
  ADD_PRODUCT
} from '../consts';
import axios from "axios";
import Swal from "sweetalert2";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SIGN_IN = "SIGN_IN";
export const USER_TO_ADMIN = "USER_TO_ADMIN";
export const GET_USER = "GET_USER";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const UPDATE_USER = "UPDATE_USER";
export const VERIFY_PASSWORD = "VERIFY_PASSWORD";
export const ALL_PRODUCTS = "ALL_PRODUCTS";

const URL = 'http://localhost:3001'

export const setProducts = (products) => {
  console.log(products);
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const setFilters = (filters) => {
  
  return {  
    type: SET_FILTERS,
    payload: filters,
  };
};

export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  }
}

export function addProduct(payload) {
	return async function (dispatch) {
		try {
      const response = await axios
        .post(`${URL}/products`, payload);
      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
	};
}

// export function getAllProducts(page) {
//   return function (dispatch) {
//     return axios.get(`${URL}/products?page=${page}`).then((response) => {
// 		console.log('Response.data', response.data.rows);
// 		dispatch({
// 			type: GET_ALL_PRODUCTS,
// 			payload: response.data.rows,
// 		});
// 	});
//   };
// }
export function agregarAlCarrito(newData, id) {
  return function (dispatch) {
    return axios
      .post(`${URL}/users/${id}/cart`, {
        product: newData,
      })
      .then((res) => {
        dispatch({
          type: GET_CARTG,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };
}

export function getProduct(id) {
  return function (dispatch) {
    return axios
      .get(`${URL}/products/${id}`)
      .then((res) => {
        dispatch({
          type: GET_PRODUCT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
}

export function editProduct(bodyFormData, id) {
  return function (dispatch) {
    return axios
      .put(`${URL}/products/${id}`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Modificación",
          text: "Se modificó el producto correctamente",
        });
        getProduct(res.data.id)(dispatch);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Completa todos los datos obligatorios",
        });
      });
  };
}

export function addUser(payload, email) {
  var url = URL + "/auth/signup";
  return function (dispatch) {
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: ADD_USER,
          payload: response.data,
        });
        if (response.data === "ya existe un usuario con este email") {
          Swal.fire({
            text: "Ya existe un usuario con este email",
            icon: "error",
            timer: "2000",
          });
        } else {
          Swal.fire({
            text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de CodeXpress",
            icon: "success",
            timer: "2000",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "Ocurrió un error al registrar el usuario",
          icon: "error",
          timer: "2000",
        });
      });
  };
}

export function deleteUsers(payload) {
  var id = payload;
  var url = `${URL}/users/${id}`;
  return function (dispatch) {
    axios
      .delete(url)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
        });
      })
      .then(() => {
        Swal.fire({
          text: "Usuario eliminado",
          icon: "success",
          timer: "2000",
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
}

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(
      `${URL}/auth/login`,
      {
        email: payload.email,
        password: payload.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    Swal.fire({
      text: "Ha iniciado sesión correctamente",
      icon: "success",
      timer: "2000",
    });
    return true;
  } catch (error) {
    Swal.fire({
      text: "Usuario no encontrado",
      icon: "warning",
      timer: "2000",
    });
    return false;
  }
};


export const logoutUser = () => {
  return function (dispatch) {
    axios
      .get(`${URL}/auth/logout`)
      .then((response) => {
        localStorage.removeItem("user");
        Swal.fire({
          text: "Se ha cerrado la sesión",
          icon: "success",
          timer: "2000",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: "Error",
          icon: "warning",
          timer: "2000",
        });
      });
  };
};

export function Usertoadmin(id) {
  var payload;
  var url = `${URL}/Admin/promote/${id}`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: USER_TO_ADMIN,
        });
      })
      .catch((error) => {
        console.error("Error promoting user to admin:", error);
      });
  };
}

export function getAllUser(id) {
  if (typeof idUser !== "object") {
    return function (dispatch) {
      axios
        .get(`${URL}/Admin/search/${id}`)
        .then((response) => {
          dispatch({
            type: GET_USER,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    };
  }
}

export function verifyPass(payload) {
  var id = payload.id;
  return function (dispatch) {
    axios
      .get(`${URL}/users/${id}/passVerify`)
      .then((response) => {
        dispatch({
          type: VERIFY_PASSWORD,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error verifying password:", error);
      });
  };
}

export function ResetPassword(payload) {
  var id = payload.id;
  var url = `${URL}/users/${id}/passwordReset`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: RESET_PASSWORD,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
  };
}

export function updateUser(payload) {
  var id = payload.id;
  var url = `${URL}/users/${id}`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
}



export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};

export function addToCarta(payload) {
  try {
    Swal.fire({
      text: "Se ha agregado el producto",
      icon: "success",
      timer: 1500,
    });

    return {
      type: ADD_TO_CART,
      payload,
    };
  } catch {
    Swal.fire({
      text: "Error al agregar el producto",
      icon: "warning",
      timer: 1500,
    });
  }
}


export function remove1FromCart(payload) {
	return {
		type: REMOVE_ONE_FROM_CART,
		payload,
	};
}
export function removeFromCart(payload) {
	return {
		type: REMOVE_ALL_FROM_CART,
		payload,
	};
}



// export function filterProducts(categories, platform, price, license) {
// 	return function (dispatch) {
// 		return axios
// 			.get(
// 				`${URL}/products?categories=${categories}&platform=${platform}&price=${price}&license=${license}`,
// 			)
// 			.then((response) => {
// 				dispatch({
// 					type: FILTER_PRODUCTS,
// 					payload: response.data.rows,
// 				});
// 			})
// 			.catch((error) => {
// 				console.error('Error en la solicitud:', error);
// 			});
// 	};
// }

// export const setCombinedFilters = (filters) => {
// 	return {
// 		type: SET_COMBINED_FILTERS,
// 		payload: filters,
// 	};
// };

export const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: cart,
  };
};



// export function setCurrentPage(page) {
//   return {
//     type: SET_CURRENT_PAGE,
//     payload: parseInt(page),
//   };
// }

// export function setProductsPerPage(count) {
//   return {
//     type: SET_PRODUCTS_PER_PAGE,
//     payload: count,
//   };
// }

// export function getCategoryRoute() {
// 	return function (dispatch) {
// 		return axios
// 			.get(`${URL}/categories`)
// 			.then((response) => {
// 				const categories = response.data.map(
// 					(category) => category.name,
// 				);
// 				dispatch({
// 					type: GET_CATEGORY_ROUTE,
// 					payload: categories,
// 				});
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	};
// }
// se agregaron las dos acciones getPlatformsRoute y getLicensesRoute y se crearon las constantes GET_PLATFORMS_ROUTE y GET_LICENSES_ROUTE (agregarlas a la carpeta consts)
// export function getPlatformsRoute() {
// 	return function (dispatch) {
// 		return axios
// 			.get(`${URL}/platforms`)
// 			.then((response) => {
// 				const platforms = response.data.map(
// 					(platforms) => platforms.name,
// 				);
// 				dispatch({
// 					type: GET_PLATFORMS_ROUTE,
// 					payload: platforms,
// 				});
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	};
// }

// export function getLicensesRoute() {
// 	return function (dispatch) {
// 		return axios
// 			.get(`${URL}/licenses`)
// 			.then((response) => {
// 				const licenses = response.data.map((licenses) => licenses.name);
// 				dispatch({
// 					type: GET_LICENSES_ROUTE,
// 					payload: licenses,
// 				});
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	};
// }

export const fetchProducts = (filters) => {
  const {
    name,
    quantity,
    quantitygte,
    quantitylte,
    price,
    pricegte,
    pricelte,
    categories,
    order,
    direction,
    page,
    platforms,
    licenses,
  } = filters;

  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/products", {
        params: {
          name,
          quantity,
          quantitygte,
          quantitylte,
          price,
          pricegte,
          pricelte,
          categories,
          order,
          direction,
          page,
          platforms,
          licenses,
        },
      });
      console.log("ESTOY EN FETCHPRODUCTS:", categories)

      if (response.data.rows.length === 0) {
        // Handle the case when there are no products matching the filters
        dispatch(setProducts([]));
      } else {
        dispatch(setProducts(response.data));
      }
    } catch (error) {
      console.log("ERROR:", error);
      dispatch(setProducts([])); // Set an empty array if there's an error
    }
  };
};

  export const fetchCategories = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/Categories`);
        console.log("categories:", response);
        
        dispatch(setCategories(response.data));
      } catch (error) {
        console.log(error);
      }
    };
  };