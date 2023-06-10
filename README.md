# UrbanTide

<p>This is an outline of my process. Some areas were completely new to me so I had to learn. It was a struggle but I believe I have succeeded with the main task. My biggest challenge was uploading the data to postgres with correct headers and rows. I finally discovered my cvs file contained Byte order mark (BOM), which are completedly new to me. I fixed this by finding a function to remove it from the data.</p>
<br>

#### Create a web API endpoint to accept a CSV file
<ul>
    <li>Used Node.js and Express.</li>
    <li>Installed Multer as suggested to save uploads to folder.</li>
    <li>Created a post function to parse the data based on documentaion, check for outliers, and post to postgres. Multer was new to me so a learning curve but relatively straigtforward<./li>
    <li>Ensured the endpoints can handle file uploads and receive CSV data. I attempted Postman but struggled and lost some time, so went with Insomnia.</li>
</ul>

#### Validate and process the CSV data

<ul>
    <li>Installed csv-parser as per research.</li>
    <li>Iterated over the 'values' in the CSV file and saved to new array.</li>
    <li>Implemented oulier detection on this array: Installed Mathjs to use mean and std to find the outlier.</li>
    <li>If outlier found in CSV file return message and end, otherwise continue.</li>
    <li>A copy of all uploads are saved for tracking purposes.</li>
</ul>

#### Create SQL table

<ul>    
    <li>Ran code to create database called urbantidedb - a one off so deleted the code.</li>
    <li>Iterated over the headers and wrote sql query to create table with headers from csv file.</li>
    <li>Also created a drop table function to remove table on each run.</li>
</ul>

#### Insert the cleaned data into table

<ul>
    <li>Iterated over the results and inserted into table.</li>
    <li>Didn't get around to ensuring correct data types.</li>
</ul>


#### Downloaded and installed Docker

<ul>
    <li>My first time using Docker and so quite the learning curve.</li>
    <li>Looked through the documentation and various websites.</li>
    <li>Included the necessary dependencies and configurations in the docker-compose file and Dockerfile.</li>
    <li>After several attempts with lots of tinkering and rebuilds the postgres and app.js containers run nicely.</li>
</ul>

<br>

### To run the code
<br>

Install the following dependencies:

```  
npm intall csv-parser express mathjs multer pg postgres
```
<br>

First create a database name urbantidedb then run docker:

```
docker-compose up
```



