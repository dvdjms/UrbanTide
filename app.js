const express = require('express');
const multer  = require('multer');
const { create, all } = require('mathjs')
const math = create(all)
const csvParser = require('csv-parser');
const fs = require('fs');
const app = express();
const port = 8000;

const { Pool } = require('pg');

const pool = new Pool({
  host: 'db', // service name from docker-compose.yml
//   password: 'password',
//   database: 'urbantidedb',
//   port: 5432,
});

// const createDbQuery = 'CREATE DATABASE UrbanTideDB';
    
// pool.query(createDbQuery, (err, result) => {
//       if (err) {
//             console.error('Error creating database:', err);

//       } else {
//             console.log('Database created successfully');
//       }
// });


app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('csvFile'), (req, res) => {

      if(!req.file) {
            return res.status(400).send('No file uploaded');
      };

      if(req.file.mimetype !== 'text/csv') {
            return res.status(400).send('Uploaded file is not a CSV');
      };

      const results = [];

      fs.createReadStream(req.file.path)
      .pipe(csvParser({ headers: true }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
            const outliers = [];
            const threshold = 2;
            for(let i in results) {
                  outliers.push(parseFloat(results[i].value));
            };

            const mean_ = math.mean(outliers)
            const std_ = math.std(outliers)

            z_score = outliers.filter((i) => (i - mean_)/std_ > threshold);

            if(z_score.length != 0) {
                  console.log(z_score);
                  res.send({
                        message: 'contains outliers'
                  });
            }
            else{
                  const columns = Object.keys(results[0]).map((column) => 
                        column.trim()
                  );
                  const dropTableQuery = `DROP TABLE IF EXISTS urbantidetable`;

                  const createTableQuery = `
                        CREATE TABLE urbantidetable (
                              id SERIAL PRIMARY KEY, 
                              ${columns.map((column) => `"${column}" TEXT`)
                              .join(',\n')}
                        )`;

                  try {
                        await pool.query(dropTableQuery);
                        console.log('Table dropped successfully');

                        await pool.query(createTableQuery);
                        console.log('Table created successfully');

                        for (const row of results) {
                              const values = columns.map((column) => `'${row[column]}'`).join(', ');
                              const insertRowQuery = `INSERT INTO urbantidetable (${columns.join(', ')}) VALUES (${values})`;
                              await pool.query(insertRowQuery);
                              console.log('Row inserted successfully');
                        }
                        res.send({
                              data: results,
                        });
                  } catch (error) {
                        console.log("Error occurred', error")
                  } 
            }
      })
      .on('error', (error) => {
            console.error('CSV parsing Error:', error);
            res.status(500).send('CSV parsing Error');
      });
});


app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
});
