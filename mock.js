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
      pixel: 'src/components/assets/images/spriteBulbasaur.png',
      weight: "6'9 kg",
      height: "0'7 m",
      description:
        'Una rara semilla fue plantada en su espalda al nacer. La planta brota y crece con este Pokémon'
    },
    {
      name: 'Charmander',
      type: 'Fuego',
      number: '04',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Pok%C3%A9mon_Charmander_art.png',
      pixel: 'src/components/assets/images/spriteCharmander.png',
      weight: "8'5 kg",
      height: "0'6 m",
      description:
        'Prefiere los sitios calientes. Dicen que cuando llueve sale vapor de la punta de su cola'
    },
    {
      name: 'Squirtle',
      type: 'Agua',
      number: '07',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/59/Pok%C3%A9mon_Squirtle_art.png',
      pixel: 'src/components/assets/images/spriteSquirtle.png',
      weight: "9'0 kg",
      height: "0'5 m",
      description:
        'Tras nacer, su espalda se hincha y endurece como una concha. Echa potente espuma por la boca'
    },
    {
      name: 'Pikachu',
      type: 'Electricidad',
      number: '25',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png',
      pixel: 'src/components/assets/images/spritePikachu.png',
      weight: "6'0 kg",
      height: "0'4 m",
      description:
        'Cuando varios de estos Pokémon se juntan, su energía puede causar fuertes tormentas'
    },
    {
      name: 'Psyduck',
      type: 'Agua',
      number: '54',
      image: 'https://upload.wikimedia.org/wikipedia/it/thumb/3/32/Psyduck.png/1200px-Psyduck.png',
      pixel: 'src/components/assets/images/spritePsyduck.png',
      weight: "19'6 kg",
      height: "0'8 m",
      description:
        'Aunque calma al enemigo con su vacía mirada, este Pokémon usará poderes psicoquinéticos'
    },
    {
      name: 'Mewtwo',
      type: 'Psiquico',
      number: '150',
      image:
        'https://images.wikidexcdn.net/mwuploads/wikidex/d/d3/latest/20190408034831/Mewtwo.png',
      pixel: 'src/components/assets/images/spriteMewtwo.png',
      weight: '122 kg',
      height: "2'0 m",
      description:
        'Fue creado por un científico tras años de horribles experimentos de ingeniería genética'
    }
  ]
  res.send(response)
})
