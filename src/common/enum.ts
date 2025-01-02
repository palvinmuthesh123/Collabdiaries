export const identityRelations = ['registration','identitylocation','brandGalleries','notificationSetting','promotions','blockedUsers','blockingUsers']


export enum LinkType {
  hyperlink = 'hyperlink',
  linktree = 'linktree',
}

export enum BaseStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum NotificationMethod {
  email = 'email',
  push = 'push',
  in_app = 'in_app',
}

export enum NotificationType {
  posts = 'posts',
  connects = 'connects',
  reminders = 'reminders',
  labels = 'labels',
  nearby_influencers = 'nearby_influencers',
  nearby_brands = 'nearby_brands',
  messages = 'messages',
  unknown_messages = 'unknown_messages',
}

export enum UserStatus {
  hold='hold',
  hide='hide',
  disable='disable',
  active='active',
}

export enum BidStatus {
  received= "received",
  completed= "completed",
  accepted= "accepted",
  rejected= "rejected",
  terminated= "terminated"
}

export enum ReportType {
  account = 'account',
  post = 'post',
}

export enum ReportStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
  Resolved = 'Resolved',
}

export enum Gender {
  male='male',
  female='female',
  other = 'other'
}

export enum LocationType {
  current = 'current',
  permanent = 'permanent',
}

export enum DealType {
  Barter = 'Barter',
  Paid = 'Paid',
  Unpaid = 'Unpaid',

}

export enum BrandMode {
  Online = 'Online',
  Offline = 'Offline',
}

export enum
UserType {
  Brand = 'Brand',
  CollabUser = 'CollabUser',
}

export enum GalleryType {
  Brand = 'Brand',
  User = 'User',
}

export enum PromotionType {
  coupon_code='coupon_code',
  app_opener ='app_opener'
}