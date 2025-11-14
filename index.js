import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';  
import postRoutes from './routes/post.js'



const app = express();
const PORT = 3000;
// setup dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// setup view engine
app.set('view engine', 'ejs');


// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', postRoutes)


app.get('/', (req, res) => {
    res.render('home.ejs', { title: 'blogs' });
  }

);





// connect to MongoDB



mongoose.connect('mongodb+srv://hopesonkashoti_db_user:SktcX5ibKldGxzYB@cluster0.s6kixjb.mongodb.net/?appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () =>{
        console.log(`Server is running on http://localhost:${PORT}`);

    });

    
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});





