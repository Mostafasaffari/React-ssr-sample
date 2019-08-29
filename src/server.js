const express = require("express");

const app = express();

app.get("/", async (request, response) =>{
    response.send("Fist Config...")
});



const listener = app.listen(process.env.PORT || 2048, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
