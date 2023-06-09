# UrbanTide

<p>This is an outline of my process. Some areas were completely new to me so I had to learn as I went. It was a struggle but I managed a good portion of the task. I'm happy to continue working on it.<p>
<br>


#### Create a web API endpoint to accept a CSV file
<ul>
    <li>Used Node.js and Express.</li>
    <li>Installed Multer as suggested to save uploads to folder</li>
    <li>Created a post function to parse the data, check for outliers, and post to postres. Multer was new to me so a learning curve but relatively straigtforward</li>
    <li>Ensured the endpoints can handle file uploads and receive CSV data. I attempted Postman but struggled and lost some time, so went with Insomnia.</li>
</ul>

#### Validate and process the CSV data

<ul>
    <li>Installed csv-parser as per research</li>
    <li>Iterated over the values in the CSV file and saved to new array</li>
    <li>Implemented oulier detection: Installed Mathjs to use mean and std to find the outlier.</li>
    <li>If outlier found in CSV file return message and end, otherwise continue.</li>
    <li>A copy of all uploads are saved for tracking purposes.</li>
</ul>

#### Create SQL table

<ul>
    <li>Attempted to use the headers from the csv file to create a table but have struggled with this. One moment is it there at the expense of losing other data and then vise versa. I'm very close though.</li>
    <li>Dropped the table on each run so not to repopulate the same table</li>
</ul>

#### Insert the cleaned data into table

<ul>
    <li>Iterated over the results and inserted into table.</li>
    <li>Didn't get around to ensuring correct data types.</li>
</ul>


#### Downloaded and installed Docker

<ul>
    <li>My first time using Docker and so quite the learning curve.</li>
    <li>Included the necessary dependencies and configurations in the docker-compose file and Dockerfile.</li>
    <li>Although docker runs the data doesn't load onto the database. I believe it's not connecting to postgres. I attempted to remove and rebuild a few times but needed more time to work this out.</li>
</ul>

<br>

### To run the code
<br>

Install the following dependencies:

```  
npm intall csv-parser express mathjs multer pg postgres
```
<br>
Docker is not connecting to postgres, however I continued development without docker.
<br>
<br>
To run outside of docker (host to be 'localhost' in app.js) run:

```
node app.js
```



To run docker change host to 'db' and run:

```
docker-compose up
```



