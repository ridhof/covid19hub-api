const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
    const nama = req.query.nama
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
            
            db.collection('timeline_provinsi').find({ nama: nama }).toArray((err, result) => {
                if (err) res.send({"error": err});
                const timeline = result[0]["timeline_summary"];
                const toReturn = [];
                timeline.forEach(row => {
                    const temp = {
                        hari: null,
                        baru: null,
                        kumulatif: row['kasus_positif'],
                        perawatan: null,
                        sembuh: row['kasus_sembuh'],
                        meninggal: row['kasus_meninggal'],
                        update: row['current_timestamp']
                    };
                    toReturn.push(temp);
                });
                res.send(toReturn);
            });
        }
    });
}