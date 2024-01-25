const express=require('express');
const { Client, Account, ID, Databases, Query }= require('appwrite');
const app=express();
const session=require("express-session");
const client = new Client();
const { MeiliSearch } = require('meilisearch');
const ejsMate = require("ejs-mate");
const path = require('path');
const methodOverride = require('method-override');


//For Meilisearch
const meiliclient = new MeiliSearch({
    host: 'https://noteapp-23s2.onrender.com',
    apiKey: 'aSampleMasterKey'
});
meiliclient.createIndex("notes", {primaryKey:"$id"});
//For Appwrite
client.setEndpoint('https://noteapp-23s2.onrender.com').setProject('65aee8ed472874999b6e');

const account = new Account(client);

const databaseId= "65b00592a63a9e8ae45b";
const collectionId= "65b0059e6482cfdea4bc";
const database= new Databases(client);

app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join("../frontend/","views"));
app.use(express.static(path.join("../frontend","public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.use (express.json());
app.use (session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true
}));

//Middleware - verifying user
function verifyUser(req, res, next){
    if(req.session.isLoggedIn){
        next();
    } else {
        //res.send ("not logged in");
        res.redirect("/login");
    };
};


app.get("/",verifyUser,async(req,res)=>{
    const response = await database.listDocuments(
        databaseId, 
        collectionId, 
        [Query.equal("createdBy", req.session.email)], 
        "desc", 
        "createdBy"
    );
    console.log(response);

    //SAVE IN Meilisearch
    await meiliclient.index('notes').addDocuments(response.documents)
        .then((res) => console.log(res)
    );
    //res.send(response);
    res.render("index", {data:response.documents, email:req.session.email});
});

//REGISTER EJS
app.get("/register", (req, res)=>{
    res.render("register", {error:""});
});

//Account creation
app.post("/register",async(req, res)=>{
    const {email, password, name}=req.body;
    account.create(ID.unique(), email, password, name)
    .then(response => {
        //console.log(response);
        res.redirect("/login");
        //res.send("Account Created");
    }, error => {
        //console.log(error);
        //res.send(error);
        res.render("register",{error:error.message});
    });
});

//LOGIN EJS
app.get("/login", (req, res)=>{
    res.render("login",{error:""});
});
//LOGIN
app.post("/login",async(req, res) =>{
    const {email, password}= req.body;

    account.createEmailSession(email, password). then((response)=>{
        console.log(response);
        req.session.isLoggedIn=true;
        req.session.email = email;

        res.redirect("/");
        //res.send("Login Successful");
    }, error => {
        console.log(error);
        //res.send(error);
        res.render("login",{error:error.message});
    });
});

//LOGOUT
app.get("/logout",(req, res) =>{
    req.session.destroy();
    res.redirect("/login");
});
//LOGOUT
app.get("/back",(req, res) =>{
    res.redirect("/");
});

//SEARCH NOTE
app.get("/search", verifyUser, async(req, res)=>{

    try{
        const data = await database.listDocuments(
            databaseId, 
            collectionId, 
            [Query.equal("createdBy", req.session.email)], 
            "desc", 
            "createdBy"
        );

        console.log(data);

        const query = req.query.q;
        const result = await meiliclient.index("notes").search(query);
        const hits = result.hits;

        const matchedDocument = data.documents.filter(
            (document)=> hits.some((hit)=> hit.$id === document.$id)
        )
        res.send(matchedDocument);
    } catch(e){
        res.send(error);
    }
});


app.get("/create",verifyUser, async (req, res) => {
    res.render("newnote")
});
//Create NOTE
app.post("/create",async(req, res) =>{
    const {title, note, createdBy} = req.body;
    const response= await database.createDocument(
        databaseId, collectionId, ID.unique(), {
            title: title,
            note: note,
            createdBy: req.session.email
        }
    ).then((response) =>{
        console.log(response);
        //res.send("Document created successfully");
        res.redirect("/");
    }, (error) =>{
        console.log(error);
        res.send(error);
    });
});

app.get("/edit/:id", verifyUser, (req, res) =>{
    res.render("edit",{
        id:req.params.id,
        title: req.query.title,
        note: req.query.note
    });
});

//UPDATE A NOTE
app.put("/edit/:id", verifyUser, async(req, res) =>{
    const id = req.params.id;
    const {title, note, createdBy} = req.body;
    const response = await database.updateDocument(databaseId, collectionId, id,
        {
            title: title,
            note: note,
            createdBy: createdBy
        }
    ).then((response)=>{
        //res.send(response);
        res.redirect("/");
    }, (error)=>{
        res.send(error)
    });
});

//DELETE A NOTE
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const response = await database.deleteDocument(databaseId,collectionId,id).then((response)=>{
            //res.send(response);
            res.redirect("/");
        }, (error)=>{
            res.send(error)
        }
    );
});

app.listen(3000, ()=>{
    console.log("Running on 3000")
});

