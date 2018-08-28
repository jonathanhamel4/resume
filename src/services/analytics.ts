export class Analytics {
    public static sendEvent(hitType: string, event_category: string, event_label: string, value?: number): void {
        if ((<any>window).gtag) {
            const analytics: any = (<any>window).gtag;
            analytics(hitType, event_category, {
                event_category,
                event_label,
                value: (value || 1)
            });
        } else {
            console.log('Cannot find Google Analytics. It may have been blocked.');
        }
    }
}
