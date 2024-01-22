import { AppDataSource } from '../../data-source'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })
