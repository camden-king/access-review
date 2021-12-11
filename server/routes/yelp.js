var express = require('express');
var router = express.Router();
const axios = require('axios');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../s.json');
require('dotenv').config()

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

initializeApp({
  credential: cert(serviceAccount)
})

let db = getFirestore()

/* GET */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', async function (req, res, next) {
  await db.collection('business').doc('test').set({
    name: 'test',
    address: 'test',
    city: 'test',
  })
  res.send('/test')
})

/* GET search results. */
router.get('/search', function(req, res, next){
  console.log(req.query)
  let out = {}
  let results = {}
  axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.query.q}&latitude=${req.query.lat}&longitude=${req.query.long}`, {headers: {Authorization: `Bearer ${process.env.YELP_API_KEY}`}})
  .then(response => {
    results = response.data
    response.data.businesses.map(function (business) {
      db.collection("business").doc(business.id).get()
      .then(doc => {
        if (doc.exists) {
          console.log('already exists', doc.data());
          out[business.id] = doc.data();
        } 
      })
      .catch(err => {
        console.log('Error getting document', err);
      })
    })
    res.send({yelp: results, access: out});
  })
  // .then(function () {
  //   console.log("sending", out)
  //   res.send({yelp: results, access: out});
  // })
  .catch(function (error) {
    console.log(error);
  }
  );
});

/* GET business results. */
router.get('/business', function(req, res, next) {
  console.log(req.query)
  axios.get(`https://api.yelp.com/v3/businesses/${req.query.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })  
  .then(response => {
    // console.log("jere")
    // db.ref(req.query.id).once('value').then(snapshot => {
    //   if (snapshot.val()) {
    //     console.log('already exists', snapshot.val())
    //     if (snapshot.val().access) {
    //       response.data.access = snapshot.val().access
    //     }
    //   } else {
    //     console.log('does not exist')
    //     db.ref(req.query.id).set({
    //       hi: false
    //     })
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    res.send(response.data)
  })
});

// router.post('/review', function(req, res, next) {
//   console.log(req.body)
//   db.ref('/reviews/' + req.body.id).once('value').then(snapshot => {
//     console.log(snapshot)})
//   name = req.body.rating.name
//   db.ref('/reviews/' + req.body.business_id + "/" + "reviews").set({
//     name: req.body.rating, 
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });
module.exports = router;
