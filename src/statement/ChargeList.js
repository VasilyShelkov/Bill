import React from 'react';
import d3 from 'd3';
import { capitalizeAndSpaceString } from '../utilities';

const ChargeList = ({ charges }) => (
  <div className="row">
    {charges.map(
      charge =>
        <ChargeSection
          category={charge.category}
          color={charge.color}
          total={charge.breakdown.total}
          breakdown={
            Object.keys(charge.breakdown).reduce((chargeBreakdowns, currentBreakdown) => {
              if (currentBreakdown !== 'total') {
                return [
                ...chargeBreakdowns,
                {
                  breakdownName: currentBreakdown,
                  breakdown: charge.breakdown[currentBreakdown]
                }
                ];
              }

              return chargeBreakdowns;
            }, [])
          }
        />
    )}
  </div>
);

const ChargeSection = ({ category, color, total, breakdown }) => (
  <div className="ui segment" style={{ borderTop: `2px solid ${color}` }}>
    <div className="container fluid">
      <div className="row">
        <h1 className="ui left floated header">
          {capitalizeAndSpaceString(category)}
        </h1>
        <h2 className="ui right floated header" style={{ color }}>£{total}</h2>
      </div>
      {
        breakdown.length > 1 ?
          <MultiCategoryBreakdown breakdown={breakdown} sectionTotal={total} />
        :
        '<SingleCategoryBreakdown breakdown={breakdown[0]} />'
      }
    </div>
  </div>
);

const categoryColors = d3.scale.category20();
const MultiCategoryBreakdown = ({ breakdown, sectionTotal }) => (
  <div>
    <div className="row">
      <div style={{ width: '100%' }}>
        {
          breakdown.map((subCategory, i) => {
            const widthOfCategory = subCategory.breakdown.reduce((subCategoryTotal, currentItem) => {
              return subCategoryTotal + currentItem.cost;
            }, 0) / sectionTotal * 100;

            return (
              <span
                style={{
                  width: `${widthOfCategory}%`,
                  height: '20px',
                  backgroundColor: categoryColors(i),
                  display: 'inline-block'
                }}
              >
              </span>
            );
          })
        }
      </div>
    </div>
    <div>
      {
        breakdown.map((subCategory, i) => (
          <div className="ui segment">
            <h2 className="ui header" style={{ color: categoryColors(i) }}>
              {capitalizeAndSpaceString(subCategory.breakdownName)}
            </h2>
            <table className="ui very basic table">
              <thead>
                <tr>
                  {
                    Object.keys(subCategory.breakdown[0])
                    .reduce((headersWithoutCost, currentHeader) => {
                      if (currentHeader !== 'cost') {
                        return [
                        ...headersWithoutCost,
                        currentHeader
                        ];
                      }

                      return headersWithoutCost;
                    }, [])
                      .map(header => <th>{capitalizeAndSpaceString(header)}</th>)
                  }
                </tr>
              </thead>
              <tbody>
                {
                  subCategory.breakdown.map(itemInfo => (
                    <tr>
                      {
                        Object.keys(itemInfo).map(itemInfoContent => (
                          <td>{itemInfo[itemInfoContent]}</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ))
      }
    </div>
  </div>
);

export default ChargeList;

          // breakdown[0].reduce((categories, currentCategory) => {
//   const genericItemWithCost = Object.keys(currentCategory).reduce((itemVsCost, currentItem) => {
//     if (currentCategory === 'cost') {
//       return {
//         ...itemVsCost,
//         cost: currentCategory[currentItem]
//       }
//     }
//
//     return {
//       ...itemVsCost,
//       item: currentCategory[currentItem]
//     }
//   }, {})
//
//
// }, [])
