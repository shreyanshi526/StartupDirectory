const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

let result = [];

const parseCSV = () => {
  return new Promise((resolve, reject) => {
    const result = [];

    fs.createReadStream('./data.csv')
      .pipe(csv())
      .on('data', (data) => result.push(data))
      .on('end', () => {
        //console.log(result);
        console.log('CSV parse success');
        resolve(result);
      })
      .on('error', (error) => {
        console.error(error);
        reject(error);
      });
  });
};

const getResult = async () => {
  if (result.length === 0) {
    try {
      result = await parseCSV();
    } catch (error) {
      throw error;
    }
  }
  return result;
};

module.exports = {
  getResult,
};
