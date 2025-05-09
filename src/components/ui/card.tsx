<main
  className={`flex min-h-screen items-center justify-center p-4 ${
    gender === "female" ? "bg-pink-200" : "bg-blue-200"
  } transition-colors duration-500`} // Mudança de cor de fundo baseada no gênero
>
  <Card className="max-w-md w-full text-center bg-white shadow-xl rounded-lg">
    <CardContent>
      <h1 className="text-3xl font-bold mb-4">Idade do Bebê</h1>
      <div className="mb-4">
        {/* Campo para nome do bebê */}
        <Input
          type="text"
          placeholder="Nome do Bebê"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
      </div>

      {/* Drag and Drop para imagem */}
      <div
        {...getRootProps()}
        className="w-full p-4 border-2 border-dashed rounded-md mb-4 cursor-pointer"
      >
        <input {...getInputProps()} />
        {image ? (
          <img
            src={image}
            alt="Foto do Bebê"
            className="w-full h-64 object-cover rounded-md"
          />
        ) : (
          <p>Arraste e solte a foto do bebê aqui, ou clique para selecionar.</p>
        )}
      </div>

      {/* Campo para data de nascimento */}
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Botão de calcular */}
      <Button className="mt-4 w-full bg-blue-500 text-white" onClick={calculate}>
        Calcular Idade
      </Button>

      {/* Exibe o resultado */}
      {result && <p className="mt-4 text-lg font-medium">{result}</p>}

      {/* Opções de gênero */}
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
    </CardContent>
  </Card>
</main>
