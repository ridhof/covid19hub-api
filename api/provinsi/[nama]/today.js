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
                const last_idx = timeline.length - 1;
                const row = timeline[last_idx];
                const toReturn = {
                    hari: null,
                    baru: row['kasus_positif'] - timeline[last_idx - 1]['kasus_positif'],
                    kumulatif: row['kasus_positif'],
                    perawatan: null,
                    perawatan_baru: null,
                    sembuh: row['kasus_sembuh'],
                    sembuh_baru: row['kasus_sembuh'] - timeline[last_idx - 1]['kasus_sembuh'],
                    meninggal: row['kasus_meninggal'],
                    meninggal_baru: row['kasus_meninggal'] - timeline[last_idx - 1]['kasus_meninggal'],
                    update: row['current_timestamp']
                };
                res.send(toReturn);
            });
        }
    });
}