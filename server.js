const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');


const app = express();

//allow cros origin request
app.use(cors());

app.use('/graphql', expressGraphQL({
   schema,
   graphiql: true
}))

app.listen(5000, () => {
   console.log('Ready and listening');
})