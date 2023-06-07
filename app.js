const express = require('express');
const multer  = require('multer');
const { create, all } = require('mathjs')
const math = create(all)
const csvParser = require('csv-parser');
const fs = require('fs');
const app = express();
const port = 8000;


app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// app.get('/', (req, res) => {
//       res.send("Hello UrbanTide!")
// });


app.post('/upload', upload.single('csvFile'), (req, res) => {
      // req.body contains the text fields

      if(!req.file) {
            return res.status(400).send('No file uploaded');
      };

      if(req.file.mimetype !== 'text/csv') {
            return res.status(400).send('Uploaded file is not a CSV');
      };

      const results = [];

      const csvStream = csvParser()
      .on('data', (data) => results.push(data))
      .on('end', () => {
            const outliers = [];
            const threshold = 2;
            for(let i in results) {
                  outliers.push(results[i].value);
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
                  res.send({
                        data: results
                  });

                  // post to sql database
            };
      })
      .on('error', (error) => {
            console.error('Error occurred during CSV parsing:', error);
            res.status(500).send('Error occurred during CSV parsing');
      });
      const fileStream = fs.createReadStream(req.file.path);
      fileStream.pipe(csvStream);
});


app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
});
