const { Server } = require("socket.io");

const io = new Server(5500, { // Changed port to 5500
  cors: {
    origin: "http://127.0.0.1:5500", // Now the origin and server port match
    methods: ["GET", "POST"]
  }
});

//NODE SERVER WHICH WOULD HANDLE SOCKET IO CONNECTIONS
//to be able to use the module with the port 8000,would listen incoming events
const users = {};//for users 

//now io.on would listen to the connections which would be forming and socket.on would listen to the user joined
io.on('connection', socket=>{
    socket.on('new-user-joined', nam=>{
        // console.log("New User", nam)
        users[socket.id] = nam;
        socket.broadcast.emit('user-joined',nam)
        //here they would run the call back function

    });
    //2nd event
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{ message : message , nam : users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
