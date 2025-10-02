type KeyPath = string;
declare class Sanitizer {
    sanitizeObject<T extends object>(obj: T, paths: KeyPath[]): Partial<T>;
    private deleteKeyPath;
    sanitizeEmptyObjectProp<T extends object>(obj: T): Partial<T>;
    sanitizeProperty<T extends object, K extends keyof T>(obj: T, key: K, serializer: (value: T[K]) => Promise<T[K]>): Promise<Partial<T>>;
}
export declare const SanitizerProvider: Sanitizer;
export {};
