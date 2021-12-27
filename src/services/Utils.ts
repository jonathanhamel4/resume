export class Utils {
    public static setValueDelay(value: any, varReference: string|string[], container: any, delay: number) {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            if(Array.isArray(varReference)) {
                for(const reference of varReference) {
                    container[reference] = value;
                }
            } else {
                container[varReference] = value;
            }
        },  delay);
    }
}
