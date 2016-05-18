import expect from 'expect';
import { capitalizeAndSpaceString, groupCostsOfSameItems, splitCostFromItem } from './utilities';

describe('#utilities', () => {
  it('should capitalise the first letter and put spaces in camelCase string', () => {
    const inputString = 'skyStoreRulesTheWorld';
    const expectedOutputString = 'Sky Store Rules The World';

    expect(
      capitalizeAndSpaceString(inputString)
    ).toEqual(expectedOutputString);
  });

  it('should split objects with cost and other details into their own properties in an object', () => {
    const inputObject = [{
      cost: 1,
      otherDetail: 'example',
      moreOtherDetails: 'moreExample'
    }, {
      cost: 2,
      otherDetail: 'example',
      moreOtherDetails: 'moreExample'
    }];
    const expectedOutputObject = [{
      item: {
        otherDetail: 'example',
        moreOtherDetails: 'moreExample'
      },
      cost: 1
    }, {
      item: {
        otherDetail: 'example',
        moreOtherDetails: 'moreExample'
      },
      cost: 2
    }];

    expect(
      splitCostFromItem(inputObject)
    ).toEqual(expectedOutputObject);
  });

  it('should group items that have been split by cost and other details and sum their costs', () => {
    const inputObject = [{
      item: {
        otherDetail: 'example',
        moreOtherDetails: 'moreExample'
      },
      cost: 1
    }, {
      item: {
        otherDetail: 'example',
        moreOtherDetails: 'moreExample'
      },
      cost: 2
    }];
    const expectedOutputObject = [{
      item: {
        otherDetail: 'example',
        moreOtherDetails: 'moreExample'
      },
      cost: 3
    }];

    expect(
      groupCostsOfSameItems(inputObject)
    ).toEqual(expectedOutputObject);
  });
});
