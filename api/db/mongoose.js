const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/card-collector', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});