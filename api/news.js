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
            
            db.collection('news').find({}, {sort: {_id: -1}, limit: 10}).toArray((err, result) => {
                if (err) res.send({"error": err});
                const toReturn = [];
                result.forEach(row => {
                    const temp = {
                        id: row['_id'],
                        judul: row['title'],
                        sumber: row['url'],
                        update: row['timestamp']
                    };
                    toReturn.push(temp);
                });
                res.send(toReturn);
            });
        }
    });
}