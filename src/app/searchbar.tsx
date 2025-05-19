"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SearchDropdown from "./searchDropDown";
import Swal from "sweetalert2";
interface PokemonMove {
  id: number;
  name: string;
  accuracy: number | null;
  power: number | null;
  damage_class: string;
  pp: number;
  effect: string;
  type: string;
}
type SearchBarProps = {
  setmove: React.Dispatch<React.SetStateAction<PokemonMove[]>>;
  setloading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SearchBar({ setmove, setloading }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [moves, setMoves] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      onSearch(value);
    }
  };
  const onSearch = async (value: string) => {
    value = value.toLowerCase();
    if (!value) {
      setloading(true);
      const api_pokemonmove = `${process.env.NEXT_PUBLIC_API_URL}pokemonmoves?page=0&size=100`;
      const res = await axios.get(api_pokemonmove);
      setmove(res.data._embedded.pokemonmoveList);
      setloading(false);
    } else {
      setloading(true);
      try {
        const move = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}pokemonmoves/search?name=${value}`
        );
        setmove([move.data]);
        setloading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Swal.fire({
            title: `NOT FOUND!`,
            text: `ไม่มีชื่อ ${value} ในระบบ`,
            icon: "error",
          });
          setloading(true);
          const api_pokemonmove = `${process.env.NEXT_PUBLIC_API_URL}pokemonmoves?page=0&size=100`;
          const res = await axios.get(api_pokemonmove);
          setmove(res.data._embedded.pokemonmoveList);
          setloading(false);
        } else {
          Swal.fire({
            title: `ERROR!`,
            text: `ระบบเกิดข้อผิดพลาด`,
            icon: "error",
          });
          setloading(true);
          const api_pokemonmove = `${process.env.NEXT_PUBLIC_API_URL}pokemonmoves?page=0&size=100`;
          const res = await axios.get(api_pokemonmove);
          setmove(res.data._embedded.pokemonmoveList);
          setloading(false);
        }
      }
    }
  };
  const fetchmoves = async (keyword: string) => {
    keyword = keyword.toLowerCase();
    if (keyword.trim() === "") {
      setMoves([]);
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}pokemonmoves/autocomplete?keyword=${keyword}`
      );
      setMoves(res.data);
      setShowDropDown(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
        setMoves([]);
      } else {
        console.error("Unknown error occurred.");
        setMoves([]);
      }
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchmoves(value);
    }, 300);

    return () => clearTimeout(handler);
  }, [value]);
  const onSelect = (name: string) => {
    setValue(name);
    setShowDropDown(false);
  };
  return (
    <>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          className="border rounded w-full p-3 mt-5 mb-2 mr-5"
          placeholder="ค้นหาชื่อท่า"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => moves.length > 0 && setShowDropDown(true)}
          onBlur={() => setTimeout(() => setShowDropDown(false), 200)}
        />
        <button
          className="mt-5 mb-2 bg-black text-white p-4 w-[20%] mr-5 border rounded-xl cursor-pointer hover:bg-red-500"
          onClick={() => onSearch(value)}
        >
          ค้นหา
        </button>
      </div>
      <SearchDropdown
        moves={moves}
        showDropdown={showDropdown}
        onSelect={onSelect}
        inputRef={inputRef}
      />
    </>
  );
}
