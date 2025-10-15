export declare enum OrderStatus {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
    EDIT = "EDIT"
}
export declare enum DesignUnits {
    'mm' = "mm",
    'cm' = "cm",
    'inch' = "inch",
    'px' = "px",
    'ft' = "ft"
}
export declare enum AttachmentTypes {
    IMAGE = "IMAGE",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT"
}
export declare enum DesignPackage {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}
export declare enum OrderType {
    ONE_OFF = "ONE_OFF",
    CUSTOMIZED = "CUSTOMIZED"
}
export declare enum DesignClass {
    A1 = "A1",
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}
export declare enum DesignExportFormats {
    PNG = "PNG",
    JPEG = "JPEG",
    PDF = "PDF",
    SVG = "SVG",
    AI = "AI"
}
export declare const designExportFormats: DesignExportFormats[];
export declare enum Orientation {
    PORTRAIT = "PORTRAIT",
    LANDSCAPE = "LANDSCAPE"
}
export declare enum OrderAssignmentStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    WITHDRAWN = "WITHDRAWN"
}
export declare enum OrderEditStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare enum SubmissionType {
    'ORDER' = "ORDER",
    'EDIT' = "EDIT"
}
export declare enum SubmissionPageType {
    'PAGE' = "PAGE",
    'RESIZE' = "RESIZE"
}
