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
          <SingleCategoryBreakdown
            name={breakdown[0].breakdownName}
            breakdown={breakdown[0].breakdown}
            sectionTotal={total}
          />
      }
    </div>
  </div>
);

const categoryColors = d3.scale.category20();
const SingleCategoryBreakdown = ({ name, breakdown, sectionTotal }) => {
  const categoriesWithCostSplit = breakdown.map(chargeItem => ({
    item: Object.keys(chargeItem).reduce((itemWithoutCostKey, currentKey) => {
      if (currentKey !== 'cost') {
        return {
          ...itemWithoutCostKey,
          [currentKey]: chargeItem[currentKey]
        };
      }

      return itemWithoutCostKey;
    }, {}),
    cost: chargeItem.cost
  }));

  const aggregatedCosts = categoriesWithCostSplit.reduce((breakdownCategories, currentItem) => {
    const indexOfCategory = breakdownCategories.findIndex(categoryItem =>
      JSON.stringify(categoryItem.item) === JSON.stringify(currentItem.item)
    );

    if (indexOfCategory !== -1) {
      return [
        ...breakdownCategories.slice(0, indexOfCategory),
        {
          ...breakdownCategories[indexOfCategory],
          cost: breakdownCategories[indexOfCategory].cost + currentItem.cost,
        },
        ...breakdownCategories.slice(indexOfCategory + 1),
      ];
    }

    return [
      ...breakdownCategories,
      currentItem
    ];
  }, []);

  const coloredBreakdown = categoriesWithCostSplit.map(category => {
    const categoryColor = categoryColors(aggregatedCosts.findIndex(categoryItem =>
      JSON.stringify(categoryItem.item) === JSON.stringify(category.item)
    ));
    return {
      ...category.item,
      cost: category.cost,
      color: categoryColor
    };
  });

  return (
    <div>
      <div className="row">
        <div style={{ width: '100%' }}>
          {
            aggregatedCosts.map((item, i) => (
              <span
                style={{
                  width: `${item.cost / sectionTotal * 100}%`,
                  height: '20px',
                  backgroundColor: categoryColors(i),
                  display: 'inline-block',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                £{`${item.cost}`.substring(0, 5)}
              </span>
            ))
          }
        </div>
      </div>
      <div>
        <h3 className="ui header">
          {capitalizeAndSpaceString(name)}
        </h3>
        <ChargeTable chargeItems={coloredBreakdown} />
      </div>
    </div>
  );
};

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
            <ChargeTable chargeItems={subCategory.breakdown} />
          </div>
        ))
      }
    </div>
  </div>
);

const ChargeTable = ({ chargeItems }) => (
  <table className="ui very basic table">
    <thead>
      <tr>
        {
          Object.keys(chargeItems[0])
          .slice(0, Object.keys(chargeItems[0]).length - 1)
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
        chargeItems.map(itemInfo => (
          <tr style={{ color: itemInfo.color }}>
            {
              Object.keys(itemInfo)
              .slice(0, Object.keys(itemInfo).length - 1)
              .map(itemInfoContent => (
                <td>{itemInfo[itemInfoContent]}</td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  </table>
);

export default ChargeList;
