"use client";
import { useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import SearchBar from "./searchbar";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

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

interface Link {
  href: string;
}
interface Links {
  first: Link;
  self: Link;
  next?: Link;
  last: Link;
}

interface EmbeddedPokemonMoveList {
  pokemonmoveList: PokemonMove[];
}

interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface PokemonMoveResponse {
  _embedded: EmbeddedPokemonMoveList;
  _links: Links;
  page: PageInfo;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [size] = useState("100");
  const [loadPage, setLoadPage] = useState(false);
  const [load, setLoad] = useState(true);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [moveData, setMoveData] = useState<PokemonMove[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const musicpokemonSound = useRef<HTMLAudioElement | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL as string;

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: "bg-gray-200 text-gray-800",
      fire: "bg-red-100 text-red-800",
      water: "bg-blue-100 text-blue-800",
      electric: "bg-yellow-100 text-yellow-800",
      grass: "bg-green-100 text-green-800",
      ice: "bg-cyan-100 text-cyan-800",
      fighting: "bg-orange-100 text-orange-800",
      poison: "bg-purple-100 text-purple-800",
      ground: "bg-amber-100 text-amber-800",
      flying: "bg-indigo-100 text-indigo-800",
      psychic: "bg-pink-100 text-pink-800",
      bug: "bg-lime-100 text-lime-800",
      rock: "bg-stone-100 text-stone-800",
      ghost: "bg-violet-100 text-violet-800",
      dragon: "bg-sky-100 text-sky-800",
      dark: "bg-slate-200 text-slate-800",
      steel: "bg-zinc-100 text-zinc-800",
      fairy: "bg-rose-100 text-rose-800",
    };

    return typeColors[type.toLowerCase()] || "bg-gray-200 text-gray-800";
  };


  const playMusic = () => {
    clickSound.current?.play()
    if (musicpokemonSound.current) {
      if (musicpokemonSound.current.paused) {
        musicpokemonSound.current.volume = 0.1;
        musicpokemonSound.current.play();
        setIsPlaying(true);
      } else {
        musicpokemonSound.current.pause();
        setIsPlaying(false);
      }
    }
  };
  const pokemonMoveData = async () => {
    try {
      const apiUrl = `${apiBase}pokemonmoves?page=${page}&size=${size}`;
      const res: AxiosResponse<PokemonMoveResponse> = await axios.get(apiUrl);
      const newMoves = res.data._embedded.pokemonmoveList;
      setMoveData((prev) => (prev ? [...prev, ...newMoves] : newMoves));
      setTotalPages(res.data.page.totalPages);
      setLoad(false);
      setLoadPage(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
      } else {
        console.error("Unknown error occurred.");
      }
    }
  };
  useEffect(() => {
    pokemonMoveData();
  }, [page, apiBase]);
  useEffect(()=>{
    setLoadPage(true);
  },[page])
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 py-10 px-4">
      <img className="cursor-pointer  fixed bottom-10 right-10 hidden md:block" src={isPlaying ? "/pokemonsing.gif" : "/pokemonsing.png"} onClick={()=>playMusic()} alt="" />
      <audio ref={musicpokemonSound} src="/pokemonmusic.mp3" loop preload="auto"></audio>
      <audio ref={clickSound} src="/mouseclick.mp3" preload="auto"></audio>
      <Card className="w-full max-w-5xl shadow-sm bg-white">
        <div className="p-6">
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              POKEMON MOVE แปล ไทย
            </h1>
            <SearchBar setmove={setMoveData} setloading={setLoad} />
            {load ? (
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b">
                        <TableHead>ID</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>ความแม่นยำ</TableHead>
                        <TableHead>พลัง</TableHead>
                        <TableHead>ประเภทดาเมจ</TableHead>
                        <TableHead>PP</TableHead>
                        <TableHead>ผลกระทบ</TableHead>
                        <TableHead>ธาตุ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {moveData?.map((move) => (
                        <TableRow
                          key={move.id}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <TableCell>{move.id}</TableCell>
                          <TableCell>{move.name}</TableCell>
                          <TableCell>{move.accuracy ?? "-"}</TableCell>
                          <TableCell>{move.power ?? "-"}</TableCell>
                          <TableCell>{move.damage_class}</TableCell>
                          <TableCell>{move.pp}</TableCell>
                          <TableCell className="whitespace-normal break-words max-w-[240px]">
                            {move.effect}
                          </TableCell>
                          <TableCell className="capitalize">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                                move.type
                              )}`}
                            >
                              {move.type}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {loadPage ? (
                  <div
                    role="status"
                    className="flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  (totalPages === null || page + 1 < totalPages) && (
                    <div className="flex justify-center items-center w-full">
                      <button
                        onClick={() => {clickSound.current?.play(); setPage((prev) => prev + 1);}}
                        className="mt-6 px-4 py-2 bg-black text-white w-full rounded hover:bg-gray-700 transition cursor-pointer"
                      >
                        Load More
                      </button>
                    </div>
                  )
                )}
              </>
            )}
          </>
        </div>
      </Card>
    </div>
  );
}
