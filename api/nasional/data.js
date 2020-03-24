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
            
            db.collection('timeline_summary').find({}, { kasus_baru: 0, hari_ke: 0 }).toArray((err, result) => {
                if (err) res.send({"error": err});
                const toReturn = [];
                result.forEach(row => {
                    const temp = {
                        hari: row['hari_ke'],
                        baru: row['kasus_baru'],
                        kumulatif: row['kasus_kumulatif'],
                        perawatan: row['dalam_perawatan'],
                        sembuh: row['sembuh'],
                        meninggal: row['meninggal'],
                        update: row['currentTimestamp']
                    };
                    if (temp['baru'] === null) temp['baru'] = 0;
                    if (!temp['update']) temp['update'] = null;
                    toReturn.push(temp);
                });
                res.send(toReturn);
            });
        }
    });
}