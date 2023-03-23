export interface IODataOptions {
    select?: string[] | string;
    orderBy?: IOrderBy[] | IOrderBy;
    top?: number;
}

export interface IOrderBy {
    fieldName: string;
    direction?: "asc" | "desc";
}

const SPOData = {
    stringify: (options: IODataOptions): string => {
        const buffer: string[] = [];
        if(options.top) buffer.push(stringifyTop(options.top));
        if(options.select) buffer.push(stringifySelect(options.select));
        if (options.orderBy) buffer.push(stringifyOrderBy(options.orderBy));
        return buffer.join("&");
    },
    filters: {
        startsWith: (fieldName: string, value: string) => {
            return ``;
        }
    }
}

const stringifySelect = (value: string | string[]): string => {

    if (Array.isArray(value)) {
        return value.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, '')

    } else {
        return `$select=${value}`
    }
}

const stringifyOrderBy = (orderBy: IOrderBy | IOrderBy[]) => {
    const format = (value: IOrderBy): string => {
        return `${value.fieldName} ${(value.direction !== undefined) ? value.direction : ''}`.trim();
    }

    const fn = (p: string, current: IOrderBy): string => {
        return p + format(current);
    }

    if (Array.isArray(orderBy)) {
        return orderBy.reduce(fn, (orderBy) ? '$orderby=' : '');
    } else {
        return `$orderby=${format(orderBy)}`;
    }
}

const stringifyTop = (top: number = 25) => {
    return `$top=${top}`;
}

export default SPOData;