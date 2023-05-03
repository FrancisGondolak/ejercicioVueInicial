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
         image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Pok%C3%A9mon_Bulbasaur_art.png'
      },
      {
         name: 'Charmander',
         type: 'Fuego',
         number: '04',
         image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Pok%C3%A9mon_Charmander_art.png'
      },
      {
         name: 'Squirtle',
         type: 'Agua',
         number: '07',
         image: 'https://upload.wikimedia.org/wikipedia/en/5/59/Pok%C3%A9mon_Squirtle_art.png'
      },
      {
         name: 'Pikachu',
         type: 'Electricidad',
         number: '25',
         image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png'
      },
      {
         name: 'Psyduck',
         type: 'Agua',
         number: '54',
         image: 'https://upload.wikimedia.org/wikipedia/it/thumb/3/32/Psyduck.png/1200px-Psyduck.png'
      },
      {
         name: 'Mewtwo',
         type: 'Psiquico',
         number: '150',
         image: 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d3/latest/20190408034831/Mewtwo.png'
      }
   ]
   res.send(response)
})
