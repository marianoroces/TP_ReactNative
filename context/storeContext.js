import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});
  const [compradoresProductos, setCompradoresProductos] = useState({});
  const [compradores, setCompradores] = useState([
    {nombre: 'Pedro Garcia', email: 'pgarcia@gmail.com', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Juan Gonzalez', email: 'jgonzalez@gmail.com', color: 'yellow', id: Math.random().toString(10)},
    {nombre: 'Rodrigo Fernandez', email: 'rfernandez@gmail.com', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Martin Nuñez', email: 'mnuñez@gmail.com', color: 'green', id: Math.random().toString(10)},
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const agregarProductoAComprador = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return;
    }

    const compradorProductos = compradoresProductos[comprador.id] ?? [];
    if(!compradorProductos.includes(producto.id)){
      const newCompradoresProdcutos = {
        ...compradoresProductos,
        [comprador.id]: [...compradorProductos, producto.id],
      }
      setCompradoresProductos(newCompradoresProdcutos);
    }
  };

  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const quitarProductoDeComprador = (comprador, producto) => {
    if(!comprador?.id || !producto?.id) {
      return;
    }
    const compradorProductos = compradoresProductos[comprador.id] ?? [];
    if(compradorProductos.includes(producto.id)) {
      setCompradoresProductos({
        ...compradoresProductos,
        [comprador.id]: compradorProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const obtenerCompradoresDelProducto = (producto) => {
    const compradoresId = Object.keys(compradoresProductos);
    const compradoresIdDelProducto = compradoresId.reduce(
      (acc, cur) =>
        compradoresProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = compradores.filter((c) =>
      compradoresIdDelProducto.includes(c.id),
    );
    return results;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        obtenerCompradoresDelProducto,
        agregarProductoAComprador,
        quitarProductoDeComprador,
        compradores,
        setCompradores,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
