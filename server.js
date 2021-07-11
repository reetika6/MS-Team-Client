const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const cors = require('cors');
const path = require('path');
const history = [];

//const Joi = require('joi'); //used for validation
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
// app.use(cors());

const PORT = process.env.PORT || 5000;

let socketObject;

app.get("/",(req,res) =>{
  res.send("Server is running.");
  res.redirect('/${socket.id}');
});

app.get("/history/:meetingId",(req,res)=>{
  const { meetingId } = req.params;
  socketObject.join(meetingId);
  res.send(history.find(obj => obj.receiver === meetingId));
})

io.on('connection', (socket) => {
  socketObject = socket;
  socket.emit('I',socket.id);
  socket.on('disconnect', () => {
    socket.broadcast.emit("callended");
  });

  socket.on('calluser',({userToCall, signalData,from,name}) =>{
    io.to(userToCall).emit('calluser',{signal:signalData,from,name});
  });

  socket.on("answercall",(data)=>{
    io.to(data.to).emit("callaccepted", data.signal);
  });

  socket.on("Message",(data)=>{
    const { receiver, sender, message }=data;
    let isHistoryAvailable=false;
    for(let i=0;i<history.length;i++){
      if(receiver===history[i].receiver){
        history[i].messages.push({sender,message});
        isHistoryAvailable=true;
      }
    }
    if(!isHistoryAvailable){
      history.push({receiver,messages:[{sender,message}]});
    }
    io.to(receiver).emit("recieved_message", { sender, message });
    console.log(history);
  });

});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

 
/*const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'The Dead', id: 3},
{title: 'The Killers', id: 4},
{title: 'Lorien', id: 5},
{title: 'The Lottery', id: 6},
{title: 'The Birds sjd', id: 7},
]
 
app.get('/books', (req,res)=> {
  res.send(books);
});
 
app.get('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
 
  if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
  res.send(book);
});
 
//CREATE Request Handler
app.post('/api/books', (req, res)=> {
 
  const { error } = validateBook(req.body);
  if (error){
  res.status(400).send(error.details[0].message)
  return;
}
const book = {
id: books.length + 1,
title: req.body.title
};
books.push(book);
res.send(book);
});
 
//UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
  const book = books.find(c=> c.id === parseInt(req.params.id));
  if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
  const { error } = validateBook(req.body);
  if (error){
  res.status(400).send(error.details[0].message);
  return;
}
 
book.title = req.body.title;
  res.send(book);
});
 
//DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {
 
  const book = books.find( c=> c.id === parseInt(req.params.id));
  if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
  const index = books.indexOf(book);
  books.splice(index,1);
 
res.send(book);
});
 
function validateBook(book) {
  const schema = {
  title: Joi.string().min(3).required()
};
return Joi.validate(book, schema);
 
}*/