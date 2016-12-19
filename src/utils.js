export const sum = (items, index, except) => {
    const remain = items.filter((item) => {
        return item[0] != except;
    });

    return remain.reduce((pre, cur) => {
        return pre + parseFloat(cur[index]);
    }, 0);
};

export const stat = ({income, expenses, assets, liabilities}) => {
    const totalIncome = sum(income, 1);
    const totalExpenses = sum(expenses, 1);
    const totalAssets = sum(assets, 1);
    const totalLiabilites = sum(liabilities, 1);
    const passiveIncome = sum(income, 1, 'Salary');
    const exceptCash = sum(assets, 1, 'Cash');

    return [{
        left: {
            name: '被动收入',
            value: passiveIncome,
        },
        right: {
            name: '二倍支出',
            value: 2 * totalExpenses,
        }
    }, {
        left: {
            name: '结余',
            value: totalIncome - totalExpenses,
        },
        right: {
            name: '收入',
            value: totalIncome,
        }
    }, {
        left: {
            name: '支出',
            value: totalExpenses,
        },
        right: {
            name: '现金',
            value: totalAssets - exceptCash,
        }
    }, {
        left: {
            name: '负债',
            value: totalLiabilites,
        },
        right: {
            name: '资产',
            value: totalAssets,
        }
    }];
}
