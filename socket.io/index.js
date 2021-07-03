const io=require('socket.io')(8000,{cors:{origin:"*"}});

const users={};

// const io = require("socket.io")(http, {
//     cors: {
//         origin: "http://localhost:8000",
//         methods: ["GET", "POST"]
//     }
// })
// http.listen(3000)
io.on('connection', socket =>{
    socket.on('new-user-joined', name1 =>{
        // console.log("hello", name1);
        users[socket.id] = name1;

        // inform other users whenever someone joins
        socket.broadcast.emit('user-joined',name1);
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive' , {message:message,name1: users[socket.id]})
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left' ,  users[socket.id])
        delete users[socket.id]
    });
})