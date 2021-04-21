const { httpGet } = require('./mock-http-interface');

/**
 * 
 * @param {string[]} urls an array of strings, with each string containing an url
 * @returns {Promise} A promise which resolves to a results array.
 */
const getArnieQuotes = async (urls) => {
   // Create promises array for every url passed
   //using a map to process them in parallel 
   const promises = urls.map(async(url) => await httpGet(url));

   // return a promise that resolves to the overall results array
   return Promise.all(promises).then((responseData) => {

    // results placeholder array
    let results = [];

    // Traverse through each of the resolved response and populate the results array
    responseData.forEach(element => 
    {  
      //extract the message by parsing the body
      let json = JSON.parse(element.body);

      // Based on the status code populate different result key-values
      if(element.status === 200){
        results.push({'Arnie Quote': json.message});
      }else{
        results.push({'FAILURE': json.message});
      }
   });

   // return the results array
   return results;
  })
};

module.exports = {
  getArnieQuotes,
};
