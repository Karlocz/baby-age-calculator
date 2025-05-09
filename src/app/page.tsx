'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInDays, parseISO } from "date-fns";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    const date = parseISO(birthDate);
    const now = new Date();
    const days = differenceInDays(now, date);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    setResult(`Dias: ${days}, Semanas: ${weeks}, Meses: ${months}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-pink-200 to-blue-200 p-4">
      {/* Componente de Perfil */}
      <div className="text-center mb-8">
        <img
          src="/images/your-photo.jpg" // Substitua pela sua imagem
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-primary mb-2">John Doe</h1> {/* Substitua pelo nome */}
        <p className="text-lg text-secondary">Calculadora de Idade do Bebê</p>
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
