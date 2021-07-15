import { expect } from "chai";
import { parse, parseIterable } from "..";


describe('parse', function() {

  const csvText = "name,age,gender\nweilei,28,male";
  const specialCsvText = `name,remark
    weilei,"good, work"
    panda,"hello ""panda\nmonkey"""
  `;


  it('should parse the common csv text correctly', function() {
    const result = parse(csvText);
    expect(result).has.lengthOf(2);
    const row1 = result[0];
    expect(row1).is.an('array');
    expect(row1).has.lengthOf(3);
    expect(row1.join(',')).equal('name,age,gender');
  });

  it('should parse the special csv text correctly', function() {
    const result = parse(specialCsvText);
    expect(result).has.lengthOf(3);
    const row1 = result[0];
    expect(row1).is.an('array');
    expect(row1).has.lengthOf(2);
    expect(result[2].join(',')).equal('panda,hello ""panda\nmonkey""');
  });

});

describe('parseIterable', function() {

  const csvText = "name,age,gender\nweilei,28,male";

  it('should return an iterable object', function() {
    const result = [...parseIterable(csvText)];
    expect(result).has.lengthOf(2);
    const row1 = result[0];
    expect(row1).is.an('array');
    expect(row1).has.lengthOf(3);
    expect(row1.join(',')).equal('name,age,gender');
  });

});