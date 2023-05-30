const express = require('express')
const corss = require('cors')
const app = express()
const port = 8081

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(corss())
app.use(express.json())

// Middleware to intercept the response body, adding to locals so we can log later.
app.use((req, res, next) => {
  const oldJson = res.json
  res.json = (body) => {
    res.locals.body = body
    return oldJson.call(res, body)
  }
  next()
})

// Middleware to log in console the request and body response.
app.use(function (req, res, next) {
  if (req.url !== '/') {
    res?.on('finish', () => {
      const response = res.locals.body
      const details = {
        method: req?.method,
        url: req?.path,
        status: res.statusCode,
        code: res.statusMessage,
        body: response || {}
      }
      console.log(details)
    })
  }
  next()
})

app.post('/user/login', (req, res) => {
  const user = req.body
  console.log(user)
  if (user.username === 'Francisco' && user.password === 'Neoris') {
    res.send(true)
  } else {
    res.status(404).send({ data: 'User not found!' })
  }
})

app.get('/characters/getAll', (req, res) => {
  const response = [
    {
      name: 'Bulbasaur',
      type: 'Planta',
      number: '01',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Pok%C3%A9mon_Bulbasaur_art.png',
      pixel: 'src/components/assets/images/sprite',
      weight: "6'9 kg",
      height: "0'7 m",
      description:
        'Una rara semilla fue plantada en su espalda al nacer. La planta brota y crece con este Pokémon',
      movements:
        'Placaje, Gruñido, Látigo cepa, Desarrollo, Drenadoras, Hoja afilada, Polvo veneno, Somnífero, Bomba germen, Derribo, Dulce aroma, Síntesis, Abatidoras, Doble filo, Rayo solar',
      attacks: ['Placaje', 'Látigo cepa', 'Drenadoras', 'Somnífero'],
      lifePoints: 152,
      attackPoints: 111,
      defensePoints: 111
    },
    {
      name: 'Charmander',
      type: 'Fuego',
      number: '04',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Pok%C3%A9mon_Charmander_art.png',
      pixel: 'src/components/assets/images/sprite',
      weight: "8'5 kg",
      height: "0'6 m",
      description:
        'Prefiere los sitios calientes. Dicen que cuando llueve sale vapor de la punta de su cola',
      movements:
        'Arañazo, Gruñido, Ascuas, Pantalla de humo, Dragoaliento, Colmillo ígneo, Cuchillada, Lanzallamas, Cara susto, Giro fuego, Infierno, Envite ígneo',
      attacks: ['Arañazo', 'Ascuas', 'Dragoaliento', 'Cara susto'],
      lifePoints: 146,
      attackPoints: 114,
      defensePoints: 104
    },
    {
      name: 'Squirtle',
      type: 'Agua',
      number: '07',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/59/Pok%C3%A9mon_Squirtle_art.png',
      pixel: 'src/components/assets/images/sprite',
      weight: "9'0 kg",
      height: "0'5 m",
      description:
        'Tras nacer, su espalda se hincha y endurece como una concha. Echa potente espuma por la boca',
      movements:
        'Placaje, Látigo, Pistola agua, Refugio, Giro rápido, Mordisco, Hidropulso, Protección, Danza lluvia, Acua cola, Rompecoraza, Defensa férrea, Hidrobomba, Cabezazo',
      attacks: ['Placaje', 'Pistola agua', 'Refugio', 'Mordisco'],
      lifePoints: 151,
      attackPoints: 110,
      defensePoints: 128
    },
    {
      name: 'Pikachu',
      type: 'Electricidad',
      number: '25',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png',
      pixel: 'src/components/assets/images/sprite',
      weight: "6'0 kg",
      height: "0'4 m",
      description:
        'Cuando varios de estos Pokémon se juntan, su energía puede causar fuertes tormentas',
      movements:
        'Moflete estático, Encanto, Beso dulce, Ataque rápido, Impactrueno, Onda trueno, Doble equipo, Bola voltio, Chispa, Cola férrea, Chispazo, Rayo, Pantalla de luz, Trueno',
      attacks: ['Impactrueno', 'Encanto', 'Cola férrea', 'Trueno'],
      lifePoints: 142,
      attackPoints: 117,
      defensePoints: 101
    },
    {
      name: 'Psyduck',
      type: 'Agua',
      number: '54',
      image: 'https://upload.wikimedia.org/wikipedia/it/thumb/3/32/Psyduck.png/1200px-Psyduck.png',
      pixel: 'src/components/assets/images/sprite',
      weight: "19'6 kg",
      height: "0'8 m",
      description:
        'Aunque calma al enemigo con su vacía mirada, este Pokémon usará poderes psicoquinéticos',
      movements:
        'Arañazo, Látigo, Pistola agua, Confusión, Golpes furia, Hidropulso, Anulación, Cabezazo zen, Chirrido, Acua cola, Empapar, Autosugestión, Amnesia, Zona extraña',
      attacks: ['Arañazo', 'Pistola agua', 'Chirrido', 'Confusión'],
      lifePoints: 157,
      attackPoints: 114,
      defensePoints: 110
    },
    {
      name: 'Mewtwo',
      type: 'Psiquico',
      number: '150',
      image:
        'https://images.wikidexcdn.net/mwuploads/wikidex/d/d3/latest/20190408034831/Mewtwo.png',
      pixel: 'src/components/assets/images/sprite',
      weight: '122 kg',
      height: "2'0 m",
      description:
        'Fue creado por un científico tras años de horribles experimentos de ingeniería genética',
      movements:
        'Confusión, Meteoros, Gota vital, Poder pasado, Psicocorte, Amnesia, Esfera aural, Psíquico, Cambiafuerza, Cambiadefensa, Neblina, Onda mental, Recuperación, Premonición',
      attacks: ['Confusión', 'Recuperación', 'Poder pasado', 'Psíquico'],
      lifePoints: 166,
      attackPoints: 139,
      defensePoints: 115
    }
  ]
  res.send(response)
})
