export const menus = ['流', '收', '支', '资', '债'];

export const pages = [{
    name: 'cash',
    head: '现金流',
}, {
    name: 'income',
    head: ['项目', '金额'],
}, {
    name: 'expenses',
    head: ['项目', '金额'],
}, {
    name: 'assets',
    head: ['项目', '成本', '首付'],
}, {
    name: 'liabilities',
    head: ['项目', '总额', '期限'],
}];

export const data = {
    cash: '0',
    income: [ ],
    expenses: [ ],
    assets: [ ],
    liabilities: [ ],
};
