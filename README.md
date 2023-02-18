# binning
A simple tutorial for the equal-width-binning algorithm implemented in Typescript

This demo is part of the tutorial [published here](https://medium.com/@mose.kabungo/binning-explained-557aa3cce591)

## Running sample

```ts
const trxFreq = [229, 293, 394, 39, 39, 49, 93, 100, 29, 48, 188]
const labels = ['D-Customers', 'C-Customers', 'B-Customers', 'A-Customers']
const bins = toBins(trxFreq, labels)

console.log(bins)
// Prints
// [
//    {
//      "xAxis": { "value": 29, "label": "D-Customers" },
//      "values": [29, 39, 39, 48, 49, 93, 100 ]},
//    {
//      "xAxis": { "value": 120.25, "label": "C-Customers" },
//      "values": [ 188 ]
//    },
//    {
//      "xAxis": { "value": 211.5, "label": "B-Customers" },
//      "values": [ 229, 293 ]
//    },
//    {
//      "xAxis": { "value": 302.75, "label": "A-Customers" },
//      "values": [ 394 ]
//    }
// ]
```

Running tests:

```sh
yarn test
```
