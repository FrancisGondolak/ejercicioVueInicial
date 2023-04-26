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
         number: '01'
      },
      {
         name: 'Charmander',
         type: 'Fuego',
         number: '04'
      },
      {
         name: 'Squirtle',
         type: 'Agua',
         number: '07'
      },
      {
         name: 'Pikachu',
         type: 'Eléctrico',
         number: '25'
      },
      {
         name: 'Psyduck',
         type: 'Agua',
         number: '54'
      },
      {
         name: 'Mewtwo',
         type: 'Psíquico',
         number: '150'
      }
   ]
   res.send(response)
})
