const { MongoClient, ServerApiVersion } = require('mongodb');
// yJJs29t7BZ2ni7XH
const uri = "mongodb+srv://jiaci:123456yjc@cluster0.3vh598h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//const uri = "mongodb+srv://kappahehexd1234:L6PAfD5yrgttFFM8@cluster0.miyq1sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
 serverApi: {
 version: ServerApiVersion.v1,
 strict: true,
 deprecationErrors: true,
 }
});
async function run() {
 try {
 // Connect the client to the server (optional starting in v4.7)
 await client.connect();
 // Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");
 } finally {
 await client.close(); // Ensures that the client will close when you finish/error
 }
}
run().catch(console.dir);

const express = require('express')
const bcrypt = require('bcrypt')
var cors = require('cors')
const jwt = require('jsonwebtoken')
// Initialize Express app
const app = express()
// Define a JWT secret key. This should be isolated by using env variables for security
// not useful at this moment
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'
// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
   })
   // The auth endpoint that creates a new user record or logs a user based on an existing record
   app.post('/auth',async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    // No checking this time, also successful login
    let loginData = {
    email,
    signInTime: Date.now(),
    }
    const token = jwt.sign(loginData, jwtSecretKey)
    return_message = 'success'
    await client.connect();
    const dbName = "sample_mflix";
    const collectionName = "users";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const findOneQuery = { email: email };

    /*const userInfo = 
        {
            email: "dummy@gmail.com",
            password: "12345678"
        };
    const result = collection.insertOne(userInfo)
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
     );*/
    try {
        const findOneResult = await collection.findOne(findOneQuery);
        if(req.body.register===true && findOneResult === null)
        {
             const user = 
             {   
                 email: req.body.email,
                 password: req.body.password,
                 gender: req.body.gender,
                 Birth: req.body.selected
             };
             const result = await collection.insertOne(user)   
             console.log(
                 `A document was inserted with the _id: ${result.insertedId}`,
             );
             return_message = 'signed in'
        }
        else{
        console.log("Already has existing user\n");
        if (findOneResult === null) {
        console.log("Couldn't find user.\n");
        return_message = 'fail'
      
        } else {
        console.log(`Found:\n${JSON.stringify(findOneResult)}\n`);
        if (findOneResult.password === password) {
        return_message = 'success'
        } else {
        return_message = 'fail'
        }
        }
        }
     } catch (err) {
        console.error(`Something went wrong trying to find one document: ${err}\n`);
        return_message = 'fail'
        }
        await client.close();      
    res.status(200).json({ message: return_message, token })
   })
   // The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token'
    const authToken = req.headers[tokenHeaderKey]
    try {
    const verified = jwt.verify(authToken, jwtSecretKey)
    if (verified) {
    return res.status(200).json({ status: 'logged in', message: 'success' })
    } else {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
    } catch (error) {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
   })
   // An endpoint to see if there's an existing account for a given email address
app.post('/check-account', (req, res) => {
    const { email } = req.body
   
    console.log(req.body)
   
    res.status(200).json({
    status: 'User exists',
    userExists: true,
    })
   })
app.post('/register',async(req,res)=>{
    /*if (userExists === true)
        return res.status(400).send('user alread exist')
    else{
        */
       if(req.body.register===true)
       {
            const user = 
            {   
                email: req.body.email,
                password: req.body.password
            };
            const result = collection.insertOne(user)   
            console.log(
                `A document was inserted with the _id: ${result.insertedId}`,
            );
       }
            
            //return res.status(201).json(user)
        /*
        catch(err){
            return res.status(400).json({message:err.message})
        }
    }*/
})
   app.listen(3080)

   // server.js
