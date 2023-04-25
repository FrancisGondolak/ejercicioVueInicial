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

app.get('/products/getAll', (req, res) => {
   const response = [
      {
         balance: '7.839',
         type: 'Cuenta',
         number: '**** **** **** **** **** 6993'
      },
      {
         balance: '',
         type: 'Tarjeta de débito',
         number: '**** **** **** **** 9959'
      },
      {
         balance: '',
         type: 'Tarjeta de débito',
         number: '**** **** **** **** 9959'
      },
      {
         balance: '7.839',
         type: 'Cuenta',
         number: '**** **** **** **** **** 6993'
      },
      {
         balance: '7.839',
         type: 'Cuenta',
         number: '**** **** **** **** **** 6993'
      },
      {
         balance: '7.839',
         type: 'Cuenta',
         number: '**** **** **** **** **** 6993'
      }
   ]
   res.send(response)
})
