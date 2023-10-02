"use client";
import { useGetResultsQuery } from "@/lib/redux/service/searchBarAPI";
import { useDispatch } from "@/lib/redux/hooks";
import {
  loadProducts,
  loadErrors,
  isLoadingItems,
} from "@/lib/redux/features/itemsSlice";
import { useState, useEffect } from "react";
import style from "./searchBar.module.css";
import Image from "next/image";


const SearchBar = () => {
  const [value, setValue] = useState("");
  const [searching, setSearching] = useState(false); // Nuevo estado para controlar la búsqueda
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetResultsQuery({ name: value });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    setSearching(true); // Cuando se hace clic en el botón de búsqueda, activamos la búsqueda
  };

  useEffect(() => {
    if (searching) { // Realizar la búsqueda solo cuando searching es true
      dispatch(isLoadingItems(isLoading));
      if (!isLoading) {
        dispatch(loadProducts(data));
        dispatch(loadErrors(isError));
        setSearching(false); // Desactivar la búsqueda después de completarla
      }
    }
  }, [isLoading, searching, data, isError]);
  console.log(data);

  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <button onClick={handleSearch}>
        <Image src='/lupa.png' width={30} height={30} alt='lupa'></Image>
      </button>
    </div>
  );
};

export default SearchBar;

//antes del original