import { IGSheet } from "../../interfaces/ICv";
import { TsLib } from "../../lib/ts.lib";

export class CvLib {
    public static filterSheet(list: IGSheet[], groupId: string): IGSheet[] {
        return list.filter(x => x.groupId === groupId);
    }
    public static findData(list: IGSheet[], key: string, dataKey = "value"): any {
        const data: any = list.find((x) => x.key === key);
        return data ? data[dataKey] : "N/A";
    }
    public static filterData(list: IGSheet[], key: string, dataKey = "value"): string[] {
        return list.filter((x: IGSheet) => x.key === key).map((x: any) => x[dataKey]);
    }
    public static groupData(list: IGSheet[]) {
        return TsLib.groupBy(list, "key");
    }
}