'use client'

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
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [messageIndex, setMessageIndex] = useState(0);
  const cardRef = useRef(null);

  const funMessages = [
    "Cada risada é um pedacinho do céu!",
    "Seu sorriso ilumina o mundo!",
    "Tempo voa com tanta fofura!",
    "Cada segundo é um presente com você!"
  ];

  const faithMessages = [
    "Presente de Deus 💖",
    "Deus abençoe cada passo!",
    "Crescendo sob o olhar do Senhor.",
    "Pequeno milagre em nossos braços."
  ];

  const allMessages = [...funMessages, ...faithMessages];

  const randomMessage = () =>
    allMessages[Math.floor(Math.random() * allMessages.length)];

  const onDrop = (acceptedFiles: any) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
  });

  function calculate() {
    if (!birthDate) return;

    const now = new Date();
    const days = differenceInDays(now, birthDate);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const hours = differenceInHours(now, birthDate);
    const minutes = differenceInMinutes(now, birthDate);

    const firstBirthday = addYears(birthDate, 1);
    const timeToOneYearMs = differenceInMilliseconds(firstBirthday, now);
    const timeToOneYear = new Date(timeToOneYearMs);

    const timeLeft = `${Math.floor(timeToOneYearMs / (1000 * 60 * 60 * 24))} dias, ${timeToOneYear.getUTCHours()} horas e ${timeToOneYear.getUTCMinutes()} minutos para 1º aniversário.`;

    setResult(
      `Idade: ${days} dias, ${weeks} semanas, ${months} meses, ${hours} horas, ${minutes} minutos.\n⏳ ${timeLeft}`
    );
    setMessageIndex(Math.floor(Math.random() * allMessages.length));
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
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * allMessages.length);
    } while (newIndex === messageIndex);
    setMessageIndex(newIndex);
  }

  return (
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
          } bg-white/80 backdrop-blur`}
        >
          <CardContent>
            <h1 className="text-3xl font-bold mb-2">
              {gender === "female" ? "Idade da Bebê 💖👧" : "Idade do Bebê 💙👦"}
            </h1>

            {name && (
              <p className="text-xl font-semibold mb-2">
                {name} {gender === "female" ? "🧸" : "🍼"}
              </p>
            )}

            {result && (
              <p className="text-base italic text-gray-700 mb-4">
                “{allMessages[messageIndex]}”
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

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "dd/MM/yyyy") : "Data de nascimento"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button className="mt-4 w-full bg-blue-500 text-white" onClick={calculate}>
              Calcular Idade
            </Button>

            {result && (
              <>
                <pre className="mt-4 text-md font-medium whitespace-pre-wrap text-left bg-white/70 p-2 rounded-md">
                  {result}
                </pre>

                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={generateNewMessage}
                >
                  Nova Mensagem ✨
                </Button>
              </>
            )}

            <div className="mt-4 space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />{" "}
                Menino
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />{" "}
                Menina
              </label>
            </div>

            <Button className="mt-6 w-full bg-green-500 text-white" onClick={exportCard}>
              Exportar Cartão como Imagem
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
