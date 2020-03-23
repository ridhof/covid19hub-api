const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
    const uri = process.env.mongo_url;
    const client = new MongoClient(uri, {
        poolSize: 10, 
        bufferMaxEntries: 0, 
        // reconnectTries: 5000, 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    client.connect(err => {
        if (err) {
            res.code(400);
            res.json(err);
        } else {
            const db = client.db('covid19hubid');
            
            db.collection('timeline_summary').find({}).toArray((err, result) => {
                if (err) res.send({"error": err});
                res.send(result);
            });
        }
    });
}