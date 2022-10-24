/*import base64 from 'react-native-base64';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hdgroup-users';
const bucketName = 'hdgroup-client-storage';
const s3Subfolder = 'data';

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    const image = userInfo.image;
    const image_body = base64.b64decode(userInfo.image['body']);
    const image_splitter = image.split('.')
    const key = image_splitter[0] + '_' + String(uuid.uuid4()) + '.' + image_splitter[1]
    const urlpath = '{}/{}/{}'.format(s3.meta.endpoint_url, bucket, key)

    response = s3.put_object(
        Body = image_body,
        Bucket = bucket,
        Key = key
    )

    if(!username || !name || !email || !password || !image){
        return util.buildResponse(401, {
            message: 'All fields are required!'
        })
    }

    if(!image.name.match(/\.(jpg|jpeg|png|gif)$/)){
        return util.buildResponse(401, {
            message: 'Invalid Image. Please select valid image.'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());
    if(dynamoUser && dynamoUser.username){
        return util.buildResponse(401, {
            message: 'Username is already existed. Please choose the different username.'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);

    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW,
        url: urlpath
    }

    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse){
        util.buildResponse(503, { message : 'Server Error! Please try again later.' });
    }
    
    return util.buildResponse(200, { username: username });
}

/*async function saveImage(requestBody){
        const imageName = requestBody.split('\r\n')[1].split(';')[2].split('=')[1].replace(/^"|"$/g, '').trim();
        const imageContent = requestBody.split('\r\n')[4].trim();
        const params = {
            Bucket: bucketName,
            Key: `${s3Subfolder}/${imageName}`,
            Body: imageContent
        }
        await s3.putObject(params).promise();
        return util.buildResponse(200, { image: image});
    }

async function getImage(bucketKey){
    const params = {
        Bucket: bucketKey.Bucket,
        Key: bucketKey.Key
    };

    return await s3.getObject(params).promise().then(response => {
        return response.image;
    }, error => {
        console.error("There is an error in getting image: ", error);
    })
}

async function getUser(username){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamoDb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error("There is an error in getting user: ", error);
    })
}

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamoDb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error("There is an error in saving user: ", error);
    });
}

module.exports.register = register;*/

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hdgroup-users';

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    /*const image = userInfo.image;*/

    if(!username || !name || !email || !password){
        return util.buildResponse(401, {
            message: 'All fields are required!'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());
    if(dynamoUser && dynamoUser.username){
        return util.buildResponse(401, {
            message: 'Username is already existed. Please choose the different username.'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    
    /*const isImage = require('is-image');
    if(isImage(image) == false){
        return util.buildResponse(401, {
            message: 'Invalid image file type!'
        })
    }*/

    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW,
        /*image: image*/
    }

    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse){
        util.buildResponse(503, { message : 'Server Error! Please try again later.' });
    }
    
    return util.buildResponse(200, { username: username });
}

async function getUser(username){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamoDb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error("There is an error in getting user: ", error);
    })
}

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamoDb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error("There is an error in saving user: ", error);
    });
}

module.exports.register = register;