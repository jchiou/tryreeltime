var AWS = require('aws-sdk'); 
require('dotenv').config();
  
// var vids = require('../client/components/VideoChat.jsx');

var s3 = new AWS.S3(); //{apiVersion: '2006-03-01'}
AWS.config.update({accessKeyId: process.env.app_id, secretAccessKey: process.env.app_key});
AWS.config.update({region:'us-west-2'});

/////////////////////////
///////VIDEO POST////////
/////////////////////////

const postTheVideo = (videoFile) => {
  console.log('Posting videoFile to your AWS s3 bucket');
  //set the parameters for video posts
  var params = {
  	Bucket: process.env.bucket,
    Key: 'videoFile_kairos2.webm',
    Body: videoFile,
    ContentType: 'video/webm',
    ACL: 'public-read-write'
  };

  //CONNECT WITH THE BUCKET --once things work, experiment to make sure it is necessary
  s3.createBucket({Bucket: process.env.bucket}, function() {
    //put an object in the bucket -- change to post if works! 
    s3.putObject(params, function(err, data) {
        if (err)       
            console.log(err)     
        else       console.log("Successfully uploaded data to myBucket");   
     });
  });


  //set public and authenticated urls to return to the client! 
    var publicUrl = 'https://s3-us-west-1.amazonaws.com/' + params.Bucket + '/' + params.Key;
    var presignedUrl = s3.getSignedUrl('putObject', params);

    //send them off
    return {publicUrl:publicUrl, presignedUrl: presignedUrl};
};

/////////////////////////
///////PHOTO POST////////
/////////////////////////

// const postThePhoto = (photo) => {
//   console.log('Attempting post of videoFile to s3')
//  s3.createBucket({Bucket: process.env.bucket}, function() {
//   //THE BODY IS WHAT YOUR ARE INPUTTING, the KEY IS THE TITLE!
//   var params = {
//     Bucket: process.env.bucket,
//     Key: 'Photo for Kairos',
//     Body: photo,
//     ContentType: 'image/jpeg',
//     'Content-Transfer-Encoding': base64
//   };

//   s3.putObject(params, function(err, data) {
//       if (err) {    
//           console.log(err) 
//       }    
//       else {
//         console.log("Successfully uploaded data to myBucket" + data);
//         data; 
//       }
//   });

// });
// };

module.exports.postTheVideo = postTheVideo;



// | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control private | public-read | 
//Content-Type: application/pdf
//Content-Transfer-Encoding: base64
// var params = {Bucket: process.env.bucket, Key: 'key'};
// var url = s3.getSignedUrl('getObject', params);
//presigned
// console.log('The URL is', url);