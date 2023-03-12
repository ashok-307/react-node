

export function removeDuplicateFromAnArray(data: any[], idKey: string): {[key: string]: any}[] {
    let finalData: {[key: string]: any}[] = [];
    for(let ele of data) {
        let element = finalData.findIndex((d) => ele[idKey] === d[idKey]) === -1;
        if (element) {
            finalData.push(ele);
        }
    }
    return finalData;
}

export function insertValueWithoutDuplication(data: {[key: string]: any}[], element: {[key: string]: any}, idKey: string) {
    let ind = data.findIndex((d) => d[idKey] === element[idKey]);
    if (ind === -1) {
        data.push(element);
        return data;
    }
    data.splice(ind, 1);
    return data;
}

export const matchPasswords = (second: any, firstControl?: string, secondControl?: string) => {
    return (value: string): string | null => {
        if (value !== second) { return `${firstControl || 'Confirm Password'} does not match ${secondControl || 'Password'}` }
        return null;
    }
}
