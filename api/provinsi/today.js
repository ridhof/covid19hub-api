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
            
            db.collection('timeline_provinsi').find().toArray((err, result) => {
                if (err) res.send({"error": err});
                const toReturn = [];
                result.forEach(element => {
                    const timeline = element["timeline_summary"];
                    const last_idx = timeline.length - 1;
                    const row = timeline[last_idx];
                    const statistik_baru = {
                        "positif_baru": null,
                        "perawatan_baru": null,
                        "sembuh_baru": null,
                        "meninggal_baru": null
                    };
                    if (timeline[last_idx - 1]) {
                        statistik_baru["positif_baru"] = row['kasus_positif'] - timeline[last_idx - 1]['kasus_positif'];
                        statistik_baru["sembuh_baru"] = row['kasus_sembuh'] - timeline[last_idx - 1]['kasus_sembuh'];
                        statistik_baru["meninggal_baru"] = row['kasus_meninggal'] - timeline[last_idx - 1]['kasus_meninggal'];
                    }
                    const temp = {
                        nama: element["nama"],
                        hari: null,
                        baru: statistik_baru["positif_baru"],
                        kumulatif: row['kasus_positif'],
                        perawatan: null,
                        perawatan_baru: null,
                        sembuh: row['kasus_sembuh'],
                        sembuh_baru: statistik_baru["sembuh_baru"],
                        meninggal: row['kasus_meninggal'],
                        meninggal_baru: statistik_baru["meninggal_baru"],
                        update: row['current_timestamp']
                    };
                    toReturn.push(temp);
                });
                res.send(toReturn);
            });
        }
    });
}