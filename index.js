const options = require('./config/config');

function sortProductData(arrayOfData, orderStruct) {
    if (!orderStruct.length) return;

    arrayOfData.sort(function(a, b) {
        a['PRICE'] = parseInt(a['PRICE']);
        b['PRICE'] = parseInt(b['PRICE']);

        a['FIRST_RECD_DATE'] = new Date(a['FIRST_RECD_DATE']).getTime();
        b['FIRST_RECD_DATE'] = new Date(b['FIRST_RECD_DATE']).getTime();

        a['PRODUCT_BRAND'] = a['PRODUCT_BRAND'] === undefined ? '' : a['PRODUCT_BRAND'];
        b['PRODUCT_BRAND'] = b['PRODUCT_BRAND'] === undefined ? '' : b['PRODUCT_BRAND'];

        const numberOfNests = options.nestedOnSortList;
        for (let i = 0; i < numberOfNests.length; i++) {
            if (Number(numberOfNests[i]) !== NaN) {
                a[numberOfNests[i]] = parseInt(a[numberOfNests[i]]);
                b[numberOfNests[i]] = parseInt(b[numberOfNests[i]]);
            } else {
                a[numberOfNests[i]] = a[numberOfNests[i]];
                b[numberOfNests[i]] = b[numberOfNests[i]];
            }
        }

        let less = -1, more = 0;

        if (orderStruct[1] && a[orderStruct[0].sortBy] === b[orderStruct[0].sortBy]) {
            if (orderStruct[2] && a[orderStruct[1].sortBy] === b[orderStruct[1].sortBy]) {
                if (orderStruct[2].sortOrder === 'desc') {
                    less = 0;
                    more = -1;
                };

                if (a[orderStruct[2].sortBy] === b[orderStruct[2].sortBy]) {
                    if (a['LC_STYLE_CODE'] === b['LC_STYLE_CODE']) {
                        return a['ATG_CODE'] < b['ATG_CODE'] ? -1 : 0;
                    }
                    return a['LC_STYLE_CODE'] < b['LC_STYLE_CODE'] ? -1: 0;
                }

                if (typeof(a[orderStruct[2].sortBy]) === 'string')
                        return a[orderStruct[2].sortBy].toLowerCase() < b[orderStruct[2].sortBy].toLowerCase() ? less : more;

                return a[orderStruct[2].sortBy] - b[orderStruct[2].sortBy] > 0 ? more : less;
            } else {
                if (orderStruct[1].sortOrder === 'desc') {
                    less = 0;
                    more = -1
                };

                if (a[orderStruct[1].sortBy] === b[orderStruct[1].sortBy]) {
                    if (a['LC_STYLE_CODE'] === b['LC_STYLE_CODE']) {
                        return a['ATG_CODE'] < b['ATG_CODE'] ? -1 : 0;
                    }
                    return a['LC_STYLE_CODE'] < b['LC_STYLE_CODE'] ? -1: 0;
                }

                if (typeof(a[orderStruct[1].sortBy]) === 'string')
                    return a[orderStruct[1].sortBy].toLowerCase() < b[orderStruct[1].sortBy].toLowerCase() ? less : more;
                return a[orderStruct[1].sortBy] - b[orderStruct[1].sortBy] > 0 ? more : less;
            }
        } else {
            if (orderStruct[0].sortOrder === 'desc') {
                less = 0;
                more = -1
            };

            if (a[orderStruct[0].sortBy] === b[orderStruct[0].sortBy]) {
                if (a['LC_STYLE_CODE'] === b['LC_STYLE_CODE']) {
                    return a['ATG_CODE'] < b['ATG_CODE'] ? -1 : 0;
                }
                return a['LC_STYLE_CODE'] < b['LC_STYLE_CODE'] ? -1: 0;
            }
            if (typeof(a[orderStruct[0].sortBy]) === 'string') {
                return a[orderStruct[0].sortBy].toLowerCase() < b[orderStruct[0].sortBy].toLowerCase() ? less : more;
            }
            return a[orderStruct[0].sortBy] - b[orderStruct[0].sortBy] > 0 ? more : less;
        }
    });

    return unsortedData;
}

module.exports = sortProductData;