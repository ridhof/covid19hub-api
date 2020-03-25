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
            res.send({"mongo": uri, "error": err});
        } else {
            const db = client.db('covid19hubid');
            
            db.collection('timeline_summary').find({}, {sort: {currentTimestamp: -1}, limit: 2}).toArray((err, result) => {
                if (err) res.send({"error": err});
                const row = result[0];
                const temp = {
                    hari: row['hari_ke'],
                    baru: row['kasus_baru'],
                    kumulatif: row['kasus_kumulatif'],
                    perawatan: row['dalam_perawatan'],
                    perawatan_baru: row['dalam_perawatan'] - result[1]['dalam_perawatan'],
                    sembuh: row['sembuh'],
                    sembuh_baru: row['sembuh'] - result[1]['sembuh'],
                    meninggal: row['meninggal'],
                    meninggal_baru: row['meninggal'] - result[1]['meninggal'],
                    update: row['currentTimestamp']
                };
                if (temp['baru'] === null) temp['baru'] = 0;
                if (!temp['update']) temp['update'] = null;
                res.send(temp);
            });
        }
    });
}