import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../css/Nav.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Carrito from "../img/Carrito.png";
import FilterComponent from "./FilterByCategorie";
import Ordenar from "./Ordenar";
import IconoUser from "../img/IconoUser.png";
import { AuthContext } from "./AuthContext";
import { searchByName } from "../redux/actions/actions";
import { useDispatch } from "react-redux";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Aquí puedes realizar la lógica de cierre de sesión, como limpiar las variables de sesión, etc.
    setIsLoggedIn(false);
    navigate("/login"); // Redireccionar al usuario a la página de inicio de sesión
    // logoutUser();
  };

  const handleOrdenarChange = (opcion) => {
    // Aquí puedes realizar acciones según la opción seleccionada en el componente Ordenar
    console.log("Opción de ordenamiento seleccionada:", opcion);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(searchByName(searchTerm));
  };

  const handleRefrescar = () => {
    pathname === "/home" && window.location.reload();
  };

  return (
    <div className={styles.Nav}>
      <div className={styles.DivLogo}>
        <a href="/home">
          <img className={styles.Logo} src={LogoClaro} alt="Logo" />
        </a>
      </div>
      {pathname !== "/" && (
        <div className={styles.DivCentral}>
          <Link to="/home">
            <button onClick={handleRefrescar} className={styles.ButtonNav}>
              Productos
            </button>
          </Link>
          <Link to="/vender">
            <button className={styles.ButtonNav}>Vender</button>
          </Link>
          <Link to="/wishlist">
            <button className={styles.ButtonNav}>Deseos</button>
          </Link>
          {pathname !== "/vender" && pathname !== "/carrito" && (
            <div>
              <div className={styles.FiltroDropdown}>
                <button className={styles.ButtonNav}>Filtrar</button>
                <div className={styles.FiltroContent}>
                  <FilterComponent />
                </div>
              </div>
              {/* <div className={styles.FiltroDropdown}>
              <button className={styles.ButtonNav}>Ordenar</button>
              <div className={styles.FiltroContent}>
                <Ordenar onOrdenarChange={handleOrdenarChange} />
              </div>
            </div> */}
            </div>
          )}
        </div>
      )}

      <div className={styles.DivLogin}>
        {pathname === "/" && (
          <Link to="/home">
            <button className={styles.ButtonNav}>Ingresar</button>
          </Link>
        )}
        {pathname !== "/" && pathname !== "/carrito" && (
          <Link to="/carrito">
            <button className={styles.Carrito}>
              <img src={Carrito} alt="Carrito" />
            </button>
          </Link>
        )}
        <div class={styles.PerfilDropdown}>
          <img src={IconoUser} alt="User" class={styles.Perfil} />
          <div class={styles.PerfilContent}>
            <Link to="/infocliente">
              <button className={styles.Iniciar}>Mi Perfil</button>
            </Link>
            <Link to="/compracliente">
              <button className={styles.Iniciar}>Mis Compras</button>
            </Link>
            {isLoggedIn ? (
              <Link to="/">
                <button onClick={handleLogout} className={styles.Cerrar}>
                  Cerrar Sesión
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className={styles.Iniciar}>Iniciar Sesión</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
