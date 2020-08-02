const puppeteer = require('puppeteer');

let browserPromise = puppeteer.launch({
    args: [
        '--no-sandbox',
    ]
});


module.exports = async function (req, res) {
    // verify a barcode was sent
    if (!req.body.barCode) {
        return res.status(422).send({ error: 'Bad barCode' })
    }

    let imageError;
    let imageURL;
    let nameError;
    let name;

    const barCode = req.body.barCode.toString() // data cleaning
    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    const URL1 = `https://barcodesdatabase.org/barcode/${barCode}`
    await page.goto(URL1, { waitUntil: 'networkidle2' });



    //attempt to fetch the image
    try {
        const [el] = await page.$x('//*[@id="internal-db"]/div/table/tbody/tr[4]/td[2]/img') //fetch image
        const src = await el.getProperty('src'); // retrieve src property
        imageURL = await src.jsonValue(); // turn data into a string
    }
    // handle error if applicable
    catch (e) {
        imageError = true;
        res.rend(e)
    }


    //attempt to fetch the title/name
    try {
        const [el2] = await page.$x('//*[@id="internal-db"]/div/table/tbody/tr[3]/td[2]')
        const txt2 = await el2.getProperty('textContent'); // gets the source
        name = await txt2.jsonValue(); //gets the source in string format
    }
    // handle error if applicable
    catch (e) {
        nameError = true;
        res.rend(e)
    }


    // There was no error in fetching the image! send image to client
    if (!imageError) {
        res.send({imageURL,name })
    }
    

    context.close();


}
























































































































/*

const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

let browserPromise = puppeteer.launch({
    args: [
        '--no-sandbox',
    ]
});



const scrapeInfo = async (barcode) => {

    let imageError;

    barcode = barcode.toString() // data cleaning



    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    const URL1 = `https://barcodesdatabase.org/barcode/${barcode}`
    await page.goto(URL1);



    //attempt to fetch the image
    try {
        const [el] = await page.$x('//*[@id="internal-db"]/div/table/tbody/tr[4]/td[2]/img') //fetch image
        const src = await el.getProperty('src'); // retrieve src property
        imageURL = await src.jsonValue(); // turn data into a string
    } catch (e) {
        functions.logger.log('There was a problem fetching the image')
        imageError = true;
        functions.logger.log(e)
    }
    if (!imageError) {
        functions.logger.log('imageURL', imageURL)
    }
    else {
        return imageURL
    }


    context.close();
}






module.exports = async function (req, res) {
    // verify a barcode was sent
    if (!req.body.barCode) {
        return res.status(422).send({ error: 'Bad barCode' })
    } else {
         res.respond( scrapeInfo(req.body.barCode) )
    }



}



*/










// const admin = require('firebase-admin');
// const puppeteer = require('puppeteer');  

// let browserPromise = puppeteer.launch({
//     args: [
//         '--no-sandbox',
//     ]
// });

// module.exports = async function (req, res) {
//     // verify a barcode was sent
//     if (!req.body.barCode) {
//         return res.status(422).send({ error: 'Bad barCode' })
//     } else {
//         return res.send(req.body.barCode)
//     }



// }
