#!/usr/bin/env node

const program = require('commander'),
      fs = require('fs')

const BLC = name => {
  return `const BLC = require(__dirname + '/../blc');
  const slc = require(__dirname + '/../../slc');

  module.exports = class ${name}BLC extends BLC {
    process(input){
      return new Promise((resolve, reject) => {
      });
    }
  };`
}

const createBLC = name => {
  const file = fs.createWriteStream(`${name}BLC.js`);
  file.on('error', err => { throw new Error(`Error: ${err}`) })
  file.write(BLC(name))
  file.end()
}

program
  .version('1.2.0')
  .description('A tool to manage the environment variables of an Elastic Beanstalk App')
  .usage('-c -n <name of BLC>')
  .option('-c, --create', 'create BLC')
  .option('-n, --name [name]', 'name of the Elastic Beanstalk environment to update')
  .parse(process.argv)

if(program.create) {
  createBLC(program.name)
}

