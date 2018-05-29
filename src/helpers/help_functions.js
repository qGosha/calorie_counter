
export const totalNutrients = nutr => {
  if(!nutr || !nutr.length) return null;
  const arrays = nutr.map((item) => item['full_nutrients']);
  const x = [].concat.apply([], arrays);
  x.sort((a,b) => a['attr_id'] - b['attr_id']);
  let y = [[]];
  let c = x[0]['attr_id'];
  let count = 0;
  x.map( a => {
    if(a['attr_id'] === c) {
      y[count].push(a);
    } else {
      count+=1;
      c = a['attr_id'];
      y.push([a]);
    }
  })
  const final = y.map( a => {
    const id = a[0]['attr_id'];
    const s = a.reduce((sum, next) => {
      return sum + next['value'];
    }, 0)
    return {
      attr_id: id,
      value: s
    }
  })
  return final;
}

export const total = (element, arr) => {
  return Math.abs(arr.reduce((sum, next) => {
      return sum += next[element] || 0
    }, 0) );
}

export const round = (item) => {
  if (!item) return 0;
  return Math.abs(Math.round(item))
  };
export const fixed = (item) => {
  if(!item) return 0;
  return Math.abs(item.toFixed(1))
};

export const getFullNutrition = (nutr, obj) => {
  const result = obj['full_nutrients'].filter(a => { if (a.attr_id === nutr) return a });
  return (result[0] && result[0].value) ? result[0].value : 0;
}
