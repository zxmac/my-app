export class TsLib {
    public static groupBy(list: any[], prop: string) {
        return list.reduce((group: any, obj) => {
            const key = obj[prop];
            group[key] = group[key] ?? [];
            group[key].push(obj);
            return group;
        }, {});
    }
}