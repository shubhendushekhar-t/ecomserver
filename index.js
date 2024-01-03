import express from 'express';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'

const app = express()

app.use(express.json())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.get('/', (req, res) => {
  res.send({
    message:'Welcome to the app'
  })
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})