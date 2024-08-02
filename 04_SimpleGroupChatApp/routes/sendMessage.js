const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const msgFilePath = path.join(__dirname, 'messages.txt');

router.use(express.urlencoded({extended:true}));

router.get('/', (req,res,next)=>{
    fs.readFile(msgFilePath, 'utf-8', (err,data)=>{
        if(err && err.code==='ENOENT'){
            fs.writeFile(msgFilePath, '', 'utf-8',(err)=>{
                console.log(err);
            })
            sendForm(res, '');
        }
        else{
            const messages = data.split('\n').reverse().join('\n');
            sendForm(res, messages);
        }
    })
})

function sendForm(res, messages){
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Messages</title></head>
        <body>
        <form method="POST">
            <input type="text" id="message" name="message" required placeholder="Enter your message">
            <input type="hidden" id="username" name="username">
            <button type="submit">Send</button>
        </form>
        <h6>Messages:</h6>
        <pre>${messages}</pre>
        <script>
            document.getElementById('username').value = localStorage.getItem('username') || '';
        </script>
        </body>
        </html>
    `);
};

router.post('/', (req,res,next)=>{
    const username = req.body.username;
    const message = req.body.message;

    if(!username || !message){
        return res.status(400).send('Username and Message Required');
    }
    fs.appendFile(msgFilePath, `${username}: ${message}\n`, 'utf-8', (err)=>{
        if(err){
            console.log(err);   
        }
        res.redirect('/');
    });
})

module.exports = router;