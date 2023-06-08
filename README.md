# UrbanTide

<p>I first listed the main points. Some areas were completely new to me so I had to learn as I went<p>

#### Create a web API endpoint to accept a CSV file
<ul>
    <li>Using Node.js and Express.</li>
    <li>Installed Multer as suggested and learned what it does.</li>
    <li>Ensured the endpoints can handle file uploads and recieve CSV data. I attempted Postman but struggledand lost some time, so went with Insomnia.</li>
</ul>
<br>

#### Validate and process the CSV data

<ul>
    <li>Installed csv-parser as per research</li>
    <li>Iterated over the values in the CSV file and saved to new array</li>
    <li>Implemented oulier detection: Installed Mathjs to use mean and std to find the outlier. Other simpler methods could have been used I was led to a similar Python function during research and so converted this.</li>
    <li>If outlier found in CSV file return message and end, otherwise continue</li>
</ul>

#### Create SQL table

<ul>
    <li>Used the detected data tyoes from the CSV data to create the corresponding SQL table</li>
    <li>Ensure the table schema matches the inferred data types</li>
</ul>

#### Insert the cleaned data into an SQL container

<ul>
    <li>Used the detected data tyoes from the CSV data to create the corresponding SQL table</li>
    <li>Ensure the table schema matches the inferred data types</li>
</ul>


#### Downloaded and installed Docker

5.	Dockerize the application.
I get the feeling this should have been done first however my first time using Docker and on a learning curve.
•	Create a Dockerfile to define the application's container image.
•	Include the necessary dependencies and configurations in the Dockerfile.
•	Build the Docker image using the Dockerfile.
•	Use Docker Compose to connect the application container with the PostgreSQL container.
