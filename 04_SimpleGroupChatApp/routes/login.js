const express = require('express');
const router = express.Router();

router.get('/login',(req,res,next)=>{
    res.send(`
    <html>
    <head>
    <title>Login</title>
    </head>
    <body>
    <form action="/login" method="POST" onsubmit ="handleFormData(event)">
        <input type="Text" name="user_name" id="user_name">
        <button type="submit">Login</button>
    </form>
    </body>
    <script>
    function handleFormData(event){
        event.preventDefault();
        const userName = document.getElementById('user_name').value;
        localStorage.setItem('username', userName);
        event.target.submit();
    };
    </script>
    </html>    
    `);
});

router.post('/login',(req,res,next)=>{
    res.redirect('/');
})

module.exports = router;