import app from './app';
import config from 'config';


app.initialize?.().then(() => {
    app.listen(config.get('api.port'), () => {
      console.log(`Server is running on port ${config.get('api.port')}`);
    });
  });
  
  export default app;