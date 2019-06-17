# languagedetector-rest-api
A Node.js Restful API for detecting languages

#Setup 

Create a config file named 'nodemon.js' in the root directory with the following content

{
  "env": {
    "DB_CONNECTION": "mongodb+srv://<Connection here>",
    "JWT_SECRET_KEY": "<Secret KEY>",
    "JWT_EXPIRES": "<Expire time>",
    "DETECT_LANGUAGE_API_KEY": "<www.detectlanguage.com API KEY>"
  }
}

