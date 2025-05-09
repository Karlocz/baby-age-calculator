'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInDays, parseISO } from "date-fns";
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState<string | null>(null);
  const [gender, setGender] = useState("male");

  // Função de cálculo da idade
  function calculate() {
    const date = parseISO(birthDate);
    const now = new Date();
    const days = differenceInDays(now, date);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    setResult(`Dias: ${days}, Semanas: ${weeks}, Meses: ${months}`);
  }

  // Função de drag-and-drop para upload de imagem
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Estilos do background baseados no sexo
  const pageBackground =
    gender === "female" ? "bg-pink-200" : "bg-blue-200";

  return (
    <main className={`flex min-h-screen items-center justify-center p-4 ${pageBackground}`}>
      {/* Componente de Perfil */}
      <div className="text-center mb-8">
        <div className="mb-4">
          {/* Upload Drag and Drop para a foto */}
          <div className="border-2 border-dashed p-8 rounded-xl">
            <div {...useDropzone({ onDrop })} className="flex flex-col items-center cursor-pointer">
              {image ? (
                <img
                  src={image}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full mb-4"
                />
              ) : (
                <p className="text-gray-500">Arraste a foto do bebê aqui</p>
              )}
            </div>
          </div>
        </div>

        {/* Campo para alterar o nome */}
        <Input
          className="mt-4 w-full max-w-xs mx-auto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do bebê"
        />
        <h1 className="text-3xl font-bold text-primary mb-2">{name}</h1>
      </div>

      {/* Radiobutton para escolher o sexo */}
      <div className="mb-8">
        <label className="mr-4">
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Menino
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Menina
        </label>
      </div>

      {/* Card para o cálculo */}
      <Card className="max-w-md w-full text-center">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Idade do Bebê</h2>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={calculate}>
            Calcular
          </Button>
          {result && <p className="mt-4 text-lg font-medium">{result}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
