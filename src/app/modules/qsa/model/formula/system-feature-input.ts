export class SystemFeatureInput {
    name: string
    value: number

    public static convertToArray(inputs): SystemFeatureInput[] {
        const result: SystemFeatureInput[] = []
        for (const name in inputs) {
            result.push({ name: name, value: inputs[name] })
        }
        return result
    }
}
