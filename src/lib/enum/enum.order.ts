export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  EDIT = 'EDIT',
}
export enum DesignUnits {
  'mm' = 'mm',
  'cm' = 'cm',
  'inch' = 'inch',
  'px' = 'px',
  'ft' = 'ft',
}

export enum AttachmentTypes {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

export enum DesignPackage {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}
export enum OrderType {
  ONE_OFF = 'ONE_OFF',
  CUSTOMIZED = 'CUSTOMIZED',
}

export enum DesignClass {
  A1 = 'A1',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum DesignExportFormats {
  PNG = 'PNG',
  JPEG = 'JPEG',
  PDF = 'PDF',
  SVG = 'SVG',
  AI = 'AI',
}

export enum Orientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

export enum OrderAssignmentStatus {
  PENDING = `PENDING`,
  ACCEPTED = 'ACCEPTED',
  WITHDRAWN = 'WITHDRAWN',
}
export enum OrderEditStatus {
  IN_PROGRESS = `IN_PROGRESS`,
  COMPLETED = 'COMPLETED',
}

export enum SubmissionType {
  'ORDER' = 'ORDER',
  'EDIT' = 'EDIT',
}

export enum SubmissionPageType {
  'PAGE' = 'PAGE',
  'RESIZE' = 'RESIZE',
}
