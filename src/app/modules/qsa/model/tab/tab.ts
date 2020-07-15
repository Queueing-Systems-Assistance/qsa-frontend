export class Tab {
    name: string
    type: TabType

    constructor(name = 'newTab', type: TabType = TabType.DEFAULT) {
        this.name = name
        this.type = type
    }
}

export enum TabType {
    DEFAULT,
    TABLE,
    CHART,
    COMPARE_TABLE,
}
