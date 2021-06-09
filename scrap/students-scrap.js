const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://sekolah.data.kemdikbud.go.id/index.php/chome/profil/3163B699-ABEF-4C1D-8D2E-C67405A88C40'

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const tableContainer = $('#siswatingkat > table > tbody > tr:nth-child(3)')
    const StudenntsItem = [];
    let i = 1;
    console.log(tableContainer.length);
    tableContainer.each(function () {
      const id = i++
      const Tingkat = $(this).find('td').text() 
      // #siswatingkat > table > tbody > tr:nth-child(3) > td:nth-child(1) //tingkar
      const Jumlah = $(this).find('td.text-right').text();
      // #siswatingkat > table > tbody > tr:nth-child(3) > td.text-right // jumlah
      StudenntsItem.push({
        id,
        Tingkat,
        Jumlah
      })
    })  
    fs.writeFile('./data/students.json', JSON.stringify(StudenntsItem), err => {
      if (err) {
        console.log(err)
      }
    })
  }).catch(error => {
    console.log(error)
  })