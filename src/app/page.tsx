import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function BabyAgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [babyName, setBabyName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("girl");
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = parseISO(birthDate);
    const today = new Date();
    const totalDays = differenceInDays(today, birth);
    const weeks = Math.floor(totalDays / 7);
    const months = Math.floor(totalDays / 30.44); // média dos dias no mês

    setResult({ totalDays, weeks, months });
  };

  const themeColor = gender === "boy" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800";
  const titleColor = gender === "boy" ? "text-blue-600" : "text-pink-600";

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-white to-gray-100 flex flex-col items-center">
      <h1 className={cn("text-2xl font-bold mb-4", titleColor)}>Acompanhamento do Bebê</h1>
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nome do Bebê:</label>
            <Input value={babyName} onChange={(e) => setBabyName(e.target.value)} />

            <label className="text-sm font-medium">Data de Nascimento:</label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

            <label className="text-sm font-medium">URL da Foto:</label>
            <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

            <label className="text-sm font-medium">Gênero:</label>
            <div className="flex gap-2">
              <Button variant={gender === "girl" ? "default" : "outline"} onClick={() => setGender("girl")}>Menina</Button>
              <Button variant={gender === "boy" ? "default" : "outline"} onClick={() => setGender("boy")}>Menino</Button>
            </div>
          </div>
          <Button onClick={calculateAge}>Calcular</Button>

          {result && (
            <div className={cn("mt-4 rounded-xl p-4 shadow-sm text-center", themeColor)}>
              {photoUrl && <img src={photoUrl} alt="Bebê" className="w-24 h-24 object-cover rounded-full mx-auto mb-2" />}
              <h2 className="text-lg font-semibold">{babyName}</h2>
              <p className="italic text-sm">Cada dia é um novo milagre!</p>
              <div className="mt-2 space-y-1">
                <p><strong>Dias:</strong> {result.totalDays}</p>
                <p><strong>Semanas:</strong> {result.weeks}</p>
                <p><strong>Meses (aproximado):</strong> {result.months}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
