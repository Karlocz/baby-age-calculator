'use client'

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInDays, parseISO, isValid } from "date-fns";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas"; // 👈 Importando a lib

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(null);
  const [gender, setGender] = useState<"male" | "female">("male");

  const cardRef = useRef<HTMLDivElement>(null); // 👈 Ref para capturar o cartão

  const onDrop = (acceptedFiles: any) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  function calculate() {
    const date = parseISO(birthDate);
    if (!isValid(date)) {
      setResult("Data de nascimento inválida. Tente novamente.");
      return;
    }
    const now = new Date();
    const days = differenceInDays(now, date);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    setResult(`Dias: ${days}, Semanas: ${weeks}, Meses: ${months}`);
  }

  async function downloadCard() {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name || "cartao-bebe"}.png`;
    link.click();
  }

  return (
    <main
      className={`flex min-h-screen items-center justify-center p-4 ${
        gender === "female" ? "bg-pink-200" : "bg-blue-200"
      } transition-colors duration-500`}
    >
      <Card className="max-w-md w-full text-center shadow-lg rounded-lg p-6">
        <CardContent>
          {/* 👇 Ref envolta de tudo que será exportado como imagem */}
          <div ref={cardRef} className="bg-white p-4 rounded-lg">
            {name && (
              <p className="text-xl font-semibold mb-4">
                Nome do Bebê: <span className="text-black">{name}</span>
              </p>
            )}

            {image && (
              <div className="flex justify-center mb-4">
                <img
                  src={image}
                  alt="Foto do Bebê"
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
            )}

            {result && <p className="text-lg font-medium mb-4">{result}</p>}
          </div>

          <Input
            type="text"
            placeholder="Nome do Bebê"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <div
            {...getRootProps()}
            className="w-full p-4 border-2 border-dashed rounded-md mb-4 cursor-pointer bg-white"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              Arraste e solte a foto do bebê aqui, ou clique para selecionar.
            </p>
          </div>

          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <Button className="mt-4 w-full bg-blue-500 text-white" onClick={calculate}>
            Calcular Idade
          </Button>

          {/* Botão para baixar cartão comemorativo */}
          {name && result && image && (
            <Button
              onClick={downloadCard}
              className="mt-4 w-full bg-green-500 text-white"
            >
              Baixar Cartão Comemorativo
            </Button>
          )}

          <div className="mt-4 flex justify-center space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <span className="ml-1">Menino</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              <span className="ml-1">Menina</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
