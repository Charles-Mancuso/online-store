const app = require("./server/server");

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});