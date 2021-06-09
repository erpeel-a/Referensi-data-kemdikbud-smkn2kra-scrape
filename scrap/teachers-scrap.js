const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://sekolah.data.kemdikbud.go.id/index.php/chome/profil/3163B699-ABEF-4C1D-8D2E-C67405A88C40'

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const tableContainer = $('#tableguru tr.small')
    const TeacherItem = [];
    let i = 1; 
    tableContainer.each(function () {
      const id = i++
      const Nama = $(this).find('td.sorting_1').text()
      const JenisKelamin = $(this).find('td.text-center').text();
      TeacherItem.push({
        id,
        Nama,
        JenisKelamin
      })
    })
    fs.writeFile('./data/guru-1.json', JSON.stringify(TeacherItem), err => {
      if (err) {
        console.log(err)
      }
    })
  }).catch(error => {
    console.log(error)
  })