//Import app 
const app = require('./app.js')

//Database
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);

//Server inicializacion 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

