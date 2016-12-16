export const sum = (items, index, except) => {
    const remain = items.filter((item) => {
        return item[0] != except;
    });

    return remain.reduce((pre, cur) => {
        return pre + parseFloat(cur[index]);
    }, 0);
};

export const stat = ({cash, income, expenses}) => {
    const totalIncome = sum(income, 1);
    const totalExpenses = sum(expenses, 1);
    const passiveIncome = sum(income, 1, 'Salary');

    return [{
        left: {
            name: '被动收入',
            value: passiveIncome,
        },
        right: {
            name: '二倍支出',
            value: 2 * totalIncome,
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
            value: cash,
        }
    }];
}
