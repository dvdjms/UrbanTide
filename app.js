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
  host: 'db', // change to 'db' from docker-compose.yml
  user: "postgres", 
  password: 'password',
  database: 'urbantidedb',
  port: 5432,
});


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
            for(let i = 1; i < results.length; i++) {
                  outliers.push(parseFloat(results[i]._1));
            };
            const mean_ = math.mean(outliers)
            const std_ = math.std(outliers)

            z_score = outliers.filter((i) => (i - mean_)/std_ > threshold);
            
            if(z_score.length != 0) {
                  res.send({
                        message: 'contains outliers'
                  });
            }
            else {
                  const headerRow = Object.keys(results[0]);
                  const columns = headerRow.map((column) => column.trim());
                  console.log('headerRow', headerRow)
       
                  const dropTableQuery = `DROP TABLE IF EXISTS urbantidetable`;
                  
                  const createTableQuery = `
                        CREATE TABLE urbantidetable (
                              id SERIAL PRIMARY KEY, 
                              ${columns.map((column) => `"${column}" TEXT`)
                              .join(',\n')}
                        )`;

                  results.shift();

                  try {
                        await pool.query(dropTableQuery);
                        console.log('Table dropped successfully');

                        await pool.query(createTableQuery);
                        console.log('Table created successfully');

                        for (const row of results) {
                              const values = columns.map((column) => `'${row[column]}'`).join(', ');
                              const insertRowQuery = `INSERT INTO urbantidetable (${columns.join(', ')}) VALUES (${values})`;
                              await pool.query(insertRowQuery);
                        }
                        console.log('Rows inserted successfully');
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
