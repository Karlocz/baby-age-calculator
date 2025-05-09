'use client'

import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  differenceInDays,
  parse,
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInMilliseconds,
  addYears
} from "date-fns";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRedo } from 'react-icons/fa';

export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("default");
  const [isCalculating, setIsCalculating] = useState(false);
  const cardRef = useRef(null);

  const onDrop = (acceptedFiles: any) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
  });

  const themeColors = {
    default: "bg-blue-100 border-blue-400",
    pink: "bg-pink-100 border-pink-400",
    green: "bg-green-100 border-green-400",
  };

  function calculate() {
    setIsCalculating(true);
    const date = parse(birthDate ? birthDate.toString() : '', "dd/MM/yyyy", new Date());
    const now = new Date();
    const days = differenceInDays(now, date);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const hours = differenceInHours(now, date);
    const minutes = differenceInMinutes(now, date);

    const firstBirthday = addYears(date, 1);
    const timeToOneYearMs = differenceInMilliseconds(firstBirthday, now);
    const timeToOneYear = new Date(timeToOneYearMs);

    const timeLeft = `${Math.floor(timeToOneYearMs / (1000 * 60 * 60 * 24))} dias, ${timeToOneYear.getUTCHours()} horas e ${timeToOneYear.getUTCMinutes()} minutos para 1º aniversário.`;

    setResult(
      `Idade: ${days} dias, ${weeks} semanas, ${months} meses, ${hours} horas, ${minutes} minutos.\n⏳ ${timeLeft}`
    );
    setIsCalculating(false);
  }

  function exportCard() {
    if (!cardRef.current) return;
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${name || "bebe"}-cartao.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  function generateNewMessage() {
    setResult("");
    setName("");
    setBirthDate(null);
    setImage(null);
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
      >
        {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      <main
        className={`flex min-h-screen items-center justify-center p-4 relative overflow-hidden ${
          gender === "female" ? "bg-pink-100" : "bg-blue-100"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 z-0" />
        <div className="relative z-10" ref={cardRef}>
          <Card
            className={`max-w-md w-full text-center shadow-2xl border-4 p-4 rounded-3xl transition-all duration-300 ${
              gender === "female" ? "border-pink-400 shadow-pink-300" : "border-blue-400 shadow-blue-300"
            } bg-white/80 backdrop-blur ${themeColors[selectedColor]}`}
          >
            <CardContent>
              <h1 className="text-3xl font-bold mb-2">
                {gender === "female" ? "Idade da Bebê 💖👧" : "Idade do Bebê 💙👦"}
              </h1>

              {name && (
                <p className="text-xl font-semibold mb-4">
                  {name} {gender === "female" ? "🧸" : "🍼"}
                </p>
              )}

              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Nome do Bebê"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                />
              </div>

              <div
                {...getRootProps()}
                className="w-full p-4 border-2 border-dashed rounded-md mb-4 cursor-pointer"
              >
                <input {...getInputProps()} />
                {image ? (
                  <div className="flex justify-center mb-2">
                    <img
                      src={image}
                      alt="Foto do Bebê"
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                ) : (
                  <p>Arraste e solte a foto do bebê aqui, ou clique para selecionar.</p>
                )}
              </div>

              <div className="mb-4">
                <DatePicker
                  selected={birthDate}
                  onChange={(date: Date) => setBirthDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <Button
                className={`mt-4 w-full ${isCalculating ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                onClick={calculate}
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculando...' : 'Calcular Idade'}
              </Button>

              {result && (
                <pre className="mt-4 text-md font-medium whitespace-pre-wrap text-left bg-white/70 p-2 rounded-md">
                  {result}
                </pre>
              )}

              <div className="mt-4">
                <label className="mr-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Menino
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Menina
                </label>
              </div>

              <Button
                className="mt-6 w-full bg-yellow-500 text-white"
                onClick={generateNewMessage}
              >
                Gerar Nova Mensagem
              </Button>

              <Button
                className="mt-6 w-full bg-green-500 text-white"
                onClick={exportCard}
              >
                Exportar Cartão como Imagem
              </Button>

              <select
                className="mt-4 w-full p-2 border rounded-md"
                onChange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              >
                <option value="default">Azul</option>
                <option value="pink">Rosa</option>
                <option value="green">Verde</option>
              </select>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
