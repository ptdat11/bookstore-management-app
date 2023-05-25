export default interface AppConstraint {
    id: number,
    MinImport: number,
    AmountNeedImport: number,
    MaxDebt: number,
    BookAmountAfter: number,
    PaidNotGreaterThanDebt: boolean
};